const express= require('express')
const app= express()
const server= require('http').Server(app) //Libreria http y express
const io= require('socket.io')(server)

app.use(express.static('client')) //Todos los HTML de la carpeta client van a ser los que se cargan

app.get("/", (req, res)=>{
    res.status(200)
})

let messages = [{
    id: 1,
    text: 'Bienvenido al chat local. Este chat sera visible para todos los nodos que accedan a la direccion actual',
    nickname: 'Bot - 01'
}]

io.on('connection', (socket)=>{
    //Detectar cuando se conecta un cliente
    let ips= []
    let user_ip= socket.handshake.address
    if(ips.includes(user_ip)){
        console.log("if")
        console.log(ips.length)
        console.log(ips)
    }else{
        ips.push(user_ip)
        console.log("else")
        console.log(ips.length)
        console.log(ips)
    }
    
    console.log("El usuario con IP: " + socket.handshake.address + " se ha conectado")
    socket.emit('messages', messages)

    socket.on('add-message', (data)=>{
        messages.push(data) //Aniadir el dato en el array
        io.sockets.emit('messages', messages)
    })
})

server.listen(process.env.PORT || 6677, ()=>{
    console.log('Server online en http://192.168.1.42:6677')
})