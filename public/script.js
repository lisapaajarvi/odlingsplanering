window.addEventListener("load", main)

function main() {
    getChores();
}
async function getChores() {
    const response = await fetch('/api/chores');
    const chores = await response.json();
    const choreContainer = document.getElementById("chores");
    for (chore of chores) {
        const choreDiv = document.createElement('div'); 
        choreDiv.className = "choreDiv";
        const choreTitle = document.createElement('h4'); 
        choreTitle.innerHTML = chore.title;
        choreDiv.appendChild(choreTitle)
        const choreTime = document.createElement('p'); 
        choreTime.innerHTML = "Uppskattad tidsåtgång: " + chore.time + " min";
        choreDiv.appendChild(choreTime)
        const choreDate = document.createElement('p'); 
        choreDate.innerHTML = "Slutdatum: " + chore.date;
        choreDiv.appendChild(choreDate)
        choreContainer.appendChild(choreDiv);
    }

    //chores.forEach(createChoreDiv)
    //console.log(chores);
}

