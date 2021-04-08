window.addEventListener("load", main)

function main() {
    getChores();
    renderForm();
}

async function getChores() {
    const response = await fetch('/api/chores');
    const chores = await response.json();
    const choreContainer = document.getElementById("chores");
    choreContainer.innerHTML = '';
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
            formTitle.innerHTML = `Ändra uppgift #${chore.id}`; 
        }
        else {
            formTitle.innerHTML = "Lägg till en ny uppgift"; 
        }
    formContainer.appendChild(formTitle);

    const titleHeader = document.createElement('span');
    titleHeader.innerHTML = "Uppgiftsbeskrivning";
    formContainer.appendChild(titleHeader);

    const titleInput = document.createElement('textarea'); 
    titleInput.type = "text";
    titleInput.className = "input";
    titleInput.id = "title"
    if(chore) {
        titleInput.value = chore.title
    }
    else {
        titleInput.placeholder = "Fyll i uppgiftsbeskrivning"
    }
    formContainer.appendChild(titleInput);

    const timeHeader = document.createElement('span');
    timeHeader.innerHTML = "Uppskattad tidsåtgång";
    formContainer.appendChild(timeHeader);

    const timeInput = document.createElement('input'); 
    timeInput.type = "number";
    timeInput.className = "input";
    timeInput.id = "time"
    if(chore) {
        timeInput.value = chore.time
    }
    else {
        timeInput.placeholder = "Uppskattad tid i minuter"     
    }
    formContainer.appendChild(timeInput);

    const dateHeader = document.createElement('span');
    dateHeader.innerHTML = "Datum för färdigställande";
    formContainer.appendChild(dateHeader);

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
        const deleteButton = document.createElement('button');
        deleteButton.type = "submit";
        deleteButton.className = "input";
        deleteButton.innerHTML = "Ta bort uppgift";
        deleteButton.addEventListener("click", deleteChore.bind(chore));
        formContainer.appendChild(deleteButton);
    }
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

function submitChore() {
    let choreId = this.id;
    if(choreId) {
        const choreTitle = document.getElementById("title").value;
        const choreTime = document.getElementById("time").value;
        const choreDate = document.getElementById("date").value;
        const newChore = {id: choreId, title: choreTitle, time: choreTime, date: choreDate};
        editChoreInAPI(newChore);
    }
    else {
        choreId = Math.floor(Math.random() * 10000);
        const choreTitle = document.getElementById("title").value;
        const choreTime = document.getElementById("time").value;
        const choreDate = document.getElementById("date").value;
        const newChore = {id: choreId, title: choreTitle, time: choreTime, date: choreDate};
        addNewChoreToAPI(newChore);
    }
    getChores();
    renderForm();
}

async function deleteChore() {
    const confirmDelete = confirm(`Vill du verkligen ta bort uppgift #${this.id}?`);
    if(confirmDelete===true) {
        const response = await fetch('/api/chores', {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(this)
        });
        const result = await response.json();
        console.log(result);
        getChores();
        renderForm();
    }
    else {
        renderForm();
    }
}

async function editChoreInAPI(newChore) {
    const response = await fetch('/api/chores', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(newChore)
      }); 
      const result = await response.json();
      console.log(result);
}

async function addNewChoreToAPI(newChore) {
    const response = await fetch('/api/chores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(newChore)
      });
      const result = await response.json();
      console.log(result);
}