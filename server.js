const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { eventsHandler, addEvent, getClients } = require('./eventsHandler');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/status', (request, response) => response.json({ clients: getClients().length }));

app.get('/events', eventsHandler);

app.post('/add-event', addEvent);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Facts Events service listening at http://localhost:${PORT}`)
})