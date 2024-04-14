const buttons = document.querySelectorAll('.pad');

let sequence = [];
let playerSequence = [];
let level = 1;

// Essa função será reconstruida quando for disponibilizado os efeitos sonoros para as teclas
function PlaySound() {
  console.log(sequence);
}
function AddToSequence() {
  const randomButton = Math.floor(Math.random() * 9) + 1;
  sequence.push(randomButton);
  setTimeout(() => {
    PlaySequence();
    
 }, 1000)
}
function PlaySequence() {
  buttons.forEach( button => {
    button.classList.remove('on'); 
  })
  sequence.forEach((index) => {
    setTimeout(() => {
      buttons[index - 1].classList.add('on');
      setTimeout(() => {
        PlaySound();
      }, 500);
    }, 1000);
  });
}
function CheckAnswer() {
  for (let i = 0; i < playerSequence.length; i++) {
    if (playerSequence[i] !== sequence[i]) {
      GameOver();
      return;
    }
  }
  if (playerSequence.length === sequence.length) {
    level++;
    playerSequence = [];
    setTimeout(() => {
      AddToSequence();
    }, 1000);
  }
  if (level === 10) {
    alert('You win! Yeah!');
  }
}
function HandleButtonClick(buttonNumber) {
  playerSequence.push(buttonNumber);
  PlaySound(buttonNumber);
  CheckAnswer();
}
function RestartGame() {
  sequence = [];
  playerSequence = [];
  level = 1;
  AddToSequence();
}
function GameOver() {
  alert('Game Over! Your score: ' + (level - 1));
  console.log('Game Over!');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('on');
  }
}
document.addEventListener('keydown', (event) => {
  const key = parseInt(event.key);
  if (key >= 1 && key <= 9) {
    HandleButtonClick(key);
  }
  });
