// VAR

//const { list } = require("tar");

let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let workTime = 25;
let breakTime = 5;

let seconds = "00";

// Display

window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    workTittle.classList.add('active');
}

// Start Timer

function start() {
    // Change button
    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";
    
    seconds = 59;

    let workMinutes = workTime-1;
    let breakMinutes = breakTime-1;

    breakCount = 0;

    let timerFunction = () => {
        // Change Display
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds;
    
        // Start
        seconds = seconds-1;

        if(seconds == 0) {
            workMinutes = workMinutes-1;
            if(workMinutes == -1){
                if(breakCount%2 ==0){
                    // Start Break
                    workMinutes = breakMinutes;
                    breakCount++;

                    // Change panel
                    workTittle.classList.remove('active');
                    breakTittle.classList.add('active');
                } else {
                    workMinutes = workTime;
                    breakCount++;

                    // Change panel
                    workTittle.classList.add('active');
                    breakTittle.classList.remove('active');
                }
            }
            seconds = 59;
        }
    }

    setInterval(timerFunction, 1000); // 1s
}


// MUSIC PLAYER

const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

// Songs

const songs = ['tourner','suicide','brokeboys']

// Track of songs

let songIndex = 0;

loadSong(songs[songIndex]);

function loadSong(song){
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}


function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

function prevSong() {
    songIndex--;

    if(songIndex<0){
        songIndex = songs.length-1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

function nextSong() {
    songIndex++;

    if(songIndex>songs.length-1){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

function play(){
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying){
        pauseSong();
    } else {
        playSong();
    }
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime/duration) * 100;
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX/width) * duration;
}

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);

// TODO LIST

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if(inputBox.value == ''){
        alert("You must write something!")
    } else{
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
}, false);