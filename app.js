const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const io        = require('socket.io')(server);

const LISTEN_PORT = 8080;

// middleware to serve static files
app.use(express.static(__dirname + '/public;'));

//create our routes
app.get('/', function(req,res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/player2', function(req,res) {
    res.sendFile(__dirname + '/public/player2.html');
});

app.get('/player1', function(req,res) {
    res.sendFile(__dirname + '/public/player1.html');
});

io.on('connection', (socket) => {
    console.log(socket.id + " is connected");

    socket.on('disconnect', () =>{
        console.log(socket.id + " is disconnected");
    })

    // -- Player Input --
    socket.on('p1_rock', (data) => {
        io.emit('p1_choice', {choice:1});
    });

    socket.on('p1_paper', (data) => {
        io.emit('p1_choice', {choice:2});
    });

    socket.on('p1_scissors', (data) => {
        io.emit('p1_choice', {choice:3});
    });

    socket.on('p2_rock', (data) => {
        io.emit('p2_choice', {choice:1});
    });

    socket.on('p2_paper', (data) => {
        io.emit('p2_choice', {choice:2});
    });

    socket.on('p2_scissors', (data) => {
        io.emit('p2_choice', {choice:3});
    });

    // -- End of Player Input --
});

//start our server
server.listen(LISTEN_PORT);
console.log("Server started on port " + LISTEN_PORT);