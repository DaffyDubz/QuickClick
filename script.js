const box = document.getElementById("box");
const scoreDisplay = document.getElementById("score");
const totalDisplay = document.getElementById("total");
const timeDisplay = document.getElementById("time");
const accuracyDisplay = document.getElementById("accuracy");
const startBtn = document.getElementById("start");
const gameArea = document.getElementById("game-area");

let score = 0;
let accuracy = 100;
let timeLeft = 30;
let totalClicks = 0;
let gameRunning = false;
let timer;

function randomPosition() {
  const x = Math.random() * (gameArea.clientWidth - box.clientWidth);
  const y = Math.random() * (gameArea.clientHeight - box.clientHeight);
  box.style.left = x + "px";
  box.style.top = y + "px";
}

function startGame() {
  score = 0;
  accuracy = 100;
  timeLeft = 30;
  totalClicks = 0;
  gameRunning = true;
  scoreDisplay.textContent = "Score: " + score;
  scoreDisplay.textContent = "Total Clicks: " + totalClicks;
  accuracyDisplay.textContent = "Accuracy: " + accuracy + "%";
  timeDisplay.textContent = "Time: " + timeLeft + "s";
  startBtn.disabled = true;
  box.style.display = "block";
  randomPosition();

  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = "Time: " + timeLeft + "s";
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function endGame() {
  clearInterval(timer);
  box.style.display = "none";
  startBtn.disabled = false;
  gameRunning = false;
  alert("Game Over! \nYour score: " + score + "out of " + totalClicks + "\nYour accuracy: " + accuracy.toFixed(2) + "%");

  // Optional: send score to your bot backend
  // fetch("http://localhost:3000/api/submit_score", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ player: "Guest", score })
  // });
}

gameArea.addEventListener("click", () => {
  if (!gameRunning) return;
  totalClicks++;
  accuracy = (score / totalClicks) * 100;
  scoreDisplay.textContent = "Score: " + score;
  totalDisplay.textContent = "Total Clicks: " + totalClicks;
  accuracyDisplay.textContent = "Accuracy: " + accuracy.toFixed(2) + "%";
});

box.addEventListener("click", () => {
  if (!gameRunning) return;
  score++;
  accuracy = (score / totalClicks) * 100;
  scoreDisplay.textContent = "Score: " + score;
  totalDisplay.textContent = "Total Clicks: " + totalClicks;
  accuracyDisplay.textContent = "Accuracy: " + accuracy.toFixed(2) + "%";
  randomPosition();
});

startBtn.addEventListener("click", startGame);
