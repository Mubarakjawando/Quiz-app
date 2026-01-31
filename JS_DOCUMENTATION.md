# JavaScript Code Documentation

A detailed explanation of how the quiz application works.

---

## 📑 Table of Contents

1. [Overview](#overview)
2. [Questions Database](#questions-database)
3. [State Variables](#state-variables)
4. [DOM Elements](#dom-elements)
5. [Core Functions](#core-functions)
6. [Timer Logic](#timer-logic)
7. [Event Handlers](#event-handlers)
8. [Code Flow](#code-flow)
9. [Common Patterns](#common-patterns)

---

## 1. Overview

The quiz application is a **client-side JavaScript** application that manages quiz state, handles user interactions, and provides real-time feedback. Here's the basic flow:

```
User Opens Page → Clicks "Start Quiz" → Answers Questions → Sees Results
```

### Key Concepts:
- **State Management**: Variables track the current state of the quiz
- **DOM Manipulation**: Changes HTML elements based on user actions
- **Event Handling**: Responds to clicks and other events
- **Timing**: Uses `setInterval` for countdown functionality

---

## 2. Questions Database

```javascript
const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
        explanation: "Paris is the capital and largest city of France."
    },
    // ... more questions
];
```

### Structure Explanation:

| Property | Type | Description |
|----------|------|-------------|
| `question` | String | The question text displayed to the user |
| `options` | Array | Array of 4 strings representing answer choices |
| `correctAnswer` | Number | Index of the correct answer (0-3) |
| `explanation` | String | Shown after answering to explain the correct answer |

### How to Add a Question:

```javascript
const questions = [
    {
        question: "Your question here?",
        options: [
            "Wrong answer",      // index 0
            "Correct answer",    // index 1 (correctAnswer = 1)
            "Wrong answer",      // index 2
            "Wrong answer"       // index 3
        ],
        correctAnswer: 1,
        explanation: "Why this is the correct answer"
    }
];
```

**Important**: `correctAnswer` uses **zero-based indexing**:
- 0 = First option
- 1 = Second option
- 2 = Third option
- 3 = Fourth option

---

## 3. State Variables

State variables track the current status of the quiz:

```javascript
let currentQuestionIndex = 0;  // Which question we're on (0-4)
let score = 0;                 // Number of correct answers
let timer = null;              // Reference to setInterval
let timeLeft = 15;             // Seconds remaining
let totalTimeTaken = 0;        // Total seconds for entire quiz
let isAnswered = false;        // Prevents multiple answers
```

### Variable Explanations:

| Variable | Initial Value | Purpose |
|----------|---------------|---------|
| `currentQuestionIndex` | 0 | Tracks which question to show (0 to questions.length-1) |
| `score` | 0 | Counts correct answers for final result |
| `timer` | null | Holds the interval ID so we can stop it later |
| `timeLeft` | 15 | Seconds remaining for current question |
| `totalTimeTaken` | 0 | Accumulates time across all questions |
| `isAnswered` | false | Prevents selecting multiple answers per question |

### Why Zero-Based Indexing?

In programming, arrays start at index 0, not 1:
```javascript
// Array:     ["A", "B", "C", "D"]
// Index:       0     1     2     3
```

So `currentQuestionIndex = 0` means showing the first question.

---

## 4. DOM Elements

These variables store references to HTML elements:

```javascript
// Screens (containers that show/hide)
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

// Buttons
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

// Quiz Display Elements
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentQuestionSpan = document.getElementById('current-question');
const timerSpan = document.getElementById('timer');
const progressFill = document.getElementById('progress-fill');
const feedbackDiv = document.getElementById('feedback');

// Result Display Elements
const finalScoreSpan = document.getElementById('final-score');
const correctCountSpan = document.getElementById('correct-count');
const wrongCountSpan = document.getElementById('wrong-count');
const timeTakenSpan = document.getElementById('time-taken');
const resultMessage = document.getElementById('result-message');
```

### How `document.getElementById()` Works:

```javascript
// This finds: <button id="start-btn">Start Quiz</button>
const startBtn = document.getElementById('start-btn');

// Now we can use startBtn:
startBtn.addEventListener('click', () => {
    console.log("Button clicked!");
});
```

### What These Elements Do:

| Element | HTML ID | Purpose |
|---------|---------|---------|
| `startScreen` | start-screen | Shows welcome screen |
| `quizScreen` | quiz-screen | Shows current question |
| `resultScreen` | result-screen | Shows final score |
| `questionText` | question-text | Displays the question |
| `optionsContainer` | options-container | Holds the 4 answer buttons |
| `timerSpan` | timer | Shows countdown number |
| `feedbackDiv` | feedback | Shows correct/wrong message |

---

## 5. Core Functions

### `init()` - Initialization

```javascript
function init() {
    totalQuestionsSpan.textContent = questions.length;
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
}
```

**What it does:**
1. Sets the total questions count in the HTML
2. Attaches click handlers to all buttons
3. Runs when page loads via `document.addEventListener('DOMContentLoaded', init)`

**Execution Flow:**
```
Page loads → DOMContentLoaded fires → init() runs → Event listeners attached
```

---

### `startQuiz()` - Starts the Quiz

```javascript
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
```

**Step-by-step:**

| Step | Action | Purpose |
|------|--------|---------|
| 1 | Reset variables | Start fresh with score 0, question 0 |
| 2 | Hide start screen | Remove welcome screen |
| 3 | Hide result screen | Ensure results aren't showing |
| 4 | Show quiz screen | Display the question area |
| 5 | Call `showQuestion()` | Load first question |

**The `classList` Methods:**
- `element.classList.add('hidden')` → Adds CSS class (hides element)
- `element.classList.remove('hidden')` → Removes CSS class (shows element)

---

### `showQuestion()` - Displays a Question

```javascript
function showQuestion() {
    isAnswered = false;
    const question = questions[currentQuestionIndex];
    
    questionText.textContent = question.question;
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    optionsContainer.innerHTML = '';
    feedbackDiv.classList.add('hidden');
    nextBtn.classList.add('hidden');
    
    const letters = ['A', 'B', 'C', 'D'];
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.innerHTML = `<span class="option-letter">${letters[index]}</span>${option}`;
        button.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });
    
    startTimer();
}
```

**Detailed Breakdown:**

```javascript
// Step 1: Reset answer state
isAnswered = false;

// Step 2: Get current question object
const question = questions[currentQuestionIndex];

// Step 3: Update question text
questionText.textContent = question.question;

// Step 4: Update question number (add 1 because index is 0-based)
currentQuestionSpan.textContent = currentQuestionIndex + 1;

// Step 5: Calculate progress bar width
// Example: If on question 2 of 5 → (2/5) * 100 = 40%
const progress = ((currentQuestionIndex) / questions.length) * 100;
progressFill.style.width = `${progress}%`;

// Step 6: Clear previous options
optionsContainer.innerHTML = '';

// Step 7: Hide feedback and next button
feedbackDiv.classList.add('hidden');
nextBtn.classList.add('hidden');

// Step 8: Create option buttons
const letters = ['A', 'B', 'C', 'D'];
question.options.forEach((option, index) => {
    // Create button element
    const button = document.createElement('button');
    button.className = 'option';
    
    // Add HTML content with letter prefix
    button.innerHTML = `<span class="option-letter">${letters[index]}</span>${option}`;
    
    // Add click handler with current index
    button.addEventListener('click', () => selectAnswer(index));
    
    // Add to container
    optionsContainer.appendChild(button);
});

// Step 9: Start the timer
startTimer();
```

---

### `startTimer()` - Countdown Logic

```javascript
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
```

**How `setInterval` Works:**

```javascript
// Basic syntax
setInterval(function, milliseconds);

// Example: Run every 1 second
setInterval(() => {
    console.log("One second passed");
}, 1000);
```

**Step-by-step Timer Logic:**

| Step | Code | Purpose |
|------|------|---------|
| 1 | `clearInterval(timer)` | Stop any existing timer |
| 2 | `timeLeft = 15` | Reset to 15 seconds |
| 3 | Update display | Show "15" in the timer |
| 4 | Remove warning | Clear any red warning style |
| 5 | `setInterval()` | Start new countdown |
| 6 | `timeLeft--` | Decrease by 1 each second |
| 7 | Update display | Show new time |
| 8 | `totalTimeTaken++` | Track total quiz time |
| 9 | If `timeLeft <= 5` | Add red warning style |
| 10 | If `timeLeft === 0` | Stop timer and call timeout handler |

---

### `selectAnswer(selectedIndex)` - Handle User Answer

```javascript
function selectAnswer(selectedIndex) {
    if (isAnswered) return;  // Prevent multiple answers
    
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
```

**Logic Flow:**

```
User clicks an option
         ↓
Is isAnswered true? → Yes → Return (do nothing)
         ↓ No
         ↓
Set isAnswered = true (prevent more clicks)
         ↓
Stop the timer
         ↓
Get question data and all option elements
         ↓
Disable all options (prevent clicking)
         ↓
Check if selectedIndex matches correctAnswer
         ↓
IF CORRECT:                    IF WRONG:
- Increment score              - Mark selected as wrong
- Mark option as correct       - Mark correct answer
- Show "Correct!" feedback     - Show "Wrong!" feedback
         ↓
Show "Next Question" button
```

---

### `nextQuestion()` - Advance to Next Question

```javascript
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}
```

**How It Works:**

```javascript
// Increment question counter
currentQuestionIndex++;

// Check if more questions exist
if (currentQuestionIndex < questions.length) {
    // Still have questions → show next one
    showQuestion();
} else {
    // No more questions → show results
    showResults();
}
```

**Example:**
```
Question 0 shown → Answer → nextQuestion() → currentQuestionIndex = 1
Question 1 shown → Answer → nextQuestion() → currentQuestionIndex = 2
...
Question 4 shown → Answer → nextQuestion() → currentQuestionIndex = 5
5 >= 5 (questions.length) → showResults()
```

---

### `showResults()` - Display Final Score

```javascript
function showResults() {
    clearInterval(timer);
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    finalScoreSpan.textContent = score;
    correctCountSpan.textContent = score;
    wrongCountSpan.textContent = questions.length - score;
    timeTakenSpan.textContent = totalTimeTaken;
    
    const percentage = (score / questions.length) * 100;
    
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
```

**Score Calculation:**

| Score | Percentage | Message |
|-------|------------|---------|
| 5/5 | 100% | Excellent! You're a quiz master! 🌟 |
| 4/5 | 80% | Excellent! You're a quiz master! 🌟 |
| 3/5 | 60% | Good job! Keep learning! 👍 |
| 2/5 | 40% | Not bad! Room for improvement. 📚 |
| 1/5 | 20% | Keep practicing! You can do better! 💪 |
| 0/5 | 0% | Keep practicing! You can do better! 💪 |

---

### `restartQuiz()` - Reset Everything

```javascript
function restartQuiz() {
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    
    currentQuestionIndex = 0;
    score = 0;
    totalTimeTaken = 0;
    isAnswered = false;
    timeLeft = 15;
    
    clearInterval(timer);
}
```

**What It Resets:**
- Hides results, shows start screen
- Resets question index to 0
- Clears score to 0
- Resets total time to 0
- Resets answered flag
- Resets timer to 15 seconds
- Clears any running timer

---

## 6. Timer Logic Explained

### The Timer Cycle:

```
startTimer() called
        ↓
clear any existing timer
        ↓
set timeLeft = 15
        ↓
start setInterval (every 1000ms = 1 second)
        ↓
Each second:
  - timeLeft decreases by 1
  - totalTimeTaken increases by 1
  - Update display
  - If timeLeft <= 5, add warning style
  - If timeLeft === 0, stop and handle timeout
        ↓
User answers OR time runs out
        ↓
clearInterval() stops the timer
```

### Why Clear Interval First?

```javascript
function startTimer() {
    clearInterval(timer);  // ← Important!
    // ... start new timer
}
```

Without `clearInterval`, multiple timers could run simultaneously, causing:
- Timer to count down too fast
- Memory leaks
- Incorrect timing

---

## 7. Event Handlers

### What Are Event Handlers?

Event handlers are functions that run when something happens:

```javascript
// When user clicks startBtn
startBtn.addEventListener('click', startQuiz);

// When user clicks nextBtn
nextBtn.addEventListener('click', nextQuestion);

// When user clicks restartBtn
restartBtn.addEventListener('click', restartQuiz);

// When page finishes loading
document.addEventListener('DOMContentLoaded', init);
```

### Event Handler Syntax:

```javascript
element.addEventListener('event', function);

// Examples:
button.addEventListener('click', () => {
    console.log("Clicked!");
});

document.addEventListener('DOMContentLoaded', init);
```

---

## 8. Code Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    USER OPENS PAGE                      │
└─────────────────────────────────────────────────────────┘
                            ↓
                    DOMContentLoaded
                            ↓
                    init() runs
                            ↓
         ┌──────────────────┴──────────────────┐
         ↓                                      ↓
   Wait for click                    Wait for click
         ↓                                      ↓
   startQuiz() called               (buttons ready)
         ↓
   Reset all variables
         ↓
   Hide start screen
   Show quiz screen
         ↓
   showQuestion()
         ↓
   Create options dynamically
         ↓
   startTimer()
         ↓
         ┌──────────────┐
         │   USER Clicks │←──────────────────────┐
         │   an option   │                       │
         └──────────────┘                       │
                ↓                                │
         selectAnswer()                         │
                ↓                                │
         Check if correct                       │
                ↓                                │
         Show feedback                          │
         Show "Next" button                     │
                ↓                                │
         User clicks "Next"                     │
                ↓                                │
         nextQuestion()                         │
                ↓                                │
    More questions?                             │
         ↓                                      │
    YES → showQuestion() ───────────────────────┘
         ↓ NO
    showResults()
         ↓
    Display score
         ↓
    User clicks "Try Again"
         ↓
    restartQuiz()
         ↓
    Back to start
```

---

## 9. Common Patterns

### Pattern 1: Conditional Classes

```javascript
// Add class if condition is true
element.classList.add('hidden');   // Always adds
element.classList.remove('hidden'); // Always removes

// Toggle based on condition
element.classList.toggle('hidden'); // Adds if absent, removes if present
```

### Pattern 2: Array Loop with forEach

```javascript
// Create buttons for each option
question.options.forEach((option, index) => {
    // 'option' = the text
    // 'index' = 0, 1, 2, 3
});
```

### Pattern 3: Event Handlers with Parameters

```javascript
// Wrong: Immediately invokes function
button.addEventListener('click', selectAnswer(index)); // ❌

// Correct: Arrow function delays execution
button.addEventListener('click', () => selectAnswer(index)); // ✓
```

### Pattern 4: State Management

```javascript
// Before an action
if (isAnswered) return;  // Guard clause

// After an action
isAnswered = true;  // Update state
```

---

## 🎯 Quick Reference

### Key Functions Summary:

| Function | When Called | What It Does |
|----------|-------------|--------------|
| `init()` | Page loads | Sets up event listeners |
| `startQuiz()` | Start button clicked | Resets state, shows quiz |
| `showQuestion()` | Each question | Displays question & options |
| `startTimer()` | Each question | Starts countdown |
| `selectAnswer()` | Option clicked | Checks answer, shows feedback |
| `nextQuestion()` | Next button clicked | Shows next question or results |
| `showResults()` | Quiz ends | Shows final score |
| `restartQuiz()` | Try Again clicked | Returns to start |

### Key Variables Summary:

| Variable | Purpose |
|----------|---------|
| `currentQuestionIndex` | Which question to show |
| `score` | Number of correct answers |
| `timeLeft` | Seconds remaining |
| `isAnswered` | Prevents multiple answers |

---

## 💡 Tips for Learning

1. **Read one function at a time** - Don't try to understand everything at once
2. **Use console.log** - Add `console.log(variable)` to see values
3. **Use debugger** - Open DevTools and set breakpoints
4. **Modify and test** - Change values and see what happens
5. **Draw diagrams** - Visualize the flow on paper

---

**Happy Learning! 🚀**

