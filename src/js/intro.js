const personage = sessionStorage.getItem('current_personage');
let personage_name = event_map[personage]['name'];
const nickname = event_map[personage]['nickname'].toLowerCase();

dialogue_list = event_map[personage]['dialogue'];

const dialogueNameButton = document.getElementById("dialogueNameButton");
dialogueNameButton.innerHTML = personage_name;
let dialogue_idx = 0;
let dialogueButton = document.getElementById("dialogueButton");
let personageImage = document.getElementById("personageImage");
// Lancement de l'intro
introduction();


document.getElementById('dialogueButton').addEventListener('click',function(){
  introduction();
},false);

function introduction() {
  // Avancée dans le dialogue
  if ( dialogue_idx < dialogue_list.length ) {
    dialogueButton.innerHTML = dialogue_list[dialogue_idx];
    playAudio()
  }

  if ( dialogue_idx  === 3 ) {
    personageImage.src = '../img/input_field.png';
    personageImage.style.width =  "250px";
    personageImage.style.height =  "50px";
    personageImage.style.marginTop = "110px";
  }
  if ( dialogue_idx  === 4 ) {
    personageImage.src = '../img/information.png';
    personageImage.style.width =  "100px";
    personageImage.style.height =  "100px";
    personageImage.style.marginTop = "60px";
  }
  if ( dialogue_idx  === 5 ) {
    personageImage.src = '../img/help_button.png';
    personageImage.style.width =  "100px";
    personageImage.style.height =  "100px";
    personageImage.style.marginTop = "60px";
  }
  if ( dialogue_idx  === 6 ) {
    personageImage.src = '../img/map_button.png';
    personageImage.style.width =  "100px";
    personageImage.style.height =  "100px";
    personageImage.style.marginTop = "60px";
  }
  if ( dialogue_idx  === 7 ) {
    personageImage.src = '../img/archeologue.png';
    personageImage.style.width =  "240px";
    personageImage.style.height =  "160px";
    personageImage.style.marginTop = "0";
  }
  if ( dialogue_idx  === 11 ) {
    const containerForm = document.getElementById("containerForm");
    const containerEvent = document.getElementById("containerEvent");
    const dialogueNameButtonForm = document.getElementById("dialogueNameButtonForm");
    const dialogueButtonForm = document.getElementById("dialogueButtonForm");
    const formTeamNameInput = document.getElementById("formTeamNameInput");
    const formTeamNumberInput = document.getElementById("formTeamNumberInput");
    containerForm.style.display = 'block';
    containerEvent.style.display = 'none';
    dialogueNameButtonForm.innerHTML = 'Suite du dialogue';
    dialogueButtonForm.innerHTML = dialogue_list[dialogue_idx];
    dialogueNameButtonForm.addEventListener('click',function(){
      const teamName = formTeamNameInput.value;
      const teamNumber = formTeamNumberInput.value;
      postElasticTeam(teamName, teamNumber);
      containerForm.style.display = 'none';
      containerEvent.style.display = '';
      introduction();
    });
  }
  if ( dialogue_idx  === 12 ) {
    personageImage.src = '../img/archeologue.png';
    personageImage.style.width =  "240px";
    personageImage.style.height =  "160px";
    personageImage.style.marginTop = "0";
  }
  //#personageImage {
  //   width: 240px;
  //   height: 160px;
  // }

  // Sortie du personnage
  if ( dialogue_idx === dialogue_list.length - 1 ) {
    dialogueButton.style.backgroundImage = "url(../img/dialogue_button_no_arrow.png)";
    startGame();
  }
  dialogue_idx ++;
}

function playAudio() {
  if (!document.contains(document.getElementById("audio"))) {
    let audio      = document.createElement('audio');
    audio.id       = 'audio';
    audio.controls = 'controls';
    audio.type     = 'audio/wav';
    document.body.appendChild(audio);
  }
  let audio = document.getElementById("audio");
  audio.pause();
  audio.src = '../audio/' + nickname + '/' + nickname + dialogue_idx.toString() + '.wav';
  audio.play();
}

function startGame() {
  let boundingClientRect = dialogueNameButton.getBoundingClientRect();
  let startGame = document.createElement("a");
  document.body.appendChild(startGame);
  startGame.className += " mark dialogueNameButton";
  startGame.style.backgroundImage = "url(../img/dialogue_next_question.png)";
  startGame.setAttribute("href", "game.html");
  startGame.style.position = "absolute";
  startGame.style.color = "black";
  startGame.style.textDecoration = "none";
  startGame.style.top = boundingClientRect.top + "px";
  startGame.style.left = boundingClientRect.left + "px";
  startGame.style.paddingTop = "5px";
  startGame.style.marginTop = "0";
  startGame.style.zIndex="2";
  startGame.style.display = "block";
  startGame.innerText = "Commencer l'exploration";
}
