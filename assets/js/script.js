//Populate LocalStorage
populateLocalStorage();

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

//Insert number
function insert(res){
    const name_title = document.getElementById('name_title');
    const party_title = document.getElementById('party_title');

    const number = document.getElementById('number');
    const name = document.getElementById('name');
    const party = document.getElementById('party');
    const photo = document.getElementById('photo');

    if(number.textContent.length < 2 ){

        number.textContent = number.textContent + res;
        number.style["border"] = "1px solid"

        if (number.textContent.length == 2 ) {
            let candidate = getCandidate(number.textContent);

            console.log(candidate);

            if (candidate !== 'null') {

                name_title.style['display'] = "";
                party_title.style['display'] = "";
                name.style['display'] = "";
                party.style['display'] = "";
                photo.style["display"] = "";

                name.textContent = candidate['name'];
                party.textContent = candidate['party'];

                photo.src = candidate['photo_path']
            } else {

            }
            
        }
    }
}

//Clear numbers of the left window
function fixContent() {
    const name_title = document.getElementById('name_title');
    const party_title = document.getElementById('party_title');
    const number = document.getElementById('number');
    const name = document.getElementById('name');
    const party = document.getElementById('party');
    const photo = document.getElementById('photo');

    number.textContent = "";
    name.textContent = "";
    party.textContent = "";

    name_title.style['display'] = "none";
    party_title.style['display'] = "none";
    name.style['display'] = "none";
    party.style['display'] = "none";
    photo.style["display"] = "none";
    
    photo.src = "";
    number.style["border"] = "0px";

}

//Populate local storage with data
function populateLocalStorage() {

    //Clear localStorage
    localStorage.clear();

    //Array of data
    const data = [
        {'number': '11', 'name': 'Joe', 'party' : 'PCL', 'photo_path': "/assets/img/president-joe.jpg"},
        {'number' : '12', 'name' : 'Duo', 'party' : 'PCR', 'photo_path': "/assets/img/president-Duo.jpg"},
        {'number' : '13', 'name' : 'Jhonson', 'party' : 'PD', 'photo_path': "/assets/img/president-jhonson.jpg"},
        {'number' : '14', 'name' : 'Bidu', 'party' : 'BR', 'photo_path': "/assets/img/president-bidu.jpg"}
    ];

    //For each item of const data, save in localStorage
    for (let i = 0; i < data.length; i++){
        localStorage.setItem(data[i]['number'], JSON.stringify(data[i]));
    }
}

//Get candidate after the user select in the numbers of 'urna'
function getCandidate(number) {
    let candidate = JSON.parse(localStorage.getItem(number));
    if(candidate !== null && candidate['number'] === number){
        return candidate;
    } else {
        return 'null';
    }
}