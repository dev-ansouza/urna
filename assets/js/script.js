//Instance a new Audio()
const sound = new Audio();

//Play the sound after touching the key
function sound_play(res) {
    if(res != 1){
        sound.src = "assets/sounds/confirm.mp3"; 
        sound.play();
    } else {
        sound.src = "assets/sounds/digit.mp3"; 
        sound.play();
    }
}

function insert(res){
    const number = document.getElementById('number');

    if(number.textContent.length < 2 ){
        number.textContent = number.textContent + res;
        number.style["border"] = "1px solid"
    }
}

function fixContent() {
    const number = document.getElementById('number');
    number.textContent = "";
    number.style["border"] = "0px"
}