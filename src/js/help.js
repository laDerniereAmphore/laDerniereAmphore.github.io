const helpButton = document.getElementById("helpButton");
const helpHeader = document.getElementById("helpHeader");
const helpContent = document.getElementById("helpContent");
const helpAlert = document.getElementById("helpAlert");
const helpDialogue = event_map[personage]["help"];
let tabList = [];
let helpAlertAppeared = false;
let activeIdx = 0;

helpButton.addEventListener('click',function(){
  help();
});

let helpContainer = document.getElementById('helpContainer');

// When the user clicks anywhere outside of the wrongEvent, close it
helpContainer.addEventListener('click',function(event){
  if (event.target === helpContainer || event.target === helpContent) {
    helpContainer.style.display = "none";
    helpAlert.style.display = "none";
  }
});

function help() {
  helpContainer.style.display = "block";
  if (tabList.length === 0) {
    for (let helpIdx = 0; helpIdx < helpDialogue.length; helpIdx++) {
      let helpText = helpDialogue[helpIdx];
      tabList.push(createTab(helpText, helpIdx));
    }
  }
  setActive(0);
}

function createTab(helpText, helpIdx) {
  let boundingClientRect = helpHeader.getBoundingClientRect();
  let newTab = document.createElement("div");
  newTab.style.top = (boundingClientRect.top + 5).toString() + "px";
  newTab.style.left = (boundingClientRect.left + 5 + (helpIdx*95)).toString() + "px";
  helpHeader.appendChild(newTab);
  newTab.setAttribute("id", "help_tab_" + helpIdx);
  newTab.setAttribute("class", "btn helpTab");
  newTab.innerText = "Aide N°" + (helpIdx + 1).toString();
  newTab.addEventListener('click',function(){
    setActive(helpIdx)
  });
  return newTab
}

function setActive(idx) {
  if (idx === 2) {
    if (sessionStorage.getItem(personage + '_help_1') !== 'true') {
      return
    }
  }
  if (idx === 1) {
    if (sessionStorage.getItem(personage + '_help_0') !== 'true') {
      return
    }
  }
  activeIdx = idx;
  for (let i = 0; i < tabList.length; i++) {
    if (i === activeIdx) {
      if (!tabList[i].classList.contains('helpActive')) {
        tabList[i].classList.add('helpActive');
      }
    } else {
      tabList[i].classList.remove('helpActive');
    }
  }
  if (sessionStorage.getItem(personage + '_help_' + activeIdx.toString()) === 'true') {
    helpContent.innerHTML = helpDialogue[activeIdx];
  } else {
    confirmHelp();
  }
}

function confirmHelp() {
  helpAlert.style.display = "block";
  if (!helpAlertAppeared) {
    helpAlertAppeared = true;
    let helpAlertNo = document.getElementById("helpAlertNo");
    let helpAlertYes = document.getElementById("helpAlertYes");
    helpAlertNo.style.top = (170).toString() + "px";
    helpAlertNo.style.left = (0).toString() + "px";
    helpAlertYes.style.top = (170).toString() + "px";
    helpAlertYes.style.left = (125).toString() + "px";

    helpAlertNo.addEventListener('click',function(){
      helpContainer.style.display = "none";
      helpAlert.style.display = "none";
    });
    helpAlertYes.addEventListener('click',function(){
      helpContent.innerHTML = helpDialogue[activeIdx];
      helpAlert.style.display = "none";
      sessionStorage.setItem(personage + '_help_' + activeIdx.toString(), 'true');
      loseOneMinute();
      loseOneMinute();
    });
  }
}
