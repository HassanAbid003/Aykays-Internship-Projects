//================================ Charts Scetion =================================

let incomeExpenseChart = null;
let categoryChart = null;

function initCharts() {
    const incomeExpenseCanvas = document.getElementById('incomeExpenseChart');
    const categoryCanvas = document.getElementById('categoryChart');

    if (!incomeExpenseCanvas || !categoryCanvas) return;

    const incomeExpenseCtx = incomeExpenseCanvas.getContext('2d');
    const categoryCtx = categoryCanvas.getContext('2d');

    if (incomeExpenseChart) {
        incomeExpenseChart.destroy();
        incomeExpenseChart = null;
    }

    if (categoryChart) {
        categoryChart.destroy();
        categoryChart = null;
    }

    let totalIncome = 0;
    let totalExpense = 0;

    if (typeof transactions !== 'undefined') {
        transactions.forEach(t => {
            if (t.type === 'income') totalIncome += t.amount;
            else totalExpense += t.amount;
        });
    }

    incomeExpenseChart = new Chart(incomeExpenseCtx, {
        type: 'doughnut',
        data: {
            labels: ['Income', 'Expense'],
            datasets: [{
                data: [totalIncome, totalExpense],
                backgroundColor: ['#2ecc71', '#e74c3c'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    const categoryMap = {};

    if (typeof transactions !== 'undefined') {
        transactions
            .filter(t => t.type === 'expense')
            .forEach(t => {
                categoryMap[t.category] =
                    (categoryMap[t.category] || 0) + t.amount;
            });
    }

    const categories = Object.keys(categoryMap);
    const amounts = Object.values(categoryMap);

    categoryChart = new Chart(categoryCtx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Expenses',
                data: amounts,
                backgroundColor: '#3498db',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
