const questions = [
  {
    questionTitle: "ماهي عاصمة السعوديه؟",
    options: ["الرياض", "جدة", "القصيم", "الكويت"],
    keyAnswer: "الرياض",
  },
  {
    questionTitle: "افضل نادي فالعالم",
    options: ["الاهلي", "النصر", "الهلال", "التعاون"],
    keyAnswer: "الهلال",
  },
  {
    questionTitle: "ماهو افضل لون",
    options: ["احمر", "اصفر", "ازرق", "وردي"],
    keyAnswer: "ازرق",
  },
  {
    questionTitle: "ماهو ناتج ضرب 5*13",
    options: ["70", "60", "65", "55"],
    keyAnswer: "65",
  },
  // Inputs questions
  {
    questionTitle: "ماهو قسمة 21/3",
    options: [""],
    keyAnswer: "7",
  },
  {
    questionTitle: "ما هو اليوم الذي يسمى عيد المسلمين؟ ",
    options: [""],
    keyAnswer: "الجمعة",
  },
];

const qustionsCont = document.getElementById("qustions-cont");
const qustionsText = document.getElementById("qustions-text");
const options = document.getElementById("options");
const timeLeft = document.getElementById("time-left");
const resultCont = document.getElementById("result-cont");
const resultText = document.getElementById("result-text");
const inputs = document.getElementById("inputs");

let currentIndex = 0;
let score = 0;
let timer = 10;
let countDown;

function showQuestion(index) {
  const question = questions[index];
  qustionsText.innerText = question.questionTitle;
  options.innerHTML = "";
  question.options.forEach((option) => {
    if (option == "") {
      const input = document.createElement("input");
      input.textContent = option;
      options.appendChild(input);
      input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          checkAnswer(input.value, question.keyAnswer, "input");
        }
      });
    } else {
      const button = document.createElement("button");
      button.textContent = option;
      options.appendChild(button);

      button.addEventListener("click", () => {
        checkAnswer(option, question.keyAnswer, "button");
      });
    }
  });
}

function showTimer() {
  countDown = setInterval(function () {
    timer--;
    timeLeft.textContent = timer;
    if (timer <= 0) {
      clearInterval(countDown);
      checkAnswer("", null);
    }
  }, 1000);
}

showQuestion(currentIndex);
showTimer();

function checkAnswer(userAnswer, correctAnswer, type) {
  currentIndex++;
  clearInterval(countDown);

  if (userAnswer === correctAnswer && type == "button") {
    score++;
  }
  if (userAnswer === correctAnswer && type == "input") {
    score++;
  }
  if (currentIndex < questions.length) {
    showQuestion(currentIndex);
    timer = 10;
    timeLeft.textContent = timer;
    showTimer();
  } else {
    showResult();
  }
}

function showResult() {
  qustionsCont.style.display = "none";
  resultCont.style.display = "flex";
  resultText.textContent = `Your Score is ${score} of ${questions.length}`;
}
