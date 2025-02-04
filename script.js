// Array of image filenames - add your image filenames here
const images = [
    'questions/q (1).png',
    'questions/q (2).png',
    'questions/q (3).png',
    'questions/q (4).png',
    'questions/q (5).png',
    'questions/q (6).png',
    'questions/q (7).png',
    'questions/q (8).png',
    'questions/q (9).png',
    'questions/q (10).png',
    'questions/q (11).png',
    'questions/q (12).png',
    'questions/q (13).png',
    'questions/q (14).png',
    'questions/q (15).png',
    'questions/q (16).png',
    'questions/q (17).png',
    'questions/q (18).png',
    'questions/q (19).png',
    'questions/q (20).png',
    'questions/q (21).png',
    'questions/q (22).png',
    'questions/q (23)).png',
    'questions/q (24).png',
    'questions/q (25).png',
    'questions/q (26).png',
    'questions/q (27).png',
    'questions/q (28).png',
    'questions/q (29).png',
    'questions/q (30).png',
    'questions/q (31).png',
    'questions/q (32).png',
    'questions/q (33).png',
    'questions/q (34).png',
    'questions/q (35).png',

];

let score = 0;
let currentImageIndex = -1;
let timeLeft = 240; // 4 minutes in seconds
let timerInterval;

// DOM elements
const scoreElement = document.getElementById('scoreValue');
const solvedButton = document.getElementById('solvedBtn');
const skipButton = document.getElementById('skipBtn');
const problemImage = document.getElementById('problemImage');
const timerElement = document.getElementById('timer');

// Function to format time as MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Function to get random image
function getRandomImage() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * images.length);
    } while (newIndex === currentImageIndex && images.length > 1);
    
    currentImageIndex = newIndex;
    problemImage.src = images[currentImageIndex];
}

// Function to update score with animation
function updateScore(newScore) {
    scoreElement.textContent = newScore;
    scoreElement.classList.remove('animate');
    void scoreElement.offsetWidth; // Trigger reflow
    scoreElement.classList.add('animate');
}

// Function to show the LOSER screen
function showLoserScreen() {
    const loserDiv = document.createElement('div');
    loserDiv.className = 'loser';
    loserDiv.textContent = 'LOSER';
    document.body.appendChild(loserDiv);
    
    setTimeout(() => {
        loserDiv.remove();
        resetGame();
    }, 3000);
}

// Function to reset timer
function resetTimer() {
    timeLeft = 240;
    updateTimer();
    // Clear existing interval and start a new one
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
    }, 1000);
}

// Function to reset game
function resetGame() {
    score = 0;
    updateScore(score);
    resetTimer();
    getRandomImage();
}

// Function to update timer
function updateTimer() {
    timerElement.textContent = formatTime(timeLeft);
    
    // Add warning animation every 10 seconds
    if (timeLeft % 10 === 0 && timeLeft > 0) {
        timerElement.classList.add('warning');
        setTimeout(() => {
            timerElement.classList.remove('warning');
        }, 1000);
    }

    if (timeLeft <= 0) {
        showLoserScreen();
    }
}

// Handle solved button click
solvedButton.addEventListener('click', () => {
    score++;
    updateScore(score);
    document.body.classList.add('flash-green');
    resetTimer();
    
    setTimeout(() => {
        document.body.classList.remove('flash-green');
        getRandomImage();
    }, 800);
});

// Handle skip button click
skipButton.addEventListener('click', () => {
    if (score > 0) {
        score--;
        updateScore(score);
    }
    resetTimer();
    getRandomImage();
});

// Start timer - will run continuously
timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();
}, 1000);

// Initialize game
getRandomImage();
resetTimer();