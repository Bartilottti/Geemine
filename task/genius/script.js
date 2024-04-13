const buttons = document.querySelectorAll('.pad');

let sequence = [];
let playerSequence = [];
let level = 1;

// Essa função será reconstruida quando for disponibilizado os efeitos de audio para as teclas
function playSound(number){
  console.log(number);
}
function AddToSequence () {
  const randomButton = Math.floor(Math.random() * 9) + 1;
  sequence.push(randomButton);
    setTimeout(() => {
    playSequence();
  }, 1000)
}
function playSequence() {
  sequence.forEach((button, index) => {
    setTimeout(() => {
    playSound("numero");
    }, 1000 * index);
  });
}
function checkAnswer() {
  for (let i = 0; i < playerSequence; i++){
    if (playerSequence[i] !== sequence[i]){
      gameOver();
      return;
    }
  }
  if (playerSequence.length === sequence.length){
    level++;
    playerSequence = [];
    setTimeout(() => {
    AddToSequence();
    }, 1000);
  }
}
function handleButtonClick(buttonNumber) {
  playerSequence.push(buttonNumber);
  playSound(buttonNumber);
  checkAnswer();
}
function restartGame() {
  sequence = [];
  playerSequence = [];
  level = 1;
  AddToSequence();
}
function gameOver() {
  alert('Game Over! Your score: ' + (level - 1));
  restartGame()
}
window.onload = restartGame();
document.addEventListener('keydown', (event) => {
  const key = parseInt(event.key);
  if (key >= 1 && key <= 9){
    handleButtonClick(key);
  }
});





