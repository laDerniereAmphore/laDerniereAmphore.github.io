let currentQuestion;
let currentQuestionNumber = 1;
const neededGoodResponses = 3;
const maximumQuestionNumber = 5;
const startingDomaineQuestionNumber = 4;
const availableQuestionNumber = 6;
const availableDomaineQuestionNumber = 3;
let good_responses = 0;
let availableQuestions = [];
let availableDomaineQuestions = [];
let questionText = "Question suivante";
let waitingForResponse = true;

const domaineDialogueText = "Et maintenant des questions sur le domaine de Roche-Cattin, qui vous accueille aujourd’hui.";

for (let i = 1; i <= availableQuestionNumber; i++) {
  availableQuestions.push(i);
}
for (let i = 1; i <= availableDomaineQuestionNumber; i++) {
  availableDomaineQuestions.push(i);
}

questionHeader = document.getElementById("questionHeader");
response1 = document.getElementById("response1");
response2 = document.getElementById("response2");
response3 = document.getElementById("response3");
response4 = document.getElementById("response4");

let currentAvailableQuestions = availableQuestions;
let currentQuestionDataMap = event_question_data_map;

function questionLauncher() {
  // On passe aux questions sur le domaine
  waitingForResponse = true;
  // Supprime tous les élements de la classe mark de la question précédente
  let toRemove = document.getElementsByClassName('mark');
  while (toRemove.length > 0) {
    toRemove[0].parentNode.removeChild(toRemove[0]);
  }

  if ( currentQuestionNumber <= maximumQuestionNumber ) {
    if ( currentQuestionNumber === maximumQuestionNumber ) {
      questionText = "Fin du questionnaire"
    }

    document.getElementById("containerQuestionEvent").style.display = "block";
    document.getElementById("dialogue").style.display = "none";
    document.getElementById("dialogueButtonReturn").style.display = "none";
    if ( currentQuestionNumber === startingDomaineQuestionNumber) {
      currentAvailableQuestions = availableDomaineQuestions;
      currentQuestionDataMap = event_question_domaine_data_map;
      createDomaineDialogue();
    }
    // Choix de la question aléatoire, puis on l'enleve des questions encore disponibles
    let randomlyChosenQuestion = Math.floor(Math.random() * currentAvailableQuestions.length);
    currentQuestion = currentQuestionDataMap[currentAvailableQuestions[randomlyChosenQuestion].toString()];
    currentAvailableQuestions.splice(randomlyChosenQuestion, 1);

    let question_text = "Question " + currentQuestionNumber.toString() + "/" + maximumQuestionNumber.toString() + " :\n";

    questionHeader.innerText = question_text + currentQuestion["question"];
    response1.innerText = currentQuestion["responses"]["1"];
    response2.innerText = currentQuestion["responses"]["2"];
    response3.innerText = currentQuestion["responses"]["3"];
    response4.innerText = currentQuestion["responses"]["4"];
    currentQuestionNumber += 1;
  }
  else {
    document.getElementById("containerQuestionEvent").style.display = "none";
    document.getElementById("dialogue").style.display = "block";
    document.getElementById("dialogueButtonReturn").style.display = "block";

    sessionStorage.setItem('vigneron_done', 'true');
    sessionStorage.setItem('vigneron_result', good_responses.toString());
    resultLauncher();
  }
}

function resultLauncher() {
  let dialogueButton = document.getElementById("dialogueButton");
  let personageImage = document.getElementById("personageImage");
  let vigneron_result_stored = parseInt(sessionStorage.getItem('vigneron_result'));
  if ( vigneron_result_stored >= neededGoodResponses ) {
    dialogueButton.innerHTML = event_map[personage]["well_done"];
    personageImage.src = "../../img/viticulteur_win.jpg";
    playAudioVigneron("well_done");
  }
  else {
    dialogueButton.innerHTML = event_map[personage]["too_bad"];
    personageImage.src = "../../img/viticulteur_lose.jpg";
    playAudioVigneron("too_bad");
  }
}

