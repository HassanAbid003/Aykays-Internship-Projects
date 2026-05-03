const userName = localStorage.getItem('userName') || 'User';

const navName     = document.getElementById('navName');
const sidebarName = document.getElementById('name');
const profileName = document.getElementById('profileName');

if (navName)     navName.textContent     = userName;
if (sidebarName) sidebarName.textContent = userName;
if (profileName) profileName.textContent = userName;


const userEmail    = localStorage.getItem('userEmail') || '';
const profileEmail = document.getElementById('profileEmail');
if (profileEmail) profileEmail.textContent = userEmail;

// ============================ DARK MODE =======================================

const darkModeToggle = document.getElementById('darkModeToggle');
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// Apply dark mode on page load
function applyDarkMode() {
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.classList.replace('fa-moon', 'fa-sun');
    } else {
        document.body.classList.remove('dark-mode');
        if (darkModeToggle) darkModeToggle.classList.replace('fa-sun', 'fa-moon');
    }
}

// Toggle dark mode
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.classList.remove('fa-moon');
        darkModeToggle.classList.add('fa-sun');
    } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.classList.remove('fa-sun');
        darkModeToggle.classList.add('fa-moon');
    }
}

// Add event listener to dark mode button
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
}

// Apply dark mode on load
applyDarkMode();


// ============================== Pages Functionality ==================================

let transactions = [];
let currentFilter = 'all';

const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const categorySelect = document.getElementById('category');
const addBtn = document.getElementById('addBtn');
const transactionList = document.getElementById('transaction-list');
const balanceAmount = document.getElementById('balanceAmount');
const totalIncome = document.getElementById('totalIncome');
const totalExpense = document.getElementById('totalExpense');
const quickIncome = document.getElementById('quickIncome');
const quickExpense = document.getElementById('quickExpense');
const transactionCount = document.getElementById('transactionCount');

const dashboardSection = document.getElementById('dashboard-section');
const profileSection = document.getElementById('profile-section');

function loadTransactions() {
    const saved = localStorage.getItem('transactions');
    if (saved) {
        transactions = JSON.parse(saved);
        updateDisplay();
    }
}

function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function addTransaction() {
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;
    const category = categorySelect.value;
    
    if (!description || !amount) {
        alert('Please fill description and amount');
        return;
    }
    
    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type,
        category: category
    };
    
    transactions.push(transaction);
    saveTransactions();
    updateDisplay();
    
    descriptionInput.value = '';
    amountInput.value = '';


}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveTransactions();
    updateDisplay();

}

function getFilteredTransactions() {
    if (currentFilter === 'all') return transactions;
    if (currentFilter === 'income') return transactions.filter(t => t.type === 'income');
    if (currentFilter === 'expense') return transactions.filter(t => t.type === 'expense');
    return transactions.filter(t => t.category === currentFilter);
}

function updateDisplay() {
    let income = 0, expense = 0;
    transactions.forEach(t => {
        if (t.type === 'income') income += t.amount;
        else expense += t.amount;
    });
    
    const balance = income - expense;
    
    if (balanceAmount) balanceAmount.textContent = `$${balance}`;
    if (totalIncome) totalIncome.textContent = `$${income}`;
    if (totalExpense) totalExpense.textContent = `$${expense}`;
    if (quickIncome) quickIncome.textContent = `$${income}`;
    if (quickExpense) quickExpense.textContent = `$${expense}`;
    if (transactionCount) transactionCount.textContent = transactions.length;
    
    const sideBalance = document.getElementById('sideBalance');
    const sideCount = document.getElementById('sideCount');
    if (sideBalance) sideBalance.textContent = `$${balance}`;
    if (sideCount) sideCount.textContent = transactions.length;
    
    const profileCount = document.getElementById('profileCount');
    const profileBalance = document.getElementById('profileBalance');
    if (profileCount) profileCount.textContent = transactions.length;
    if (profileBalance) profileBalance.textContent = `$${balance}`;
    
    const filtered = getFilteredTransactions();
    
    if (!transactionList) return;
    
    if (filtered.length === 0) {
        transactionList.innerHTML = '<p style="color: gray; text-align: center;">No transactions</p>';
        return;
    }
    
    transactionList.innerHTML = '';
    filtered.forEach(t => {
        const sign = t.type === 'income' ? '+' : '-';
        const color = t.type === 'income' ? 'green' : 'red';
        
        const div = document.createElement('div');
        div.className = `transaction-item transaction-${t.type}`;
        div.innerHTML = `
            <div class="transaction-info">
                <div class="transaction-desc">${t.description}</div>
                <div class="transaction-category">${t.category}</div>
            </div>
            <div class="transaction-amount" style="color: ${color}">${sign}$${t.amount}</div>
            <button class="delete-btn" onclick="deleteTransaction(${t.id})">Delete</button>
        `;
    transactionList.appendChild(div);
    });

}

function resetLayout() {
  ['dashboard', 'expenses', 'quick-access',
   'monthly-report', 'profile-section',
   'task-section', 'chart1', 'chart2'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  ['middle-card', 'monthly-report',
   'task-section', 'profile-section',
   'chart-row', 'top-cards'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.style.marginTop    = '';
      el.style.marginBottom = '';
      el.style.paddingTop   = '';
      el.style.display      = 'none';
    }
  });
}

