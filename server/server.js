const express = require('express');
const socket = require('socket.io');
const cors = require('cors');

const PORT = 3001;

const app = express();
app.use(cors());

const server = app.listen(PORT, () => {
    console.log(`server starts on ${PORT}`);
    console.log(`http://localhost:${PORT}`)
})

const io = socket(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST', 'PATCH']
    }
});

let peers = [];

const broadcastEventTypes = {
    ACTIVE_USERS: 'ACTIVE_USERS',
    GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS'
}

io.on('connection', (socket) => {
    socket.emit('connection', null);
    console.log("new user connected");

    console.log(socket.id)

    socket.on('new_user', (data) => {
        peers.push({
            username: data.username,
            socketId: data.socketId
        })
        console.log('registered new user', data);
        console.log(peers);

        io.sockets.emit('broadcast', {
            event: broadcastEventTypes.ACTIVE_USERS,
            activeUsers: peers
        })
    })

    socket.on('disconnect', () => {
        console.log("user disconnected");
        peers = peers.filter(peer => peer.socketId !== socket.id)

        io.sockets.emit('broadcast', {
            event: broadcastEventTypes.ACTIVE_USERS,
            activeUsers: peers
        })
    })

    // listener related with direct call

    socket.on('pre-offer', (data) => {
        io.to(data.callee.socketId).emit('pre-offer', {
            callerUsername: data.caller.username,
            callerSocketId: socket.id
        })
    })

    socket.on('pre-offer-answer', data => {
        console.log("handling pre offer answer");
        io.to(data.callerSocketId).emit('pre-offer-answer', {
            answer: data.answer
        })
    })

    socket.on('webRTC-offer', data => {
        console.log("handling webRTC offer");
        io.to(data.calleeSocketId).emit('webRTC-offer', {
            offer: data.offer
        })
    })

    socket.on('webRTC-answer', data => {
        console.log("handling webRTC answer");
        io.to(data.callerSocketId).emit('webRTC-answer', {
            answer: data.answer
        })
    })

    socket.on('webRTC-candidate', data => {
        console.log('handling ice candidate');
        io.to(data.connectedUserSocketId).emit('webRTC-candidate', {
            candidate: data.candidate
        })
    })
});