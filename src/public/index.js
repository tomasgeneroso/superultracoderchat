let socket=io();
let chatBox=document.getElementById('chatBox');
let user;
let log=document.getElementById('log')

//esto es una promesa por lo que podemos anidar un then() o catch()
Swal.fire({
    title: 'Identify yourself!',
    input: 'text',
    allowOutsideClick:false,
    inputValidator: (value)=>{
        console.log(value)
        return !value && 'You need identify'
    }
}).then(result=>{
    user=result.value
})

chatBox.addEventListener('keyup',(evt)=>{
    if(evt.key === 'Enter'){
        if(chatBox.value.trim().length > 0){
            socket.emit('message',{user:user, message:chatBox.value.trim()})
        }
        chatBox.value = ''
    }
})

/*SOCKET EVENTOS*/

socket.on('log',(data)=>{  
    let mensaje=''
    data.forEach((data)=>{
        mensaje=mensaje +`El cliente: ${data.user} emitio el mensaje: ${data.message} </br>`
        
    })
    log.innerHTML=mensaje
})