let minute = 0;
let second = 0;
let millisecond = 0;
let cron;
let secondTimer = 120
let total = 120;
let isStarted = false;

const options = document.querySelectorAll('.option');
const startButton = document.querySelector('#start');
const dialogSettings = document.querySelector('#dialog-settings');
const settings = document.querySelector('#settings-icon');
const closeButton = document.querySelector('#close-button');

closeButton.addEventListener('click', () => {
  dialogSettings.close();
})

settings.addEventListener('click', () => {
  dialogSettings.showModal();
})


startButton.addEventListener('click', () => {
  start();
})
options.forEach((item, index) => {
    item.addEventListener('click', () => {
        options.forEach(item => {
            item.classList.remove('active');
        })
        item.classList.add('active');
    });
});



// Barra do contador
var circle = document.querySelector('circle');
var radius = circle.r.baseVal.value;
var circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference * 2}`;

function setProgress(second) {
  const offset = circumference - secondTimer / total * circumference;
  circle.style.strokeDashoffset = offset;
}

const input = document.querySelector('input');

//Barra do contador


function start() {
  if(isStarted){
    pause();
    isStarted = false;
  }
  else{
    document.getElementById('start').innerText = 'pause';
    cron = setInterval(() => { timer(); }, 10);
    isStarted = true;
  }
}

function pause() {
  clearInterval(cron);
  document.getElementById('start').innerText = 'start';
}

function timer() {
  if ((millisecond += 10) == 1000) {
    millisecond = 0;
    second++;
    secondTimer--
  }
  if (second == 60) {
    second = 0;
    minute++;
  }
  if(minute == 2){
    pause();
  }
  document.getElementById('minute').innerText = returnData(minute);
  document.getElementById('second').innerText = returnData(second);
  setProgress(second);
}

function returnData(input) {
  return input >= 10 ? input : `0${input}`
}
