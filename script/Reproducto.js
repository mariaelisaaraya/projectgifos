
const recorderTitle = document.getElementById('recorderTitle');
const uploadingBtns = document.getElementById('uploadingBtns');
const recorderPreview = document.getElementById('recorderPreview');
const uploadDisplay = document.getElementById('uploadDisplay');
const recorderDisplay = document.getElementById('recorderDisplay');
const uploadBtn = document.getElementById('uploadBtn');
const recordedGif = document.getElementById('recordedGif');
const myKey = "RoFq898LQn130ZY7iP2TBlrDuefnjvV0";
const recorderWindow = document.getElementById('recorder');
const recorderEnd = document.getElementById('recorderEnd');
const recordedGifPvw = document.getElementById('recordedGifPvw');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const readyBtn = document.getElementById('readyBtn');
const gifos = document.getElementById('gifos');
const gifLink = document.getElementById('gifLink');
const choose_topic = document.getElementById('choose_topic');
const light = document.getElementById('light');
const dark = document.getElementById('dark');
const create_guifos = document.getElementById('create_guifos');
const repeatBtn = document.getElementById('repeatBtn');
const closeBtn1 = document.getElementById('close1');
const closeBtn2 = document.getElementById('close2');
const closeBtn3 = document.getElementById('close3');
const gifRecorderWin = document.getElementById('gifRecorder');
const nav_button = document.getElementById('nav_button');
const recorderPreCapture = document.getElementById('recorderPreCapture');
const recorderLive = document.getElementById('recorderLive');
const recorderIntro = document.getElementById('recorderIntro');

//Get nav_button display on opening window
window.onload = displayItems();

function displayItems() {
    let displayBtns = window.localStorage.getItem('displayBtns');
    let gifRecorder = window.localStorage.getItem('gifRecorder');
    nav_button.className = displayBtns;
    gifRecorderWin.className = gifRecorder;
    window.localStorage.removeItem('displayBtns');
    window.localStorage.removeItem('gifRecorder');
}

//Get theme on opening window
window.onload = loadTheme();

function loadTheme() {
    let theme;
    if (!window.localStorage.getItem('theme')) {
        theme = 'light'
    } else{
        theme = window.localStorage.getItem('theme');
    }
    document.getElementById('theme').className = theme;
}
//Open Theme Menu

choose_topic.addEventListener('click',openMenu);

function openMenu() {
    let theme_button = document.getElementById("theme_button")
    theme_button.classList.toggle("display");
};

//Switch Theme

light.addEventListener('click', setLight);
dark.addEventListener('click', setDark);

function setLight() {
    document.getElementById('theme').className = 'light';
    //Save Theme
    let theme = document.getElementById('theme').className;
    window.localStorage.setItem('theme',theme);
    //Hide theme Dropdown
    document.getElementById('theme_button').classList.toggle('display');
}

function setDark() {
    document.getElementById('theme').className = 'dark';
    //Save Theme
    let theme = document.getElementById('theme').className;
    window.localStorage.setItem('theme',theme);
    //Hide theme Dropdown
    document.getElementById('theme_button').classList.toggle('display');
}

//Open Crear Gif
create_guifos.addEventListener('click',function () {
    nav_button.classList.toggle('noDisplay');
    nav_button.classList.toggle('displayFlex');
    gifRecorderWin.classList.toggle('noDisplay');
    gifRecorderWin.classList.toggle('displayFlex');
});

//Cancel Crear Gif
document.getElementById('cancelBtn').addEventListener('click',function () {
    nav_button.classList.toggle('noDisplay');
    nav_button.classList.toggle('displayFlex');
    gifRecorderWin.classList.toggle('noDisplay');
    gifRecorderWin.classList.toggle('displayFlex');

});

//Start Crear gif

let myStream;

document.getElementById('startBtn').addEventListener('click',function () {
    recorderIntro.classList.toggle('display');
    recorderIntro.classList.toggle('noDisplay');
    recorderWindow.classList.toggle('display');
    recorderWindow.classList.toggle('noDisplay');
    recorderDisplay.classList.toggle('noDisplay');
    recorderDisplay.classList.toggle('display');
    recorderPreCapture.classList.toggle('display');
    recorderPreCapture.classList.toggle('noDisplay');
    getStream();
});

const video = document.getElementById('gifRecord');
const config = { type: 'gif' };

//Capture Stream

function getStream() { 
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: {max: 720},
            facingMode: "user"
        }
    })
    .then(function(stream) {
        video.srcObject = stream;
        video.play();
        myStream = stream;
    });
};

//Record camera stream
let recorder;
function record() {
    recorder = RecordRTC(myStream, config);
    recorder.startRecording();
    return recorder;
};


