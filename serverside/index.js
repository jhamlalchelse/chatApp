const express = require('express')
const http = require('http')
const cors = require('cors')
const socketIO = require('socket.io')

const app = express()
const port  = process.env.PORT


const server = http.createServer(app)
const io = socketIO(server)
app.use(cors())

let users = [{}]
io.on('connection',(socket)=>{

    socket.on('joined', ({user})=>{
        users[socket.id] = user
        // console.log(`${user} has  joined`);
        socket.broadcast.emit('userjoined',{user:"Admin",message:`${users[socket.id]} has joined`})
        socket.emit('welcome',{user:"Admin",message:`Welcome to the chat room ${users[socket.id]}`})
    })
    

    socket.on('message',({message,id})=>{
        io.emit('sendMsg',{user:users[id], message:`${message}`,id})
    })

    socket.on('disconnect',()=>{
        socket.broadcast.emit('leaveuser',{user:"Admin", message:`${users[socket.id]} leave chat room`})
        // console.log(`${users[socket.id]} Left`);
    })

})

server.listen(port,()=>{
    console.log(`Server is working on http://localhost:${port}`);
})