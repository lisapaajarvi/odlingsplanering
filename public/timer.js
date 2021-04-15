function renderTimer(chore) {
    const timerContainer = document.getElementById("timer");
    timerContainer.innerHTML = '';

    const timerTitle = document.createElement('h2'); 
    timerTitle.innerHTML = "Utför uppgift";
    timerContainer.appendChild(timerTitle);

    const timerDiv = document.createElement('div'); 
    timerDiv.className = "timerDiv";
    timerContainer.appendChild(timerDiv);

    const choreTitle = document.createElement('h4'); 
    choreTitle.innerHTML = chore.title;
    timerDiv.appendChild(choreTitle);

    const countdown = document.createElement('p'); 
    countdown.id = "countdown";
    let choreTime = chore.time* 60;
    let hours = parseInt(choreTime / 3600, 10);
    let minutes = parseInt(choreTime % 3600 / 60, 10);
    let seconds = parseInt(choreTime % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    
    countdown.innerHTML = hours > 0 ? hours + ":" + minutes + ":" + seconds : minutes + ":" + seconds;
    timerDiv.appendChild(countdown);

    const startButton = document.createElement('button');
        startButton.type = "submit";
        startButton.className = "input";
        startButton.innerHTML = "Starta timer";
        startButton.addEventListener("click", ()=> {
            startTimer(chore.time)
        });
        timerDiv.appendChild(startButton);
}

function startTimer(time) {
    let countdown = document.getElementById("countdown");
    let choreTime = time* 60 -1;
    console.log(choreTime)
    let choreTimer = setInterval(function(){
        let hours = parseInt(choreTime / 3600, 10);
        let minutes = parseInt(choreTime % 3600 / 60, 10);
        let seconds = parseInt(choreTime % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        if(choreTime <= 0){
            clearInterval(choreTimer);
            countdown.innerHTML = "00:00";
            const timeIsUp = document.createElement('p'); 
            timeIsUp.innerHTML = "Tiden är ute!";
            timerDiv.appendChild(timeIsUp)
        } else {
            countdown.innerHTML = hours > 0 ? hours + ":" + minutes + ":" + seconds : minutes + ":" + seconds;
        }
    choreTime -= 1;
    }, 1000);
}