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

    const categoryHeader = document.createElement('span');
    categoryHeader.innerHTML = "Kategori";
    formContainer.appendChild(categoryHeader);

    const categorySelect = document.createElement('select'); 
    categorySelect.className = "input";
    categorySelect.id = "category";

    const choices = [
        "🟢 Sådd/plantering", 
        "🟡 Rensning", 
        "🔵 Vattning", 
        "🟤 Jordbearbetning", 
        "🟣 Skörd", 
        "⚫ Övrigt"
    ]

    for (choice of choices) {
        const option = document.createElement('option');
        option.value = choice;
        option.innerText = choice;
        categorySelect.appendChild(option);
    }
    if(chore) {
        categorySelect.value = chore.category
    }
    formContainer.appendChild(categorySelect);

    const titleHeader = document.createElement('span');
    titleHeader.innerHTML = "Uppgiftsbeskrivning";
    formContainer.appendChild(titleHeader);

    const titleInput = document.createElement('textarea'); 
    titleInput.type = "text";
    titleInput.className = "input";
    titleInput.id = "title";
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
    timeInput.id = "time";
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
    dateInput.id = "date";
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