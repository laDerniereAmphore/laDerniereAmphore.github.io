const personage = sessionStorage.getItem('current_personage');
let personage_name = event_map[personage]['name'];
const nickname = event_map[personage]['nickname'].toLowerCase();
let from_indices = false;

dialogue_list = event_map[personage]['dialogue'];

document.getElementById("dialogueNameButton").innerHTML = personage_name;
dialogue_idx = -1;
let dialogueButton = document.getElementById("dialogueButton");
createReturnButton();
let dialogueButtonReturn = document.getElementById("dialogueButtonReturn");

if ( dialogue_list.length === 1 ){
  dialogueButton.style.backgroundImage = "url(../../img/dialogue_button_no_arrow.png)";
}

if ( sessionStorage.getItem('from_indices') === 'true') {
  sessionStorage.setItem('from_indices', 'false');
  from_indices = true;
  dialogue_idx = event_map[personage]['important_dialogue'] - 1;
}

next_dialogue();

dialogueButton.addEventListener('click', next_dialogue, false);
dialogueButtonReturn.addEventListener('click', function(){next_dialogue(true)}, false);

function next_dialogue(reverse=false) {
  if (reverse === true) {
    if (dialogue_idx > 0) {
      dialogue_idx--;
    }
  }
  else {
    if (dialogue_idx < dialogue_list.length - 1) {
      dialogue_idx++;
    }
  }
  // Gestion des flèches en fonction de la position dans les slides
  if (dialogue_idx === 0) {
    // Il n'y a qu'un seul slide de dialogue
    if (dialogue_idx === dialogue_list.length - 1) {
      dialogueButtonReturn.style.display = "none";
      dialogueButton.style.backgroundImage = "url(../../img/dialogue_button_no_arrow.png)";
    }
    // On est sur la première slide du dialogue
    else {
      dialogueButtonReturn.style.display = "none";
      dialogueButton.style.backgroundImage = "url(../../img/dialogue_button_forward.png)";
    }
  } else {
    // On est sur la denière slide du dialogue
    if (dialogue_idx === dialogue_list.length - 1) {
      dialogueButtonReturn.style.display = "block";
      dialogueButton.style.backgroundImage = "url(../../img/dialogue_button_backward.png)";
    }
    // On est au milieu du dialogue
    else {
      dialogueButtonReturn.style.display = "block";
      dialogueButton.style.backgroundImage = "url(../../img/dialogue_button_two_ways.png)";
    }
  }

  // Avancée dans le dialogue
  if (dialogue_idx < dialogue_list.length) {
    dialogueButton.innerHTML = dialogue_list[dialogue_idx];
    playAudio();
  }

  // Spécial mechant
  if (personage_name === "Tennesse Johnson, Chasseur de trésor") {
    if (dialogue_idx === 5) {
      let personageImage = document.getElementById("personageImage");
      personageImage.src = "../../img/message.png";
      personageImage.addEventListener('click',function(){
        copyToClipboard("45.846141,4.575928");
      });
    }
  }

  // Spécial cantonnier
  if (personage_name === "Marius Bedron, Cantonnier") {
    dialogueButton.style.textAlign = "justify";
    document.getElementById("lock-plate").style.display = "none";
    if (dialogue_idx === 3) {
      let personageImage = document.getElementById("personageImage");
      personageImage.src = "../../img/bac_a_fleur.png";
    }
    if (dialogue_idx === 4) {
      let personageImage = document.getElementById("personageImage");
      personageImage.src = "../../img/bac_a_fleur.png";
      dialogueButton.style.textAlign = "center";
      createCadenas();
    }
  }

  // Spécial vigneron
  if (personage_name === "Jean Duvalon, Vigneron") {
    if (dialogue_idx === 7) {
      let vigneron_done_stored = sessionStorage.getItem('vigneron_done');
      if (vigneron_done_stored === null) {
        questionLauncher();
      } else {
        resultLauncher(dialogueButton);
      }
    } else if (dialogue_idx === 6) {
      let personageImage = document.getElementById("personageImage");
      personageImage.src = "../../img/marbre_latin.jpg";
    }
  }

  // Spécial historienne
  if (personage_name === "Hélène Vincier, Historienne") {
    if (dialogue_idx === 5) {
      let historienne_done_stored = sessionStorage.getItem('historienne_done');
      if (historienne_done_stored === null) {
        gameLauncher();
      } else {
        solutionColonne(game_data_map, from_indices);
      }
    }
  }

  // Spécial cadenas
  if (personage_name === "Un étrange mecanisme vérouillé") {
    if (dialogue_idx === 1) {
      createCadenas();
    }
  }

  // Spécial cadenas
  if (personage_name === "Le Trésor !") {
    if (dialogue_idx === 1) {
      sessionStorage.setItem('tresor_found', 'true');
      document.location.href = "../map.html";
    }
  }
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
  audio.src = '../../audio/' + nickname + '/' + nickname + dialogue_idx.toString() + '.wav';
  audio.play();
}

function createReturnButton() {
  let boundingRect = dialogueButton.getBoundingClientRect();
  let dialogueButtonReturn = document.createElement("a");
  dialogueButtonReturn.setAttribute("id", "dialogueButtonReturn");
  document.body.appendChild(dialogueButtonReturn);
  dialogueButtonReturn.style.top = boundingRect.top.toString() + "px";
  dialogueButtonReturn.style.left = boundingRect.left.toString() + "px";
}

function copyToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    document.getElementById('copyClipboardContainer').style.display = "block";
  }
  catch (err) {
    console.log('Oops, unable to copy');
  }
  document.body.removeChild(textArea);

}
