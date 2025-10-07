const box = document.getElementById("box");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("start");
const gameArea = document.getElementById("game-area");

let score = 0;
let timeLeft = 30;
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
  timeLeft = 30;
  gameRunning = true;
  scoreDisplay.textContent = "Score: " + score;
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
  alert("Game Over! Your score: " + score);

  // Optional: send score to your bot backend
  // fetch("http://localhost:3000/api/submit_score", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ player: "Guest", score })
  // });
}

box.addEventListener("click", () => {
  if (!gameRunning) return;
  score++;
  scoreDisplay.textContent = "Score: " + score;
  randomPosition();
});

startBtn.addEventListener("click", startGame);
