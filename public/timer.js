let choreTimer;
let activeChoreTime;
let timerActive = false;

async function openTimerModal() {
    const choreId = this;
    const response = await fetch( `/api/chores/${choreId}`);
    const chore = await response.json(); 
    const timerContainer = document.getElementById("timer");
    timerContainer.style.display = "flex";

    timerContainer.innerHTML = '';

    const timerDiv = document.createElement('div'); 
    timerDiv.id = "timerDiv";
    timerContainer.appendChild(timerDiv);

    const choreTitle = document.createElement('h2'); 
    choreTitle.innerHTML = chore.title;
    timerDiv.appendChild(choreTitle);

    const countdown = document.createElement('p'); 
    countdown.id = "countdown";
    activeChoreTime = chore.time* 60;
    let hours = parseInt(activeChoreTime / 3600, 10);
    let minutes = parseInt(activeChoreTime % 3600 / 60, 10);
    let seconds = parseInt(activeChoreTime % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    
    countdown.innerHTML = hours > 0 ? hours + ":" + minutes + ":" + seconds : minutes + ":" + seconds;
    timerDiv.appendChild(countdown);

    const timerButton = document.createElement('button');
    timerButton.id = "timerButton"
    timerButton.innerHTML = "Starta timer";
    timerButton.addEventListener("click", timerButtonClick);
    timerDiv.appendChild(timerButton);

    const cancelButton = document.createElement('button');
    cancelButton.id = "cancelButton"
    cancelButton.innerHTML = "Avbryt";
    cancelButton.addEventListener("click", cancelButtonClick);
    timerDiv.appendChild(cancelButton);

}

function cancelButtonClick() {
    const timerContainer = document.getElementById("timer");
    timerContainer.style.display = "none";
}

function timerButtonClick() {
    if(timerActive){
        pauseTimer();
        timerActive = false;
    }
    else {
        startTimer();
        timerActive = true;
    }
}

function startTimer() {
    let countdown = document.getElementById("countdown");

    console.log("klickat på start")
    console.log(activeChoreTime)
    const pauseButton = document.getElementById("timerButton")
    pauseButton.innerHTML = "Pausa";

    choreTimer = setInterval(function(){
        let hours = parseInt(activeChoreTime / 3600, 10);
        let minutes = parseInt(activeChoreTime % 3600 / 60, 10);
        let seconds = parseInt(activeChoreTime % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        if(activeChoreTime <= 0){
            clearInterval(choreTimer);
            const timerDiv = document.getElementById("timerDiv")
            countdown.innerHTML = "00:00";
            const timeIsUp = document.createElement('p'); 
            timeIsUp.innerHTML = "Tiden är ute!";
            timerDiv.appendChild(timeIsUp)
        } else {
            countdown.innerHTML = hours > 0 ? hours + ":" + minutes + ":" + seconds : minutes + ":" + seconds;
        }
        activeChoreTime -= 1;
    }, 1000);
}

function pauseTimer() {
    clearInterval(choreTimer);
    console.log("pausklick" + activeChoreTime)
    const startButton = document.getElementById("timerButton")
    startButton.innerHTML = "Fortsätt";
}
