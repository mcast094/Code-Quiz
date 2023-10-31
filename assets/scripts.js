const questions = [
    {
        Question: "The Condition in an if/else statement is enclosed within _____.",
        Answers: [
            { text: "Quotes", correct: false },
            { text: "Curly Brackets", correct: false },
            { text: "Parenthesis", correct: true },
            { text: "Square Brackets", correct: false },
        ]
    },
    {
        Question: "Commonly used data types DO NOT include: ",
        Answers: [
            { text: "Strings", correct: false },
            { text: "Booleans", correct: false },
            { text: "Alerts", correct: false },
            { text: "Numbers", correct: true },
        ]
    },
    {
        Question: "A very usesful tool used during development and debugging for printing content to the debugger is: ",
        Answers: [
            { text: "JavaScript", correct: false },
            { text: "Terminal/Bash", correct: false },
            { text: "For loops", correct: true },
            { text: "Console log", correct: false },
        ]
    },
    {
        Question: "String values must be enclosed within _____ when being assigned to variables.",
        Answers: [
            { text: "Commas", correct: false },
            { text: "Curly Brackets", correct: false },
            { text: "Quotes", correct: true },
            { text: "Parenthesis", correct: false },
        ]
        
    },
    {
        Question: "Arrays in JavaScript can be used to store _____.",
        Answers: [
            { text: "Numbers and Strings", correct: false },
            { text: "Other Arrays", correct: false },
            { text: "Booleans", correct: true },
            { text: "All of the Above", correct: false },
        ]
    }
];
let timeRemaining = questions.length * 15;
const questionEl = document.getElementById("question");
const answersButtonEl = document.getElementById("answer-buttons");
const startButtonEl = document.getElementById("start-btn");
const mainEl = document.querySelector("main");
const headerEL = document.querySelector("header");
const quizFinishEl = document.querySelector(".Quiz-Finished");
const highscoreEL = document.querySelector(".HighScores");
const quizBeginEl =document.querySelector(".quiz-begin");
let messageEl = document.getElementById("message");
let timerEl = document.getElementById("timerCountdown");

let currentQuestionIndex = 0;
let score = 0;
let timeId = "";
// Resets the quiz when start button is pressed
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    mainEl.style.display = "block";
    headerEL.style.display = "none";
    questionEl.style.display = "block";
    quizFinishEl.style.display = "none";
    highscoreEL.style.display = "none";
    
    displayQuestion();
    timeId = setInterval(countdown, 1000);
}
function countdown() {
    timerEl.textContent = timeRemaining--;

}

function displayQuestion() {
    
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionEl.innerHTML = questions[currentQuestionIndex].Question;
    answersButtonEl.innerHTML = "";
    currentQuestion.Answers.forEach(answer => {
        const button = document.createElement("button");
        const li = document.createElement("li");
        button.innerHTML = answer.text;
        button.setAttribute("data-status", answer.correct);
        button.classList.add("btn");
        li.appendChild(button);
        answersButtonEl.appendChild(li);
        button.addEventListener("click", nextQuestion);
    });

}
function nextQuestion(event){
    let selectedButton = event.target;
    let status = selectedButton.getAttribute("data-status");
    if(status == "true") {
        messageEl.textContent = "Correct!";
        score++;
        localStorage.setItem("score", score);
    } else{
        messageEl.textContent = "Wrong!";
        timeRemaining = timeRemaining - 15;
    }
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        clearInterval(timeId);
        quizFinishEl.style.display = "block";
        headerEL.style.display = "block";
        questionEl.style.display = "none"; 
        startButtonEl.style.display = "none";
        messageEl.textContent = "You have finished the quiz!";
        timerEl.textContent = 0;
        quizBeginEl.style.display = "none";
        
    }
    
}

startButtonEl.addEventListener("click", startQuiz);
// function to store high scores    