const socket= io.connect('http://192.168.1.42:6677',{'forceNew':true})

socket.on('messages', (data)=>{
    console.log(data)
    render(data)
}) 

function render(data){
    let html= data.map((message, index)=>{
        //Recorrer el array
        return(`
            <div class="message card">
                <div class="card-header mb-2">
                    <strong>${message.nickname}</strong>
                    <span> dice:</span>
                </div>
                <p class="card-body">${message.text}</p>
            </div>
        `)
    }).join(' ')

    let div_msgs= document.getElementById('messages') //Metes en el di con id messages la variable html
    div_msgs.innerHTML = html
    div_msgs.scrollTop = div_msgs.scrollHeight

}

function addMessage(e){
    let message= {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    }
    let nick= document.getElementById('nickname').style.display = 'none' //No poder cambiar el nickname

    socket.emit('add-message', message)
    return false
}