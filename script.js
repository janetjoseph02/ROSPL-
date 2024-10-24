// declaring variables here
const startBtn = document.querySelector(".btn .start-btn");
const restartBtn = document.querySelector(".restart-btn");
const mainScreen = document.querySelector(".main-screen");
const question = document.querySelector(".question-panel h1");
const optionPanel = document.querySelector(".option-panel");
const options = document.getElementsByClassName("options");

const optionA = document.querySelector(".option-a");
const optionB = document.querySelector(".option-b");
const optionC = document.querySelector(".option-c");
const optionD = document.querySelector(".option-d");
const scoreSection = document.querySelector(".score");
const gameScreen = document.querySelector(".game-screen");
const gameEndPanel = document.querySelector(".game-end-panel");
const gameScoreBox = document.querySelector(".score-box");
const totalScoreBox = document.querySelector(".total-score");
const percentBox = document.querySelector(".percent");
const remarkEmoji = document.querySelector(".remark-emoji");

// language selector
const languageSelect = document.getElementById("language");

let questionIndex = 0;
let questionsAsked = []; // to store asked questions
let score = 0,
    questionCount = 0;

// Questions and MCQs for all languages
const quizzes = {
    javascript: {
        questions: [
            "What does HTML stand for?",
            "Which of the following is not a JavaScript data type?",
            "Which company developed JavaScript?",
            "Which type of JavaScript language is?",
            "Inside which HTML element do we put the JavaScript?"
        ],
        options: [
            ["High Text Markup Language", "Hyperlink and Text Markup Language", "Hyper Transfer Markup Language", "Hyper Text Markup Language"],
            ["Boolean", "Alert", "Number", "String"],
            ["Netscape", "Bell Labs", "Sun Microsystems", "IBM"],
            ["Object-Oriented", "Object-Based", "Assembly-language", "High-level"],
            ["<js>", "<scripting>", "<script>", "<javascript>"]
        ],
        answers: [3, 1, 0, 1, 2] // correct answers for JavaScript
    },
    python: {
        questions: [
            "What is the correct file extension for Python files?",
            "Which of the following is used to define a block of code in Python?",
            "What is the maximum possible length of an identifier in Python?",
            "Which of the following is a mutable data type in Python?",
            "What does pip stand for in Python?"
        ],
        options: [
            [".pyt", ".pyth", ".py", ".pt"],
            ["Brackets", "Indentation", "Parentheses", "Semicolons"],
            ["16", "32", "128", "No fixed length is specified"],
            ["List", "Tuple", "String", "Integer"],
            ["Pip Installs Packages", "Pip Installs Python", "Preferred Installer Program", "All of the above"]
        ],
        answers: [2, 1, 3, 0, 3] // correct answers for Python
    },
    java: {
        questions: [
            "What is the size of an int data type in Java?",
            "Which keyword is used to create an object in Java?",
            "Which of these is a Java feature?",
            "Which method can be defined only once in a program?",
            "Which package contains the Random class?"
        ],
        options: [
            ["8 bits", "16 bits", "32 bits", "64 bits"],
            ["new", "create", "class", "object"],
            ["Object-Oriented", "Use of pointers", "Portable", "Dynamic and Extensible"],
            ["main method", "finalize method", "static method", "private method"],
            ["java.util package", "java.lang package", "java.awt package", "java.io package"]
        ],
        answers: [2, 0, 0, 0, 0] // correct answers for Java
    }
};

// Function to start the quiz based on selected language
function startQuiz() {
    let selectedLanguage = languageSelect.value;
    let quiz = quizzes[selectedLanguage];

    // Reset variables
    questionIndex = 0;
    questionsAsked = [];
    score = 0;
    questionCount = quiz.questions.length;

    // Show game screen and hide the main screen
    gameScreen.style.display = "block";
    mainScreen.style.display = "none";
    gameEndPanel.style.display = "none";

    // Display the first question
    displayQuestion(quiz, questionIndex);
}

// Function to display the current question and options
function displayQuestion(quiz, questionIndex) {
    question.innerText = quiz.questions[questionIndex];

    // Set options
    optionA.innerText = quiz.options[questionIndex][0];
    optionB.innerText = quiz.options[questionIndex][1];
    optionC.innerText = quiz.options[questionIndex][2];
    optionD.innerText = quiz.options[questionIndex][3];
}

// Function to handle user answer selection
function checkAnswer(selectedOption) {
    let selectedLanguage = languageSelect.value;
    let quiz = quizzes[selectedLanguage];
    let correctAnswer = quiz.answers[questionIndex];
    let selectedButton;

    // Select the correct button
    if (selectedOption === 0) selectedButton = optionA;
    if (selectedOption === 1) selectedButton = optionB;
    if (selectedOption === 2) selectedButton = optionC;
    if (selectedOption === 3) selectedButton = optionD;

    // Check if the selected option matches the correct answer
    if (selectedOption === correctAnswer) {
        selectedButton.style.backgroundColor = "green";
        score += 10;
        scoreSection.innerText = `Score: ${score}`;
    } else {
        selectedButton.style.backgroundColor = "red";

        // Show the correct answer in green
        if (correctAnswer === 0) optionA.style.backgroundColor = "green";
        if (correctAnswer === 1) optionB.style.backgroundColor = "green";
        if (correctAnswer === 2) optionC.style.backgroundColor = "green";
        if (correctAnswer === 3) optionD.style.backgroundColor = "green";
    }

    // Move to the next question after a 1-second delay
    setTimeout(() => {
        // Reset the background color for all options
        optionA.style.backgroundColor = "";
        optionB.style.backgroundColor = "";
        optionC.style.backgroundColor = "";
        optionD.style.backgroundColor = "";

        questionIndex++;
        if (questionIndex < quiz.questions.length) {
            displayQuestion(quiz, questionIndex);
        } else {
            endGame();
        }
    }, 1000);
}

// Function to end the quiz and display the score
function endGame() {
    // Show final score and percentage
    gameScoreBox.innerText = score;
    totalScoreBox.innerText = questionCount * 10;
    let scorePercent = (score / (questionCount * 10)) * 100;
    percentBox.innerText = `(${scorePercent}%)`;

    // Display remark and emoji based on score percentage
    remarkEmoji.innerText = scorePercent >= 80 ? "🎉" : "🙂";

    // Show end game panel and hide game screen
    gameEndPanel.style.display = "block";
    gameScreen.style.display = "none";
}

// Function to restart the quiz
function restartQuiz() {
    // Reset everything and go back to the main screen
    mainScreen.style.display = "block";
    gameEndPanel.style.display = "none";
    gameScreen.style.display = "none";
}

// Event listeners


startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

// Handling option click events
optionA.addEventListener("click", () => checkAnswer(0));
optionB.addEventListener("click", () => checkAnswer(1));
optionC.addEventListener("click", () => checkAnswer(2));
optionD.addEventListener("click", () => checkAnswer(3));
