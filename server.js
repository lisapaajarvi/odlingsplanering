const express = require('express');
const port = 3000;
const app = express();

let chores = [
    {
        "id": 2784,
        "category": "🟡 Rensning",
        "title": "Rensa ogräs i bädd A2",
        "time": 30,
        "date": "2021-04-10"
    },
    {
        "id": 3988,
        "category": "🟢 Sådd/plantering",
        "title": "Så lupiner i bädd A2",
        "time": 30,
        "date": "2021-04-15"
    },
    {
        "id": 4589,
        "category": "🟤 Jordbearbetning",
        "title": "Gräv upp bädd A4",
        "time": 120,
        "date": "2021-04-23"
    },
]

app.use(express.static('public'));

app.use(express.json());

app.get('/api/chores', (req,res) => {
    res.json(chores);
});

app.post('/api/chores', (req,res) => {
    const index = chores.findIndex(chore => chore.id === req.body.id);
    if(index=== -1) {
        chores.push(req.body);
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
        res.status(200).json(deletedChore);  
    }
    else {
        res.status(418).json("This chore does not exist!");
    }
})

app.put('/api/chores', (req,res) => {
    const index = chores.findIndex(chore => chore.id === req.body.id);
    if(index!== -1) {
        const editedChore = chores.splice(index, 1, req.body);
        res.status(200).json(editedChore, req.body);  
    }
    else {
        res.status(418).json("This chore does not exist!");
    }
})


app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))