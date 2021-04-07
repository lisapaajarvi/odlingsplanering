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
        choreDiv.innerHTML = chore.title;
        choreContainer.appendChild(choreDiv);
    }

    //chores.forEach(createChoreDiv)
    //console.log(chores);
}

