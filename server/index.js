const express = require('express');
const socketio = require('socket.io');
const http = require('http'); 

const { addUser, removeUser, getUser, getUserInRoom } = require('./users.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
      origin: "*"
    }}  
    );

io.on('connection', (socket) => {

    socket.on('join', ( {name,room}, callback ) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) return callback(error);

            //emit welcome message to specific user
        socket.emit('message', { user: 'admin', text: `${user.name} welcome to the room ${user.room}`});
            //broadcast admin message that user has joined to everyone except ne user
        socket.broadcast.to(user.room).emit('message', { user:'admin', text: `${user.name} has joined the chat!` }); 

        socket.join(user.room);

        callback();
    })

    //emit user message to whole room including the sender
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    })

    socket.on('disconnect', () => {
        console.log("User has left!");
    })
})

app.use(router);

server.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));