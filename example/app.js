const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8000;

const { filterPlays, checkBody } = require('./utils.js');

const insults = [
    {
        insult: "Never hung poison on a fouler toad",
        play: "Rickard III"
    },
    {
        insult: "He thinks too much: such men are dangerous. ",
        play: "Julius Ceasar"
    }
];

app.use(express.json()); // Tolkar allt som kommer i en body som JSON

// En middleware körs innan ett request går in i en matchande route
// next() triggar att gå vidare i koden till en matchande route
app.use((request, response, next) => {
    console.log(`I en middleware innan route ${request.url} och metod: ${request.method}`);
    next();
});

app.get('/', (request, response) => {
    response.send('<h1>Välkommen</h1>'); // Response.send() är det sista man gör, fungerar som en return i en funktion
});

app.get('/api/insults', (request, response) => {
    response.json(insults)
});

app.post('/api/insults', checkBody, (request, response) => {
    const insultObj = request.body;

    const { insult, play} = insultObj;

    insults.push({ insult: insult, play: play });

    const result = {
        success: true,  
        insults: insults
    }

    response.json(result);
});

app.get('/api/insults/:play', (request, response) => {
    const play = request.params.play
    console.log(request.params);
    const result = filterPlays(insultsJSON.insults, play);

    const resObj = {
        success: true,
        insults: result
    }

    response.json(resObj);
});

app.use((request, response, next) => {
    response.status(404).json({ error: 'No endpoint found' });
});

app.listen(PORT, () => {
    console.log('Server started');
});