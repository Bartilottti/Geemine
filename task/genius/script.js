let sequence = [];
let playerSequence = [];
let level = 1;

function PlaySound() {
  // Essa função será reconstruida quando for disponibilizado os efeitos sonoros para as teclas
  console.log(sequence);
}
function AddToSequence() {
  const randomButton = Math.floor(Math.random() * 9) + 1;
  sequence.push(randomButton);
  PlaySequence();
}
function PlaySequence() {
  let index = 0;

  const buttons = document.querySelectorAll('.pad');
    buttons.forEach(button => {
    button.disabled = true;
  })

  const intervalId = setInterval(() => {
    const button = sequence[index];
    const buttonElement = document.getElementById(`button${button}`);

    buttonElement.classList.add('on');
    setTimeout(() => {
      buttonElement.classList.remove('on');
    }, 500);
    PlaySound();
    index++;
    if (index >= sequence.length) {
      clearInterval(intervalId);
    }
  }, 1000);

  buttons.forEach( button => {
    button.disabled = false;
  })
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
    return;
  }
}
function HandleButtonClick(buttonNumber) {
  playerSequence.push(buttonNumber);
  PlaySound(buttonNumber);
  CheckAnswer();
  const buttonElement = document.getElementById(`button${buttonNumber}`);
  buttonElement.classList.add('on');
  setTimeout(() => {
    buttonElement.classList.remove('on');
  }, 500);
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
}
document.addEventListener('keydown', (event) => {
  const key = parseInt(event.key);
  if (key >= 1 && key <= 9) {
    HandleButtonClick(key);
  }
});
