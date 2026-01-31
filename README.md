# 🧠 Online Quiz Application

A modern, responsive quiz application built with HTML, CSS, and JavaScript. Test your knowledge with 5 general knowledge questions, each with a 15-second timer.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)
- [Technical Details](#technical-details)

---

## ✨ Features

### Core Functionality
- **Interactive Quiz Interface**: Clean, user-friendly design with smooth transitions
- **Timer System**: 15-second countdown per question with visual warnings
- **Real-time Feedback**: Instant correct/incorrect indication with explanations
- **Score Tracking**: Complete statistics including score, time taken, and performance analysis
- **Progress Tracking**: Visual progress bar and question counter

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Polished transitions and hover effects
- **Intuitive Navigation**: Easy-to-use buttons and clear visual hierarchy
- **Accessibility**: Proper contrast ratios and readable fonts

### Quiz Features
- 5 general knowledge questions included
- Multiple choice format (4 options per question)
- Detailed explanations for each answer
- Performance-based feedback messages
- Restart functionality

---

## 📁 Project Structure

```
quiz-app/
├── index.html      # Main HTML structure
├── style.css       # Styling and responsive design
├── script.js       # Quiz logic and interactivity
└── README.md       # Documentation (this file)
```

---

## 🚀 Installation

### Method 1: Local Installation
1. Navigate to the project directory:
   ```bash
   cd /home/code_with_ola/Desktop/quiz-app
   ```

2. Open `index.html` in your web browser:
   - **Double-click** the file in your file manager
   - **Or** right-click and select "Open with" → your preferred browser
   - **Or** use the command line:
     ```bash
     # On macOS:
     open index.html
     
     # On Linux:
     xdg-open index.html
     
     # On Windows:
     start index.html
     ```

### Method 2: Using a Local Server
For better compatibility, use a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if installed)
npx serve

# Using PHP (if installed)
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Method 3: Web Deployment
Upload the files to any web hosting service:
- GitHub Pages
- Netlify
- Vercel
- Any shared hosting provider

---

## 🎮 Usage

### Starting the Quiz
1. Open the application in your web browser
2. Click the **"Start Quiz"** button on the welcome screen
3. Review the instructions and proceed

### During the Quiz
1. Read each question carefully
2. Select your answer by clicking on an option
3. **Answer before the 15-second timer runs out!**
4. You'll see immediate feedback with explanation
5. Click **"Next Question"** to continue

### After Completing
1. View your final score and statistics
2. Read your performance feedback
3. Click **"Try Again"** to restart the quiz

---

## 🎨 Customization

### Adding More Questions

Edit the `questions` array in `script.js`:

```javascript
const questions = [
    {
        question: "Your question here?",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: 0, // Index of correct answer (0-3)
        explanation: "Explanation for the correct answer"
    },
    // Add more questions...
];
```

**Important Notes:**
- `correctAnswer` uses zero-based indexing (0 = first option, 1 = second, etc.)
- Always provide 4 options for consistency
- Include a helpful explanation

### Changing Timer Duration

In `script.js`, find and modify this line:

```javascript
// Change 15 to your desired seconds
timeLeft = 15;
```

Also update the initial display:

```javascript
// Update the timer display text
const timerDisplay = document.getElementById('timer');
// Or change it in the HTML file
```

### Modifying Colors

Edit CSS variables in `style.css`:

```css
:root {
    --primary-color: #4a90d9;      /* Main button color */
    --primary-hover: #357abd;      /* Button hover state */
    --success-color: #28a745;      /* Correct answer color */
    --error-color: #dc3545;        /* Wrong answer color */
    --background-color: #f5f7fa;   /* Page background */
    --card-background: #ffffff;    /* Card background */
    --text-primary: #333333;       /* Main text color */
    --text-secondary: #666666;     /* Secondary text */
}
```

### Changing the Passing Score

In `script.js`, locate the result message section and modify:

```javascript
// Current thresholds
if (percentage >= 80) {
    // Excellent
} else if (percentage >= 60) {
    // Good
} else if (percentage >= 40) {
    // Average
} else {
    // Needs improvement
}
```

### Adding More Results Screens

Add new performance tiers by extending the conditions:

```javascript
if (percentage >= 90) {
    resultMessage.textContent = "Perfect Score! Amazing! 🏆";
} else if (percentage >= 80) {
    resultMessage.textContent = "Excellent! You're a quiz master! 🌟";
}
// ... continue with existing conditions
```

---

## 🔧 Technical Details

### File Descriptions

#### `index.html`
- **Structure**: Three main sections (start screen, quiz screen, result screen)
- **Elements**: Question display, options container, timer, progress bar
- **Classes**: Uses `hidden` class to toggle between screens

#### `style.css`
- **CSS Variables**: Centralized color and sizing definitions
- **Responsive Design**: Media queries for mobile devices
- **Animations**: Keyframe animations for smooth transitions
- **No External Dependencies**: Pure CSS, no frameworks required

#### `script.js`
- **Question Array**: Easy-to-modify data structure
- **Timer Logic**: `setInterval` for countdown functionality
- **Event Handlers**: Click handlers for all interactive elements
- **State Management**: Tracks score, current question, and time

### Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Opera 66+

**Note:** Uses ES6 features (const, let, arrow functions, template literals)

### Performance

- **Lightweight**: Total size < 20KB
- **Fast Loading**: No external dependencies
- **Efficient**: Minimal DOM manipulations
- **Smooth**: 60fps animations

---

## 📝 API Reference

### Global Variables

| Variable | Type | Description |
|----------|------|-------------|
| `questions` | Array | Array of question objects |
| `currentQuestionIndex` | Number | Current question position (0-based) |
| `score` | Number | Current score count |
| `timer` | Interval | Reference to timer interval |
| `timeLeft` | Number | Seconds remaining |
| `totalTimeTaken` | Number | Total seconds for quiz |
| `isAnswered` | Boolean | Prevents multiple answers |

### Question Object Structure

```javascript
{
    question: "string",      // The question text
    options: ["string"],     // Array of 4 option strings
    correctAnswer: number,   // Index of correct option (0-3)
    explanation: "string"    // Explanation shown after answering
}
```

### Key Functions

| Function | Parameters | Description |
|----------|------------|-------------|
| `init()` | None | Initializes event listeners |
| `startQuiz()` | None | Starts the quiz, shows first question |
| `showQuestion()` | None | Displays current question and options |
| `startTimer()` | None | Starts/reset the question timer |
| `selectAnswer(index)` | Number | Handles answer selection |
| `nextQuestion()` | None | Advances to next question |
| `showResults()` | None | Displays final score screen |
| `restartQuiz()` | None | Resets quiz to initial state |

---

## 🔒 Security Notes

This application is client-side only with no data transmission. Safe for:
- Local use
- Educational environments
- Offline usage
- Children (no external links)

---

## 📄 License

This project is open source and free to use for any purpose.

---

## 🤝 Contributing

Feel free to enhance this quiz application:
- Add more questions
- Implement new features
- Improve styling
- Add localization

---

## 📞 Support

For questions or issues:
1. Review the code comments
2. Check browser console for errors
3. Verify all files are in the same directory

---

**Built with ❤️ using HTML, CSS, and JavaScript**

