async function renderChores() {
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

        const choreTime = document.createElement('span');
        choreTime.innerHTML = "🕒 " + chore.time + " min";
        choreDiv.appendChild(choreTime)

        const choreDate = document.createElement('span'); 
        choreDate.innerHTML = "📆 " + chore.date;
        choreDiv.appendChild(choreDate)

        const categoryIcon = document.createElement('span');
        let icon;
        switch(chore.category) { 
            case "🟢 Sådd/plantering": 
                icon = "🟢";
                break;
            case "🟡 Rensning":
                icon = "🟡";
                break; 
            case "🔵 Vattning":
                icon = "🔵";
                break;
            case "🟤 Jordbearbetning":
                icon = "🟤";
                break;
            case "🟣 Skörd":
                icon = "🟣";
                break;
            case "⚫ Övrigt":
                icon = "⚫";
                break;
        }   
        categoryIcon.innerHTML = icon;
        choreDiv.appendChild(categoryIcon)

        choreDiv.addEventListener("click", showChore.bind(chore))

        choreContainer.appendChild(choreDiv);
    }
}

function showChore() {
    renderForm(this);
}

function submitChore() {
    let choreId = this.id;
    if(choreId) {
        const choreCategory = document.getElementById("category").value;
        const choreTitle = document.getElementById("title").value;
        const choreTime = document.getElementById("time").value;
        const choreDate = document.getElementById("date").value;
        const updatedChore = {
            id: choreId, 
            category: choreCategory, 
            title: choreTitle, 
            time: choreTime, 
            date: choreDate
        };
        editChore(updatedChore);
    }
    else {
        choreId = Math.floor(Math.random() * 10000);
        const choreCategory = document.getElementById("category").value;
        const choreTitle = document.getElementById("title").value;
        const choreTime = document.getElementById("time").value;
        const choreDate = document.getElementById("date").value;
        if(choreTitle && choreTime && choreDate) {
            const newChore = {id: choreId, category: choreCategory, title: choreTitle, time: choreTime, date: choreDate};
            addNewChore(newChore);
        }
        else {
            alert("Alla fält måste fyllas i!")
        }
    }
    renderChores();
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
        renderChores();
        renderForm();
    }
    else {
        renderForm();
    }
}

async function editChore(updatedChore) {
    const response = await fetch('/api/chores', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(updatedChore)
      }); 
      const result = await response.json();
      console.log(result);
}

async function addNewChore(newChore) {
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