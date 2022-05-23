console.log('This app is creaed by sanjeev kumar singh ');
const socket = io('http://localhost:8000', { transports: ['websocket'] });

const form = document.getElementById('send-container');

const messageInput = document.getElementById('messageInp');

const messageContainer = document.querySelector(".container");

var audio = new Audio('ting.mp3');
var audio1 = new Audio('chicken.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio1.play();
    }
    else {
        audio.play();
    }
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (messageInput.value == '')
        alert('Please enter message to send');
    else {
        const message = messageInput.value;
        append(`You : ${message}`, 'right');
        socket.emit('send', message);
        messageInput.value = '';
    }

});

const name = prompt("Enter your name  to join");

socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} : Joined the chat`, 'left');
});

socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'left');

});

socket.on('left', name => {
    append(`${name} : Left the chat`, 'left');

});
