let clients = [];
let events = [];

function eventsHandler(request, response, next) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);

    const data = `data: ${JSON.stringify(events)}\n\n`;

    response.write(data);

    const clientId = Date.now();

    const newClient = {
        id: clientId,
        response
    };

    clients.push(newClient);

    request.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter(client => client.id !== clientId);
    });
}

function sendEventsToAll(newEvent) {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(newEvent)}\n\n`))
}

async function addEvent(request, respsonse, next) {
    const addEvent = request.body;
    events.push(addEvent);
    respsonse.json(addEvent)
    return sendEventsToAll(addEvent);
}

function getClients () {
    return clients
}


module.exports = { eventsHandler, sendEventsToAll, addEvent, getClients }