//Begin Video recording
document.getElementById('captureCam').addEventListener('click',record);
document.getElementById('captureBtn').addEventListener('click',record);
document.getElementById('captureCam').addEventListener('click',function () {
    recorderPreCapture.classList.toggle('display');
    recorderPreCapture.classList.toggle('noDisplay');
    recorderLive.classList.toggle('displayFlex');
    recorderLive.classList.toggle('noDisplay');
    document.getElementById('recorderTitle').innerHTML = 'Capturando tu Guifo';
});
document.getElementById('captureBtn').addEventListener('click',function () {
    recorderPreCapture.classList.toggle('display');
    recorderPreCapture.classList.toggle('noDisplay');
    recorderLive.classList.toggle('displayFlex');
    recorderLive.classList.toggle('noDisplay');
    document.getElementById('recorderTitle').innerHTML = 'Capturando tu Guifo';
});

//Stop Recording
document.getElementById('recordingBtn').addEventListener('click',stopRecord);
document.getElementById('stopBtn').addEventListener('click',stopRecord);
document.getElementById('recordingBtn').addEventListener('click',function () {
    recorderLive.classList.toggle('displayFlex');
    recorderLive.classList.toggle('noDisplay');
    recorderPreview.classList.toggle('displayFlex');
    recorderPreview.classList.toggle('noDisplay');
    document.getElementById('recorderTitle').innerHTML = 'Vista Previa';
});
document.getElementById('stopBtn').addEventListener('click',function () {
    recorderLive.classList.toggle('displayFlex');
    recorderLive.classList.toggle('noDisplay');
    recorderPreview.classList.toggle('displayFlex');
    recorderPreview.classList.toggle('noDisplay');
    document.getElementById('recorderTitle').innerHTML = 'Vista Previa';
});

//Stop Recording Function
function stopRecord() {
    recorder.stopRecording(processRecording);
    myStream.getTracks().forEach(function(track) {
        track.stop();//Stop the Camera
        });
    video.classList.add('noDisplay')
    document.getElementById('recordedGif').classList.toggle('noDisplay');
    document.getElementById('recordedGif').classList.toggle('display')
};

//Process data and display preview

function processRecording() {
    let form = new FormData();
    let blob = recorder.getBlob();
    form.append('file', blob, 'miGif.gif');
    console.log(form.get('file'));
    console.log(blob);
    recordedGif.src = URL.createObjectURL(blob);
}


//Repetir Captura

repeatBtn.addEventListener('click',function () {
    recorderPreview.classList.toggle('displayFlex');
    recorderPreview.classList.toggle('noDisplay');
    recorderPreCapture.classList.toggle('display');
    recorderPreCapture.classList.toggle('noDisplay');
    document.getElementById('recorderTitle').innerHTML = 'Un Chequeo Antes de Empezar';
    recordedGif.classList.toggle('noDisplay');
    recordedGif.classList.toggle('display');
    video.classList.remove('noDisplay');
    getStream();
});

//Upload Guifo

uploadBtn.addEventListener('click',uploadGif);
uploadBtn.addEventListener('click',function () {
    recorderDisplay.classList.toggle('display');
    recorderDisplay.classList.toggle('noDisplay');
    uploadDisplay.classList.toggle('displayFlex');
    uploadDisplay.classList.toggle('noDisplay');
    recorderPreview.classList.toggle('displayFlex');
    recorderPreview.classList.toggle('noDisplay');
    uploadingBtns.classList.toggle('noDisplay');
    uploadingBtns.classList.toggle('displayFlex');
    recorderTitle.innerHTML = 'Un Chequeo Antes de Empezar';
});

//Upload Gif

let createdGifURL;
function uploadGif() {
    let form = new FormData();
    form.append('file', recorder.getBlob(), 'Fgif.gif');
    fetch('https://upload.giphy.com/v1/gifs?&api_key='+ myKey, {
        method: 'POST',
        body: form,
    })

    .then((response)=> {
        return response.json()
    })

    .then((myJson) => {
        let gifId = myJson.data.id;
        fetch('https://api.giphy.com/v1/gifs/' + gifId + '?&api_key=' + myKey)

        .then((res) => {
            return res.json()
        })
        
        .then((json) => {
            let id = json.data.id;
            console.log(id);
            createdGifURL = json.data.images.original.url;
            localStorage.setItem(id, createdGifURL);
            
            uploadDisplay.classList.toggle('displayFlex');
            uploadDisplay.classList.toggle('noDisplay');
            recorderWindow.classList.toggle('display');
            recorderWindow.classList.toggle('noDisplay');
            recorderEnd.classList.toggle('display');
            recorderEnd.classList.toggle('noDisplay');
            gifLink.value = createdGifURL;
            recordedGifPvw.src = createdGifURL;
            let newGifoDiv = document.createElement('div');
            let newGifo = document.createElement('img');
            newGifoDiv.appendChild(newGifo);
            gifos.appendChild(newGifoDiv);
            newGifo.src = createdGifURL;
        });
    })

    .catch((error) => {
        console.error(error);
    });

    console.log(createdGifURL);
    return createdGifURL;
}



