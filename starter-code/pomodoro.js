//#region -------------------------------------VARIABLES-------------------------------------------------
let minute = 0;
let second = 0;
let millisecond = 0;
let cron;
let secondTimer = 25 * 60;
let total = 25 * 60;
let isStarted = false;
let fontSelected;
let pomodoro = 25;
let shortBreak = 5;
let longBreak = 15;
let font;
let color = 'orange';
//#endregion -------------------------------------------------------VARIABLES

//#region  ------------------------------------DECLARATIONS-------------------------------------------------
document.querySelector('#pomodoro').value = pomodoro;
document.querySelector('#shortBreak').value = shortBreak;
document.querySelector('#longBreak').value = longBreak;
const options = document.querySelectorAll('.option');
const startButton = document.querySelector('#start');
const dialogSettings = document.querySelector('#dialog-settings');
const settings = document.querySelector('#settings-icon');
const closeButton = document.querySelector('#close-button');
const fontButton = document.querySelectorAll('#font');
const colorsButton = document.querySelectorAll('#circle');
const applyButton = document.querySelector('.button');
const input = document.querySelector('input');
var circle = document.querySelector('circle');

//#endregion                                       DECLARATIONS


//#region -------------------------------------CIRCLE-------------------------------------------------
var radius = circle.r.baseVal.value;
var circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference * 2}`;
//#endregion -----------------------------------------------CIRCLE


//#region -------------------------------------LISTENERS -------------------------------------------------

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
        item.classList.forEach(item =>{
          if(item === 'pomo'){
            total = pomodoro * 60;
            secondTimer = pomodoro * 60;
            pause();
            reset();
          }
          if(item ===  'short'){
            total = shortBreak * 60;
            secondTimer = shortBreak * 60;
            pause();
            reset()
          }
          if(item === 'long'){
            total = longBreak * 60;
            secondTimer = longBreak * 60;
            pause();
            reset()
          }
        })
    });
});

//#endregion EVENTS



//#region -------------------------------------FUNCTIONS ------------------------------------------------
function setProgress() {
  const offset = circumference - secondTimer / total * circumference;
  circle.style.strokeDashoffset = offset;
}

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
  if((minute * 60) == total){
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

  getTimes();
  
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

function getTimes(){
  pomodoro = document.querySelector('#pomodoro').value
  shortBreak = document.querySelector('#shortBreak').value;
  longBreak = document.querySelector('#longBreak').value;
}

function reset() {
  minute = 0;
  second = 0;
  millisecond = 0;
  document.getElementById('minute').innerText = '00';
  document.getElementById('second').innerText = '00';
  setProgress();
}

//#endregion --------------------------------------------------- FUNCTIONS

