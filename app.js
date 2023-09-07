

const localVideo = document.getElementById('local-video');
const remoteVideo = document.getElementById('remote-video');
const startCallButton = document.getElementById('start-call');
const endCallButton = document.getElementById('end-call');
const startRecordingButton = document.getElementById('start-recording');
const stopRecordingButton = document.getElementById('stop-recording');
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendMessageButton = document.getElementById('send-message');

let localStream, remoteStream;



startCallButton.addEventListener('click', startCall);
endCallButton.addEventListener('click', endCall);
startRecordingButton.addEventListener('click', startRecording);
stopRecordingButton.addEventListener('click', stopRecording);
sendMessageButton.addEventListener('click', sendMessage);



function startCall() {
    navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
            localVideo.srcObject = stream;
            localStream = stream;

           
        })
        .catch((error) => {
            console.error('Error accessing camera and microphone:', error);
        });
}



function endCall() {
    if (localStream) {
        localStream.getTracks().forEach((track) => {
            track.stop();
        });

      
    }
}

let mediaRecorder;

function startRecording() {
    if (localStream) {
        mediaRecorder = new MediaRecorder(localStream);

        const chunks = [];
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                chunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            const url = window.URL.createObjectURL(blob);

        
        };

        mediaRecorder.start();
    }
}



function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
    }
}



function sendMessage() {
    const message = chatInput.value;

    chatInput.value = '';
    chatBox.innerHTML += `<div class="message">You: ${message}</div>`;
}