function setFilter(filter) {
    currentFilter = filter;
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    updateDisplay();
}

function showHome() {
  resetLayout();
  document.getElementById('top-cards').style.display      = 'grid';  
  document.getElementById('middle-card').style.display     = 'block';
  document.getElementById('dashboard').style.display       = 'block';
  document.getElementById('expenses').style.display        = 'block';
  document.getElementById('quick-access').style.display    = 'block';
  document.getElementById('monthly-report').style.display  = 'block';
  setFilter('all');
}

function showExpenses() {
  resetLayout();
  document.getElementById('monthly-report').style.display = 'block';
  document.getElementById('chart-row').style.display      = 'flex'; 
  document.getElementById('chart1').style.display          = 'block';
  document.getElementById('chart2').style.display          = 'block';
  setFilter('expense');
  setTimeout(initCharts, 50);
}

function showProfile() {
  resetLayout();
  document.getElementById('profile-section').style.display = 'block';
}

if (addBtn) {
    addBtn.addEventListener('click', addTransaction);
}

const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setFilter(btn.getAttribute('data-filter'));
    });
});

const menuOptions = document.querySelectorAll('#options p');
menuOptions.forEach(option => {
    option.addEventListener('click', function() {
        const text = this.textContent.trim();
        
        switch(text) {
            case 'Home':
                showHome();
                break;
            case 'Expenses':
                showExpenses();
                break;
            case 'Profile':
                showProfile();
                break;
            case 'Settings':
                alert('Settings coming soon!');
                break;
            case 'Support':
                alert('Support: support@trackerz.com');
                break;
        }
        
    });
});

loadTransactions();

showHome();

//============================== Task Section =============================


function openTaskSection() {
  resetLayout();
  document.getElementById('task-section').style.display = 'block';
}
let tasks = JSON.parse(localStorage.getItem("tasks"));
if (tasks == null) {
  tasks = [];
}

let index = 0;

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTasks() {
  let list = document.getElementById("taskList");
  let box = document.getElementById("middleBoxTask");

  if (tasks.length == 0) {
    if (box) box.innerText = "No tasks";
  } else {
    if (box) box.innerText = tasks[index].name;
  }

  if (tasks.length == 0) {
    if (list) list.innerHTML = "<p>No tasks</p>";
    return;
  }

  let html = "";

  for (let i = 0; i < tasks.length; i++) {
    html += `
      <div class= "task-item";>
        <span>${escapeHtml(tasks[i].name)}</span>
        <button class = "delete-btn" onclick="deleteTask(${tasks[i].id})">X</button>
      </div>
    `;
  }

  if (list) list.innerHTML = html;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

function addTask() {
  let input = document.getElementById("taskInput");
  if (!input) return;
  let value = input.value;

  if (value == "") {
    alert("Enter task");
    return;
  }

  let task = {
    id: Date.now(),
    name: value
  };

  tasks.push(task);

  saveTasks();
  showTasks();

  input.value = "";
  
  const displayMode = document.getElementById("displayMode");
  const inputMode = document.getElementById("inputMode");
  if (displayMode && inputMode && inputMode.style.display !== 'none') {
    displayMode.style.display = "block";
    inputMode.style.display = "none";
  }
}

function deleteTask(id) {
  let newTasks = [];

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id != id) {
      newTasks.push(tasks[i]);
    }
  }

  tasks = newTasks;

  if (index >= tasks.length) {
    index = 0;
  }

  saveTasks();
  showTasks();
}

function showInput() {
  const displayMode = document.getElementById("displayMode");
  const inputMode = document.getElementById("inputMode");
  if (displayMode && inputMode) {
    displayMode.style.display = "none";
    inputMode.style.display = "flex";
    const taskInput = document.getElementById("taskInput");
    if (taskInput) taskInput.focus();
  }
}

function addTaskFromMiddle() {
  let input = document.getElementById("taskInput");
  if (!input) return;
  let value = input.value;

  if (value == "") {
    alert("Enter task");
    return;
  }

  let task = {
    id: Date.now(),
    name: value
  };

  tasks.push(task);

  saveTasks();
  showTasks();

  input.value = "";
  
  const displayMode = document.getElementById("displayMode");
  const inputMode = document.getElementById("inputMode");
  if (displayMode && inputMode) {
    displayMode.style.display = "block";
    inputMode.style.display = "none";
  }
}

setInterval(function () {
  if (tasks.length > 0) {
    index++;

    if (index >= tasks.length) {
      index = 0;
    }

    showTasks();
  }
}, 5000);

const middleAddTaskBtn = document.getElementById("middleAddTaskBtn");
if (middleAddTaskBtn) {
  middleAddTaskBtn.onclick = function () {
    const taskSection = document.getElementById("task-section");
    if (taskSection) {
      taskSection.style.display = "block";
    }
    showInput();
  };
}

const addTaskBtn = document.getElementById("addTaskBtn");
if (addTaskBtn) {
  addTaskBtn.onclick = addTask;
}

showTasks();





