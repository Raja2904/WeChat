const socket = io('http://localhost:8000');

//Get DOMm element in respective Js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

//Audio tha will play on recieving message
var audio = new Audio('message_tone.mp3');

//functon which will append to the container
const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('messageInp');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){
        audio.play();
    }
}

//ask new user for his/her name and let the server know!
const name = prompt("Enter your user name");
    socket.emit('new-user-joined', name);

//If a new server is join, receive his name from the server
socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right');
});

//if server sends a message, receive it
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left');
});

//if user leaves the chat, append the info to the container
socket.on('left', name =>{
    append(`${data.name}: ${data.message}`, 'right');
});

//If the form is submitted, send server the message!
form.addEventListener('submit', (e) =>{
    e.preventDefault ();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';

});