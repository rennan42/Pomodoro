let minute = 0;
let second = 0;
let millisecond = 0;
let cron;
let secondTimer = 120
let total = 120;
let isStarted = false;
let fontSelected;
let pomodoro = 25 * 60;
let shortBreak = 5 * 60;
let longBreak = 15 * 60;

let font;
let color = 'orange';

const options = document.querySelectorAll('.option');
const startButton = document.querySelector('#start');
const dialogSettings = document.querySelector('#dialog-settings');
const settings = document.querySelector('#settings-icon');
const closeButton = document.querySelector('#close-button');
const fontButton = document.querySelectorAll('#font');
const colorsButton = document.querySelectorAll('#circle');
const applyButton = document.querySelector('.button');

applyButton.addEventListener('click', () => {
  apply();
})

fontButton.forEach((item, index) => {
  item.addEventListener('click', () => {
    fontButton.forEach(item => {
      item.classList.remove('color-font');
    })
    item.classList.add('color-font');
    item.classList.forEach(item =>{
      if(item === 'font-1'){
        font = 'khumb'
      }
      if(item ===  'font-2'){
        font = 'roboto'
      }
      if(item === 'font-3'){
        font = 'space'
      }
    })
  })
})

colorsButton.forEach(item => {
  item.addEventListener('click', () => {
    colorsButton.forEach(item =>{
      item.innerText = '';
    })
    item.innerText = '✓';
    item.classList.forEach(item =>{
      if(item === 'circle-1'){
        color = 'orange'
      }
      if(item ===  'circle-2'){
        color = 'blue'
      }
      if(item === 'circle-3'){
        color = 'purple'
      }
    })
  })
})


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

function apply(){
  const html = document.querySelector('html');

  switchColors(html);

  switchFonts(html);

  dialogSettings.close();
}


function switchFonts(html){
  if(font == 'khumb'){
    html.classList.remove('spacemono', 'robotoslab');
    html.classList.add('khumbs')
  }

  if(font == 'roboto'){
    html.classList.remove('khumbs', 'spacemono');
    html.classList.add('robotoslab')
  }

  if(font == 'space'){
    html.classList.remove('khumbs', 'robotoslab');
    html.classList.add('spacemono')
  }
}

function switchColors(html){
  if(color === 'blue'){
    html.classList.remove('ligth-purple', 'ligth-blue');
    html.classList.add('ligth-blue');  
  }
  
  if(color == 'purple'){
    html.classList.remove('orange','ligth-blue');
    html.classList.add('ligth-purple'); 
  }

  if(color == 'orange') {
    html.classList.remove('ligth-purple', 'ligth-blue');
    html.classList.add('orange')
  }
}
