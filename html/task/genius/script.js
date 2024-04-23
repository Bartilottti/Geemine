let sequence = [];
let playerSequence = [];
let level = 1;

const sounds = {
  1 : './audio/audio1.mp3',
  2 : './audio/audio2.mp3',
  3 : './audio/audio3.mp3',
  4 : './audio/audio4.mp3',
  5 : './audio/audio5.mp3',
  6 : './audio/audio6.mp3',
  7 : './audio/audio7.mp3',
  8 : './audio/audio8.mp3',
  9 : './audio/audio9.mp3',
  10 : './audio/correctSong.mp3',
  11 : './audio/wrongSong.mp3'
};

function PlaySound(soundFile) {
  const audio = new Audio(soundFile);
  audio.play();
}
function AddToSequence() {
  const randomButton = Math.floor(Math.random() * 9) + 1;
  sequence.push(randomButton);
  PlaySequence();
}
function PlaySequence() {
  let index = 0;
  const cover = document.getElementById('coverLayer');
  cover.style.pointerEvents = 'auto';
  const intervalId = setInterval(() => {
    const button = sequence[index];
    const buttonElement = document.getElementById(`button${button}`);
    buttonElement.classList.add('on');
    setTimeout(() => {
      buttonElement.classList.remove('on');
    }, 300);
    PlaySound(sounds[button]);
    index++;
    if (index >= sequence.length) {
      clearInterval(intervalId);
      cover.style.pointerEvents = 'none';
    }
  }, 800);
}
function CheckAnswer() {
  for (let i = 0; i < playerSequence.length; i++) {
    if (playerSequence[i] !== sequence[i]) {
      GameOver();
      return;
    }
    if (level === 17) {
      GameWin();
      return;
    }
  }
  if (playerSequence.length === sequence.length) {
    level++;
    PlaySound(sounds[10]);
    playerSequence = [];
    setTimeout(() => {
      AddToSequence();
    }, 1000);
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
  }, 300);
}
function RestartGame() {
  sequence = [];
  playerSequence = [];
  level = 1;
  AddToSequence();
}
function GameWin() {
  alert(`You Win! Your score: ${level}. Thank you for taking this exam :)`);
  console.log('You Win!');
}
function GameOver() {
  PlaySound(sounds[11]);
  alert(`Game Over! your score: ${level - 1}`);
  sequence = [];
  playerSequence = [];
  level = 1;
  console.log('Game Over!');
}
document.addEventListener('keydown', (event) => {
  const key = parseInt(event.key);
  if (key >= 1 && key <= 9) {
    HandleButtonClick(key);
  }
});
