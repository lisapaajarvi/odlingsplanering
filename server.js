const express = require('express');
const port = 3000;
const app = express();

let chores = [
    {
        "id": 1,
        "category": "Rensning",
        "title": "Rensa ogräs i bädd A2",
        "time-est": 30,
        "due-date": "2021-04-10"
    },
    {
        "id": 2,
        "category": "Sådd",
        "title": "Så lupiner i bädd A2",
        "time-est": 30,
        "due-date": "2021-04-15"
    }

]

app.use(express.static('public'));
app.use(express.json());



app.get('/api/chores', (req,res) => {
    res.json(chores);
});

app.post('/api/chores', (req,res) => {
    chores.push(req.body);
    res.status(201).json(req.body);
});



app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))