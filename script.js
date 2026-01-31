// Quiz Data - Questions Database
const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
        explanation: "Paris is the capital and largest city of France."
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
        explanation: "Mars is often called the 'Red Planet' due to iron oxide (rust) on its surface."
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correctAnswer: 1,
        explanation: "The Blue Whale is the largest mammal known to have ever lived."
    },
    {
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correctAnswer: 2,
        explanation: "World War II ended in 1945 with the surrender of Germany and Japan."
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
        explanation: "Au comes from the Latin word 'aurum' meaning gold."
    }
];

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let timer = null;
let timeLeft = 15;
let totalTimeTaken = 0;
let isAnswered = false;

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const timerSpan = document.getElementById('timer');
const progressFill = document.getElementById('progress-fill');
const feedbackDiv = document.getElementById('feedback');
const finalScoreSpan = document.getElementById('final-score');
const correctCountSpan = document.getElementById('correct-count');
const wrongCountSpan = document.getElementById('wrong-count');
const timeTakenSpan = document.getElementById('time-taken');
const resultMessage = document.getElementById('result-message');

// Initialize Quiz
function init() {
    totalQuestionsSpan.textContent = questions.length;
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
}

// Start Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    totalTimeTaken = 0;
    isAnswered = false;
    
    startScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    
    showQuestion();
}

// Show Current Question
function showQuestion() {
    isAnswered = false;
    const question = questions[currentQuestionIndex];
    
    // Update question text
    questionText.textContent = question.question;
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    
    // Update progress bar
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    feedbackDiv.classList.add('hidden');
    nextBtn.classList.add('hidden');
    
    // Create option buttons
    const letters = ['A', 'B', 'C', 'D'];
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.innerHTML = `
            <span class="option-letter">${letters[index]}</span>
            ${option}
        `;
        button.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });
    
    // Start timer
    startTimer();
}

// Start Timer
function startTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timerSpan.textContent = timeLeft;
    timerSpan.classList.remove('warning');
    
    timer = setInterval(() => {
        timeLeft--;
        timerSpan.textContent = timeLeft;
        totalTimeTaken++;
        
        if (timeLeft <= 5) {
            timerSpan.classList.add('warning');
        }
        
        if (timeLeft === 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

// Handle Timeout
function handleTimeout() {
    isAnswered = true;
    disableOptions();
    showCorrectAnswer();
    
    const options = document.querySelectorAll('.option');
    options[questions[currentQuestionIndex].correctAnswer].classList.add('correct');
    
    showFeedback(false, `Time's up! ${questions[currentQuestionIndex].explanation}`);
    nextBtn.classList.remove('hidden');
}

// Select Answer
function selectAnswer(selectedIndex) {
    if (isAnswered) return;
    
    isAnswered = true;
    clearInterval(timer);
    
    const question = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    disableOptions();
    
    if (selectedIndex === question.correctAnswer) {
        score++;
        options[selectedIndex].classList.add('correct');
        showFeedback(true, `Correct! ${question.explanation}`);
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[question.correctAnswer].classList.add('correct');
        showFeedback(false, `Wrong! ${question.explanation}`);
    }
    
    nextBtn.classList.remove('hidden');
}

// Disable All Options
function disableOptions() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.add('disabled');
        option.removeEventListener('click', selectAnswer);
    });
}

// Show Correct Answer
function showCorrectAnswer() {
    const question = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    options[question.correctAnswer].classList.add('correct');
}

// Show Feedback
function showFeedback(isCorrect, message) {
    feedbackDiv.textContent = message;
    feedbackDiv.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
}

// Next Question
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Show Results
function showResults() {
    clearInterval(timer);
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    // Update final score
    finalScoreSpan.textContent = score;
    correctCountSpan.textContent = score;
    wrongCountSpan.textContent = questions.length - score;
    timeTakenSpan.textContent = totalTimeTaken;
    
    // Calculate percentage
    const percentage = (score / questions.length) * 100;
    
    // Set result message based on score
    if (percentage >= 80) {
        resultMessage.textContent = "Excellent! You're a quiz master! 🌟";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good job! Keep learning! 👍";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Room for improvement. 📚";
    } else {
        resultMessage.textContent = "Keep practicing! You can do better! 💪";
    }
}

// Restart Quiz
function restartQuiz() {
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    
    // Reset all state
    currentQuestionIndex = 0;
    score = 0;
    totalTimeTaken = 0;
    isAnswered = false;
    timeLeft = 15;
    
    clearInterval(timer);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);

