window.addEventListener("load", main)

function main() {
    getChores();
    const submitButton = document.getElementById("submit")
    submitButton.addEventListener("click", submitChore)
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

        choreDiv.addEventListener("click", editChore.bind(chore))

        choreContainer.appendChild(choreDiv);
    }
}

function renderForm(chore) {
    const formContainer = document.getElementById("form");
    formContainer.innerHTML = '';

    const formTitle = document.createElement('h2'); 
        if(chore) {
            formTitle.innerHTML = "Ändra uppgift"; 
        }
        else {
            formTitle.innerHTML = "Lägg till uppgift"; 
        }
    formContainer.appendChild(formTitle)

    const titleInput = document.createElement('textarea'); 
    titleInput.type = "text";
    titleInput.className = "input";
    titleInput.id = "title"
    if(chore) {
        titleInput.value = chore.title
    }
    else {
        titleInput.placeholder = "Fyll i uppgiftens titel"
    }
    formContainer.appendChild(titleInput);

    const timeInput = document.createElement('input'); 
    timeInput.type = "number";
    timeInput.className = "input";
    timeInput.id = "time"
    if(chore) {
        timeInput.value = chore.time
    }
    else {
        timeInput.placeholder = "Fyll i uppskattad tid (min)"     
    }
    formContainer.appendChild(timeInput);

    const dateInput = document.createElement('input'); 
    dateInput.type = "date";
    dateInput.className = "input";
    dateInput.id = "date"
    if(chore) {
        dateInput.value = chore.date
    }
    formContainer.appendChild(dateInput);

    const submitButton = document.createElement('button');
    submitButton.type = "submit";
    submitButton.className = "input";
    submitButton.id = "submit";
    if(chore) {
        submitButton.innerHTML = "Spara ändringar";
    }
    else {
        submitButton.innerHTML = "Lägg till";
    }
    submitButton.addEventListener("click", submitChore.bind(chore))
    formContainer.appendChild(submitButton);

    if(chore) {
        const cancelButton = document.createElement('button');
        cancelButton.type = "submit";
        cancelButton.className = "input";
        cancelButton.innerHTML = "Avbryt";
        cancelButton.addEventListener("click", cancelChanges);
        formContainer.appendChild(cancelButton);
    }
}

function cancelChanges() {
    renderForm();
}

function editChore() {
    renderForm(this)
}

function editChoreInAPI(newChore) {
    console.log("ändra i API")
}

function submitChore() {
    let choreId = 0;
    if(this) {
        choreId = this.id
    }
    else {
        choreId = Math.floor(Math.random() * 1000);
    }

    const choreTitle = document.getElementById("title").value;
    const choreTime = document.getElementById("time").value;
    const choreDate = document.getElementById("date").value;
    const newChore = {id: choreId, title: choreTitle, time: choreTime, date: choreDate};

    if(this) {
        editChoreInAPI(newChore)
    }
    else {
        addNewChoreToAPI(newChore)
    }
}
async function addNewChoretoAPI(newChore) {
    console.log("lägg till nytt")
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

