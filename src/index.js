'use strict'
require('dotenv').config()

const express = require('express')
const port = (process.env.PORT || 4000)
const cors = require('cors')
const { Client } = require('whatsapp-web.js');

const Session = require('./models/WhtasSession')
const Citas = require('./models/Citas')

//inicializacion
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http,  {
    cors: {
      origin: ["https://salon-app-109a8.web.app", "http://localhost:3000" , "https://salon-app-109a8.web.app/conexion", ],
      methods: ["GET", "POST"],
      credentials: true
    }
  })

require('./config/database')

//middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//routes
app.use('/api/v1/administrador', require('./routes/administrador'))
app.use('/api/v1/clientes', require('./routes/clientes'))
app.use('/api/v1/citas', require('./routes/citas'))
app.use('/api/v1/canjeables', require('./routes/canjeables'))
app.use('/api/v1/descuentos', require('./routes/descuentos'))
app.use('/api/v1/servicios', require('./routes/servicios'))
app.use('/api/v1/notificaciones', require('./routes/notificaciones'))



io.on('connection', socket => {
    console.log('Socket connected: ', socket.id)
    io.emit('socketlisto', { conexion: true })
})


//servidor
http.listen(port, (err) => {
    if(err){
        console.log(`Error de conexion: ${err}`)
    }else{
        console.log(`Servidor conectado en puerto: ${port}`)
    }
} )

//rutas

app.post('/postman', async (req, res) => {
    const { session, salon } = req.body
    const newSession = new Session({
        session, salon
    })
    await newSession.save()
    res.json({ message : 200 })
})


let client

app.post('/api/v1/conexion', async (req, res) => {
    const salon = req.body.salon
    console.log(salon)
    const session = await Session.findOne({ salon: salon })
   
    console.log(session)
    
    if(!session){
        client = new Client();
        
        client.on('qr', (qr) => {
            console.log(qr);
            let qrcodigo = qr
            io.emit('message',  { qrcodigo })
        
        });
        client.on('authenticated', async session => {
            console.log(session)
            const newSession = new Session({
                session, salon
            })
            await newSession.save()
        })
          
        client.on('ready', async () => {
            console.log('Client is ready!');
            await client.sendMessage('50254512710@c.us', 'Sin session')
            io.emit('conectado', {conect: true })
        });
        client.initialize();
        res.json({message: false})
    }else{
        console.log(session)
        client = new Client({
            session: session.session
        });
    
        client.on('ready', async () => {
            console.log('Client is ready!');
            await client.sendMessage('50254512710@c.us', 'Con session')
            io.emit('conectado', {conect: true })
        });
        
        client.initialize();
        
        res.json({message: true})
    } 
   
})

app.post('/api/v1/confirm', async ( req, res ) => {
        await Citas.findOneAndUpdate({ _id: req.body.id }, {
            confirmacion : true
        })
        res.json({ message : 200})  
})




  



