const gameNameButton = document.getElementById('gameNameButton');
const containerGame = document.getElementById('containerGame');
let currentColonne;
let currentQuestionNumber = 1;
const maximumQuestionNumber = 3;
const deplacezColonneText = "Déplacez la colonne vers la bonne époque";
const historienneName = "Hélène Vincier, Historienne";

function gameLauncher() {
  gameNameButton.innerText = deplacezColonneText;

  if ( currentQuestionNumber <= maximumQuestionNumber ) {
    document.getElementById("containerGame").style.display = "block";
    document.getElementById("containerEvent").style.display = "none";
    currentColonne = game_data_map[currentQuestionNumber.toString()];
    currentQuestionNumber++;
    createColonne(currentColonne)
  }
  else {
    // On sauvegarde le fait qu'on a déjà trouvé la solution
    sessionStorage.setItem('historienne_done', 'true');
    removeColonnes();
    // On reconstruit le jeu avec la solution.
    solutionColonne(game_data_map);
  }
}

function solutionColonne(game_data_map, from_indices=false) {
  document.getElementById("containerGame").style.display = "block";
  document.getElementById("containerEvent").style.display = "none";
  Object.keys(game_data_map).forEach(function(key) {
    const currentColonne = game_data_map[key];
    const objectColonne = createColonne(currentColonne, true);
    const objectDropzone = document.getElementById('dropzone-' + currentColonne["id"]);
    objectDropzone.classList.add('dropzone-active');
    const objectDropzoneBCRect = objectDropzone.getBoundingClientRect();
    objectColonne.style.top = (objectDropzoneBCRect.top + 20).toString() + "px";
    objectColonne.style.left = (objectDropzoneBCRect.left + 0).toString() + "px";
  });
  if ( !from_indices ) {
    continueDialogueButton();
  }
  else {
    gameNameButton.innerText = historienneName;
  }
}

function returnDialogue() {
  const continueDialogue = document.getElementById('continueDialogue');
  continueDialogue.parentNode.removeChild(continueDialogue);
  document.getElementById('containerGame').style.display = 'none';
  document.getElementById("containerEvent").style.display = "";
  removeColonnes();
  next_dialogue();
}

function removeColonnes() {
  let toRemove = document.getElementsByClassName('mark');
  while (toRemove.length > 0) {
    toRemove[0].parentNode.removeChild(toRemove[0]);
  }
}

function createColonne(currentColonne, solution=false) {
  let boundingClientRect = containerGame.getBoundingClientRect();
  let newColonne = document.createElement("div");
  document.body.appendChild(newColonne);
  newColonne.style.backgroundImage = "url(" + currentColonne["image"] + ")";
  newColonne.setAttribute("id", "colonne-" + currentColonne["id"]);
  if (!solution) {
    newColonne.setAttribute("class", "btn drag-drop mark");
    newColonne.style.top = (boundingClientRect.top + 110).toString() + "px";
    newColonne.style.left = (boundingClientRect.left + 20).toString() + "px";
    newColonne.style.zIndex="2";
  }
  else {
    newColonne.setAttribute("class", "btn mark");
    newColonne.style.zIndex="-1";
  }
  newColonne.style.backgroundSize = "cover";
  newColonne.style.backgroundColor = "transparent";
  newColonne.style.backgroundPosition = "center center";
  newColonne.style.backgroundRepeat = "no-repeat";
  newColonne.style.position = "absolute";
  newColonne.style.height = "100px";
  newColonne.style.width = "100px";
  newColonne.style.display = "block";
  return newColonne;
}

function continueDialogueButton() {
  let boundingClientRect = document.getElementById("gameNameButton").getBoundingClientRect();
  let continueDialogue = document.createElement("a");
  document.body.appendChild(continueDialogue);
  continueDialogue.className += "btn";
  continueDialogue.setAttribute("id", "continueDialogue");
  continueDialogue.style.backgroundImage = "url(../../img/dialogue_next_question.png)";
  continueDialogue.style.position = "absolute";
  continueDialogue.style.top = boundingClientRect.top + "px";
  continueDialogue.style.left = boundingClientRect.left + "px";
  continueDialogue.style.paddingTop = "5px";
  continueDialogue.style.zIndex="2";
  continueDialogue.style.display = "block";
  continueDialogue.innerText = "Suite du dialogue";

  continueDialogue.addEventListener('click',function(){
    returnDialogue();
  });
}