//Cancel upload

document.getElementById('cancelUpload').addEventListener('click',cancelUpload);
document.getElementById('cancelUpload').addEventListener('click',function () {
    recorderWindow.classList.toggle('display');
    recorderWindow.classList.toggle('noDisplay');
    recorderIntro.classList.toggle('noDisplay');
    recorderIntro.classList.toggle('display');
    uploadDisplay.classList.toggle('displayFlex');
    uploadDisplay.classList.toggle('noDisplay');
    uploadingBtns[0].classList.toggle('noDisplay');
    uploadingBtns[0].classList.toggle('displayFlex');
});

//Load My Gifs

function loadGifs() {
    gifos.innerHTML = '';
    let gifArray = [];
    for (let i = 0; i < localStorage.length; i++) {
        gifArray.push(localStorage.key(i));
    };
    if (gifArray.indexOf('theme') !== -1 ) {
        let indexTheme = gifArray.indexOf('theme');
        gifArray.splice(indexTheme,1)
    };
    for (let i = 0; i < gifArray.length; i++) {
        let gifId = gifArray[i];
        let storedGifUrl = localStorage.getItem(gifId);
        let storedGifoDiv = document.createElement('div');
        let storedGifo = document.createElement('img');
        storedGifoDiv.appendChild(storedGifo);
        gifos.appendChild(storedGifoDiv);
        storedGifo.src = storedGifUrl;
    };
};

loadGifs();

//Cancel upload

function cancelUpload() {
    console.log('Cancel upload')
}

//Copy Gifo

copyBtn.addEventListener('click',copyGif);
function copyGif(){
    gifLink.select();
    document.execCommand('copy');
};

//Download gifo
downloadBtn.addEventListener('click',downloadGif);
function downloadGif() {
    window.open(createdGifURL,'_blank');
    console.log('ke paso ahi');
};

//Ready Btn

readyBtn.addEventListener('click',returncreate_guifos);
function returncreate_guifos() {
    recorderEnd.classList.toggle('display');
    recorderEnd.classList.toggle('noDisplay');
    recorderPreview.classList.toggle('displayFlex');
    recorderPreview.classList.toggle('noDisplay');
}

closeBtn1.addEventListener('click',function () {
    nav_button.classList.toggle('noDisplay');
    nav_button.classList.toggle('displayFlex');
    gifRecorderWin.classList.toggle('noDisplay');
    gifRecorderWin.classList.toggle('displayFlex');
});

closeBtn2.addEventListener('click',function () {
    nav_button.classList.toggle('noDisplay');
    nav_button.classList.toggle('displayFlex');
    gifRecorderWin.classList.toggle('noDisplay');
    gifRecorderWin.classList.toggle('displayFlex');
});

closeBtn3.addEventListener('click',function () {
    nav_button.classList.toggle('noDisplay');
    nav_button.classList.toggle('displayFlex');
    gifRecorderWin.classList.toggle('noDisplay');
    gifRecorderWin.classList.toggle('displayFlex');
    recorderWindow.classList.remove('display');
    recorderIntro.classList.toggle('display');
    recorderIntro.classList.toggle('noDisplay');
    if (!recorderWindow.classList.contains('noDisplay')) {
        recorderWindow.classList.toggle('noDisplay')
    }
    recorderDisplay.classList.remove('display');
    if (!recorderDisplay.classList.contains('noDisplay')) {
        recorderDisplay.classList.toggle('noDisplay')
    }
    recorderPreCapture.classList.remove('display');
    if (!recorderPreCapture.classList.contains('noDisplay')) {
        recorderPreCapture.classList.toggle('noDisplay')
    }
    recorderLive.classList.remove('displayFlex');
    if (!recorderLive.classList.contains('noDisplay')) {
        recorderLive.classList.toggle('noDisplay')
    }
    uploadDisplay.classList.remove('displayFlex');
    if (!uploadDisplay.classList.contains('noDisplay')) {
        uploadDisplay.classList.toggle('noDisplay')
    }
    uploadingBtns.classList.remove('displayFlex');
    if (!uploadingBtns.classList.contains('noDisplay')) {
        uploadingBtns.classList.toggle('noDisplay')
    }
    stopRecord()
});