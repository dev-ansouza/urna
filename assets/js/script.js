//Populate LocalStorage
populateLocalStorage();

//Instance a new Audio()
const sound = new Audio();

//Constants
const window_start = document.getElementById('window-start');
const window_end = document.getElementById('window-end');
const number_title = document.getElementById('number_title');
const name_title = document.getElementById('name_title');
const party_title = document.getElementById('party_title');
const div_first_number = document.getElementById('div-first-number');
const div_second_number = document.getElementById('div-second-number');
const first_number = document.getElementById('first-number');
const second_number = document.getElementById('second-number');
const name = document.getElementById('name');
const party = document.getElementById('party');
const photo = document.getElementById('photo');
const footer_info = document.getElementById('window-left-footer-info');
const footer_invalid_candidate = document.getElementById('window-left-footer-invalid-candidate');
const footer_null_footer = document.getElementById('window-left-footer-null-vote');
const footer_white_footer = document.getElementById('window-left-footer-white-vote');

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
            photo.style["display"] = "";
            photo.src = candidate['photo_path']
        //If cadidate is null, candidate is invalid...
        } else {
            //If number of cadidate is "00", show footer_null_footer
            if (first_number.textContent + second_number.textContent == 00) {
                footer_info.style["display"] = "none";
                footer_invalid_candidate.style["display"] = "none";
                footer_null_footer.style["display"] = "";
                footer_white_footer.style["display"] = "none";
            //Case different, show footer_invalid_candidate
            } else {
                footer_info.style["display"] = "none";
                footer_invalid_candidate.style["display"] = "";
                footer_null_footer.style["display"] = "none";
                footer_white_footer.style["display"] = "none";
            }

        }
    }
}

//Clear numbers of the left window
function fixContent() {

    //Set value to empty
    first_number.textContent = "";
    second_number.textContent = "";
    name.textContent = "";
    party.textContent = "";

    //Set display style to none
    number_title.style['display'] = "";
    name_title.style['display'] = "none";
    party_title.style['display'] = "none";
    div_first_number.style['display'] = "";
    div_second_number.style['display'] = "";
    name.style['display'] = "none";
    party.style['display'] = "none";
    footer_info.style["display"] = "";
    footer_invalid_candidate.style["display"] = "none";
    footer_null_footer.style["display"] = "none";
    footer_white_footer.style["display"] = "none";
    photo.style["display"] = "none";

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

//Confirm vote
function confirmVote() {

    if(first_number.textContent !== ""){
        if(first_number.textContent + second_number.textContent == 00 || getCandidate(first_number.textContent + second_number.textContent) !== 'null') {
            
            //Show the start window 
            window_start.style['display'] = "none";
            window_end.style['display'] = ""

            //After 5 seconds, display start window
            setTimeout ( () => {
                window_start.style['display'] = "";
                window_end.style['display'] = "none"
                fixContent();
            }, 5000);
        }
    }
}

//White vote
function whiteVote(){
    //Set textContent and style[display]
    first_number.textContent = 0;
    second_number.textContent = 0;
    number_title.style['display'] = "none";
    div_first_number.style['display'] = "none";
    div_second_number.style['display'] = "none";
    footer_info.style["display"] = "none";
    footer_invalid_candidate.style["display"] = "none";
    footer_null_footer.style["display"] = "none";
    footer_white_footer.style["display"] = "";
    
}