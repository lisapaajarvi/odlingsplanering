window.addEventListener("load", main)

function main() {
    getChores();
    const submitButton = document.getElementById("submit")
    submitButton.addEventListener("click", addNewChore)
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
}

async function addNewChore() {
    const choreId = document.getElementById("id").value;
    const choreTitle = document.getElementById("title").value;
    const choreTime = document.getElementById("time").value;
    const choreDate = document.getElementById("date").value;

    const newChore = {id: choreId, title: choreTitle, time: choreTime, date: choreDate};
    

    const response = await fetch('/api/chores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(newChore)
      });
      
      const result = await response.json();
      console.log(result); 
      getChores();


}

