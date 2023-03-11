// ********** set date ************
// select span
const date = (document.getElementById("date").innerHTML =
  new Date().getFullYear());

// ********** nav toggle ************
// select button and links
const navBtn = document.getElementById("nav-toggle");
const links = document.getElementById("nav-links");
const navbar = document.querySelector("#nav");
// // add event listener
navBtn.addEventListener("click", () => {
  links.classList.toggle("show-links");
});

// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // prevent default
    e.preventDefault();
    links.classList.remove("show-links");

    const id = e.target.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    //
    let position = element.offsetTop - 62;

    window.scrollTo({
      left: 0,
      // top: element.offsetTop,
      top: position,
      behavior: "smooth",
    });
  });
});

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 80) {
    navbar.classList.add("navbar-fixed");
  } else {
    navbar.classList.remove("navbar-fixed");
  }
});

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 150) {
    navbar.classList.remove("navbar-hidden");
  }
});

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    navbar.style.top = "0";
  } else {
    navbar.style.top = "-80px";
  }
  prevScrollpos = currentScrollPos;
};

const startButton = document.getElementById("start-btn");
const startText = document.getElementById("start-text");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const buttonQuiz = document.getElementsByClassName("btn-quiz");

let shuffledQuestions, currentQuestionIndex;
let answers = [];

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  startText.classList.add("hide");
  // shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
      answers.push(answer);
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Bandyti dar kartą";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question:
      "Iš kurios žaliavos yra išgaunama daugiausiai elektros energijos?",
    answers: [
      { text: "Naftos", correct: false },
      { text: "Anglies", correct: true },
      { text: "Gamtinių dujų", correct: false },
      { text: "Nei vieno iš šių", correct: false },
    ],
  },
  {
    question: "Kiek vidutiniškai viename bute per metus sunaudojama elektros?",
    answers: [
      { text: "2000 kWh", correct: false },
      { text: "1200 kWh", correct: true },
      { text: "1800 kWh", correct: false },
      { text: "5000 kWh", correct: false },
    ],
  },
  {
    question:
      "Kuri dalis visos žemės gyvūnų populiacijos dėl žmonių veiklos jau yra išnykusi?",
    answers: [
      { text: "30%", correct: false },
      { text: "70%", correct: false },
      { text: "10%", correct: false },
      { text: "60%", correct: true },
    ],
  },
  {
    question:
      "Kiek °C padidėjo bendra žemės paviršiaus šiluma per paskutinius 100 metų??",
    answers: [
      { text: "1.0 °C", correct: true },
      { text: "0.2 °C", correct: false },
      { text: "3.1 °C", correct: false },
      { text: "0.6 °C", correct: false },
    ],
  },
];

const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["30%", "70%", "10%", "60%"],
    datasets: [
      {
        data: [16, 2, 3, 9],
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
        ],
        borderWidth: 1,
      },
    ],
  },
});

const ctx2 = document.getElementById("myChart2");
const myChart2 = new Chart(ctx2, {
  type: "pie",
  data: {
    labels: ["1.0%", "0.2%", "3.1%", "0.6%  "],
    datasets: [
      {
        label: "# of Votes",
        data: [11, 5, 2, 25],
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
        ],
        borderWidth: 1,
      },
    ],
  },
});

const ctx3 = document.getElementById("myChart3");
const myChart3 = new Chart(ctx3, {
  type: "pie",
  data: {
    labels: ["2000 kWh", "1200 kWh", "1800 kWh", "5000 kWh"],
    datasets: [
      {
        label: "# of Votes",
        data: [13, 5, 10, 2],
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
        ],
        borderWidth: 1,
      },
    ],
  },
});

const ctx4 = document.getElementById("myChart4");
const myChart4 = new Chart(ctx4, {
  type: "pie",
  data: {
    labels: ["Naftos", "Anglies", "Gamtinių dujų", "Nei vieno iš šių"],
    datasets: [
      {
        label: "# of Votes",
        data: [13, 6, 11, 1],
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
        ],
        borderWidth: 1,
      },
    ],
  },
});
