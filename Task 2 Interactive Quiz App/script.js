const quizData = [
  {
    question: "What is the capital of Pakistan?",
    a: "Karachi",
    b: "Lahore",
    c: "Islamabad",
    d: "Quetta",
    correct: "Islamabad",
    explanation: "Islamabad is the capital city of Pakistan."
  },
  {
    question: "Which planet is known as the Red Planet?",
    a: "Earth",
    b: "Mars",
    c: "Jupiter",
    d: "Venus",
    correct: "Mars",
    explanation: "Mars is called the Red Planet because of iron oxide (rust) on its surface."
  },
  {
    question: "Who is the founder of Pakistan?",
    a: "Allama Iqbal",
    b: "Liaquat Ali Khan",
    c: "Quaid-e-Azam",
    d: "Sir Syed Ahmed Khan",
    correct: "Quaid-e-Azam",
    explanation: "Quaid-e-Azam Muhammad Ali Jinnah founded Pakistan."
  },
  {
    question: "How many continents are there in the world?",
    a: "5",
    b: "6",
    c: "7",
    d: "8",
    correct: "7",
    explanation: "There are 7 continents in the world."
  },
  {
    question: "Which is the largest ocean in the world?",
    a: "Atlantic Ocean",
    b: "Indian Ocean",
    c: "Pacific Ocean",
    d: "Arctic Ocean",
    correct: "Pacific Ocean",
    explanation: "The Pacific Ocean is the largest ocean on Earth."
  },
  {
    question: "Which country is famous for the Eiffel Tower?",
    a: "Italy",
    b: "France",
    c: "Germany",
    d: "Spain",
    correct: "France",
    explanation: "The Eiffel Tower is located in Paris, France."
  },
  {
    question: "What is the national animal of Pakistan?",
    a: "Lion",
    b: "Tiger",
    c: "Markhor",
    d: "Elephant",
    correct: "Markhor",
    explanation: "Markhor is the national animal of Pakistan."
  },
  {
    question: "Which gas do humans breathe in?",
    a: "Carbon Dioxide",
    b: "Oxygen",
    c: "Nitrogen",
    d: "Hydrogen",
    correct: "Oxygen",
    explanation: "Humans need oxygen to breathe and survive."
  },
  {
    question: "Which is the largest continent?",
    a: "Africa",
    b: "Europe",
    c: "Asia",
    d: "Australia",
    correct: "Asia",
    explanation: "Asia is the largest continent in the world."
  },
  {
    question: "Which is the fastest land animal?",
    a: "Lion",
    b: "Tiger",
    c: "Cheetah",
    d: "Horse",
    correct: "Cheetah",
    explanation: "Cheetah is the fastest land animal in the world."
  }
];

let index = 0;
let score = 0;
let name = "";

let question = document.getElementById("question");
let options = document.getElementsByClassName("option");
let nextBtn = document.getElementById("next-button");

//Start-button
document.getElementById("start-button").onclick = function () {
    let input = document.getElementById("user-name").value;

    if (input == "") {
        alert("Enter your name");
        return;
    }

    name = input;

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";

    showQuestion();
};

//Display-question
function showQuestion() {

    let q = quizData[index];

    question.innerText = q.question;

    options[0].innerText = q.a;
    options[1].innerText = q.b;
    options[2].innerText = q.c;
    options[3].innerText = q.d;

    feedback.innerText = "";

    for (let i = 0; i < options.length; i++) {
        options[i].style.background = "";
        options[i].disabled = false;
    }
}

//click-option
for (let i = 0; i < options.length; i++) {

  options[i].onclick = function () {

    let q = quizData[index];

    for (let j = 0; j < options.length; j++) {
      options[j].disabled = true;
    }

    if (this.innerText == q.correct) {
      this.style.background = "green";
      score++;

      feedback.innerText = "Correct! " + q.explanation;
    } else {
      this.style.background = "red";

      feedback.innerText = "Wrong! " + q.explanation;

      for (let j = 0; j < options.length; j++) {
        if (options[j].innerText == q.correct) {
          options[j].style.background = "green";
        }
      }
    }
  };
}

//Next-button
nextBtn.onclick = function () {

  index++;

  if (index < quizData.length) {
    showQuestion();
  } else {

    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";

    document.getElementById("score").innerText =
      score + " / " + quizData.length;

    document.getElementById("result-name").innerText =
       name;
  }
};

//Restart
document.getElementById("restart-button").onclick = function () {
  location.reload();
};


