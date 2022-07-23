//Instance a new Audio()
const sound = new Audio();

//Play the sound after touching the key
function sound_play(number, confirm) {
    if(number === null || number === ""){
        sound.src = "assets/sounds/confirm.mp3"; 
        sound.play();
    } else {
        sound.src = "assets/sounds/digit.mp3"; 
        sound.play();
    }
}