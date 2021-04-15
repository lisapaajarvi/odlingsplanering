const express = require('express');
const fs = require('fs');
const port = 3000;
const app = express();

let choresJSON = fs.readFileSync('chores.json');
let chores = JSON.parse(choresJSON);

app.use(express.static('public'));

app.use(express.json());

app.get('/api/chores', (req,res) => {
    res.json(chores);
});

app.get('/api/chores/:id', (req,res) => {
    const id = req.params.id;
    const selectedChore = chores.find(chore => chore.id == id);
    if(selectedChore) {
        res.status(200).json(selectedChore);  
    }
    else {
        res.status(418).json("This chore does not exist!");
    }
});

app.post('/api/chores', (req,res) => {
    const index = chores.findIndex(chore => chore.id === req.body.id);
    if(index=== -1) {
        chores.push(req.body);
        sendDataToJSON();
        res.status(201).json(req.body);
          
    }
    else {
        res.status(418).json("This id already exists!")
    }
});

app.delete('/api/chores', (req,res) => {
    const index = chores.findIndex(chore => chore.id === req.body.id);
    if(index!== -1) {
        const deletedChore = chores.splice(index, 1);
        sendDataToJSON();
        res.status(200).json(deletedChore);  
    }
    else {
        res.status(418).json("This chore does not exist!");
    }
});

app.put('/api/chores', (req,res) => {
    const index = chores.findIndex(chore => chore.id === req.body.id);
    if(index!== -1) {
        const editedChore = chores.splice(index, 1, req.body);
        sendDataToJSON();
        res.status(200).json(editedChore, req.body);  
    }
    else {
        res.status(418).json("This chore does not exist!");
    }
})

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))

function sendDataToJSON() {
    let choreData = JSON.stringify(chores, null, 2);
    fs.writeFileSync('chores.json', choreData);
}