function resolveQuestion(responseId, response) {
  if (waitingForResponse ) {
    waitingForResponse = false;
    if (responseId !== currentQuestion["good_response"]) {
      createMark(response, "red_cross");
    } else {
      good_responses++;
    }
    let goodResponse = document.getElementById("response" + currentQuestion["good_response"]);
    createMark(goodResponse, "green_check");
    nextQuestionMark();
  }
}

response1.addEventListener('click',function(){
  resolveQuestion("1", response1);
});

response2.addEventListener('click',function(){
  resolveQuestion("2", response2);
});

response3.addEventListener('click',function(){
  resolveQuestion("3", response3);
});

response4.addEventListener('click',function(){
  resolveQuestion("4", response4);
});

function createMark(response, imageType) {
  let boundingClientRect = response.getBoundingClientRect();
  let goodResponseImage = document.createElement("a");
  document.body.appendChild(goodResponseImage);
  goodResponseImage.className += " mark";
  goodResponseImage.style.backgroundImage = "url(../../img/" + imageType + ".png)";
  goodResponseImage.style.backgroundSize = "cover";
  goodResponseImage.style.backgroundColor = "transparent";
  goodResponseImage.style.backgroundPosition = "center center";
  goodResponseImage.style.backgroundRepeat = "no-repeat";
  goodResponseImage.style.position = "absolute";
  goodResponseImage.style.top = (boundingClientRect.top + 5).toString() + "px";
  goodResponseImage.style.left = (boundingClientRect.left + 55).toString() + "px";
  goodResponseImage.style.height = "40px";
  goodResponseImage.style.width = "40px";
  goodResponseImage.style.zIndex="2";
  goodResponseImage.style.display = "block";
  goodResponseImage.style.opacity = "0.7";
}

function nextQuestionMark() {
  let boundingClientRect = questionHeader.getBoundingClientRect();
  let nextQuestion = document.createElement("a");
  document.body.appendChild(nextQuestion);
  nextQuestion.className += " mark questionHeader";
  nextQuestion.style.backgroundImage = "url(../../img/dialogue_next_question.png)";
  nextQuestion.style.position = "absolute";
  nextQuestion.style.top = boundingClientRect.top + "px";
  nextQuestion.style.left = boundingClientRect.left + "px";
  nextQuestion.style.paddingTop = "20px";
  nextQuestion.style.zIndex="2";
  nextQuestion.style.display = "block";
  nextQuestion.innerText = questionText;

  nextQuestion.addEventListener('click',function(){
    questionLauncher();
  });
}

function createDomaineDialogue() {

  let boundingClientRect = document.getElementById("questionHeader").getBoundingClientRect();
  let domaineDialogue = document.createElement("a");
  document.body.appendChild(domaineDialogue);
  domaineDialogue.className += " dialogueButton";
  domaineDialogue.style.position = "absolute";
  domaineDialogue.style.top = boundingClientRect.top.toString() + "px";
  domaineDialogue.style.left = boundingClientRect.left.toString() + "px";
  domaineDialogue.style.zIndex="3";
  domaineDialogue.innerHTML = domaineDialogueText;
  domaineDialogue.style.display = "block";
  playAudioVigneron('domaine');
  document.getElementById("containerQuestionEvent").style.display = "none";
  domaineDialogue.addEventListener('click',function(){
    document.getElementById("containerQuestionEvent").style.display = "block";
    domaineDialogue.style.display = "none";
    let audio = document.getElementById("audio");
    audio.pause();
  });
}

function playAudioVigneron(audioName) {
  if (!document.contains(document.getElementById("audio"))) {
    let audio      = document.createElement('audio');
    audio.id       = 'audio';
    audio.controls = 'controls';
    audio.type     = 'audio/wav';
    document.body.appendChild(audio);
  }
  let audio = document.getElementById("audio");
  audio.pause();
  audio.src = '../../audio/' + nickname + '/' + nickname + '_' + audioName + '.wav';
  audio.play();
}
