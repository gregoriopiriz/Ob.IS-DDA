import app from "./app";
import './database';
import WebSocket from 'ws';

// Web Sockets
export const wss = new WebSocket.Server({ port: 9090 });
wss.on('connection', ws => {
    console.log('connected');
    wss.clients.forEach(c=> {
        c.send('coneccted');
    })
})

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});