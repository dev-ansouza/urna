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

    //Constants
    const name_title = document.getElementById('name_title');
    const party_title = document.getElementById('party_title');
    const first_number = document.getElementById('first-number');
    const second_number = document.getElementById('second-number');
    const name = document.getElementById('name');
    const party = document.getElementById('party');
    const photo = document.getElementById('photo');
    const footer_info = document.getElementById('window-left-footer-info');
    const footer_invalid_candidate = document.getElementById('window-left-footer-invalid-candidate');
    const footer_null_footer = document.getElementById('window-left-footer-null-vote');

    //Verify if first_number is filled
    if (first_number.textContent.length < 1) {
        first_number.textContent = res;
    //Verify if second_number is filled
    } else if (second_number.textContent.length < 1 ) {
        second_number.textContent = res;

        //After fill second_number, get candidate for view in the window
        let candidate = getCandidate(first_number.textContent + res);

        //If candidate is different of "null"
        if (candidate !== 'null') {
            name_title.style['display'] = "";
            party_title.style['display'] = "";
            name.style['display'] = "";
            party.style['display'] = "";
            photo.style["display"] = "";

            name.textContent = candidate['name'];
            party.textContent = candidate['party'];
            photo.src = candidate['photo_path']
        //If cadidate is null, candidate is invalid...
        } else {
            
            if (first_number.textContent + second_number.textContent == 00) {
                footer_info.style["display"] = "none";
                footer_invalid_candidate.style["display"] = "none";
                footer_null_footer.style["display"] = "";
            } else {
                footer_info.style["display"] = "none";
                footer_invalid_candidate.style["display"] = "";
                footer_null_footer.style["display"] = "none";
            }

        }
    }
}

//Clear numbers of the left window
function fixContent() {

    //Constants
    const name_title = document.getElementById('name_title');
    const party_title = document.getElementById('party_title');
    const first_number = document.getElementById('first-number');
    const second_number = document.getElementById('second-number');
    const name = document.getElementById('name');
    const party = document.getElementById('party');
    const photo = document.getElementById('photo');
    const footer_info = document.getElementById('window-left-footer-info');
    const footer_invalid_candidate = document.getElementById('window-left-footer-invalid-candidate');
    const footer_null_footer = document.getElementById('window-left-footer-null-vote');

    //Set value to empty
    first_number.textContent = "";
    second_number.textContent = "";
    name.textContent = "";
    party.textContent = "";

    //Set display style to none
    name_title.style['display'] = "none";
    party_title.style['display'] = "none";
    name.style['display'] = "none";
    party.style['display'] = "none";
    footer_info.style["display"] = "";
    footer_invalid_candidate.style["display"] = "none";
    footer_null_footer.style["display"] = "none";

    //Set value of source to empty
    photo.src = " ";
}

//Populate local storage with data
function populateLocalStorage() {

    //Clear localStorage
    localStorage.clear();

    //Array of data
    const data = [
        {'number': '11', 'name': 'Joe', 'party' : 'PCL', 'photo_path': "/urna/assets/img/president-joe.jpg"},
        {'number' : '12', 'name' : 'Duo', 'party' : 'PCR', 'photo_path': "/urna/assets/img/president-duo.jpg"},
        {'number' : '13', 'name' : 'Jhonson', 'party' : 'PD', 'photo_path': "/urna/assets/img/president-jhonson.jpg"},
        {'number' : '14', 'name' : 'Bidu', 'party' : 'BR', 'photo_path': "/urna/assets/img/president-bidu.jpg"}
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