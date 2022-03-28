import __dirname from "./utils.js";
import express from "express";
import {Server} from "socket.io";

const app = express();
 //process.env habla de una variable de entorno SINO usar el puerto 8080
 //el server le va a dar un valor a la variable de entorno (va a asignar un puerto propio de él)
const PORT = process.env.PORT ||8080; 

const server=app.listen(PORT,()=>console.log("Listen port "+PORT));
const io= new Server(server);
app.use(express.static(__dirname+'/public'))

//logueamos el chat entero
const log=[]

io.on('connection',(socket)=>{
    socket.on('message',(data)=>{
        log.push(data)
        //hacemos un io emit para que se envie global la data
        io.emit('log',log)
    })
})