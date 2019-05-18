const indices = document.getElementById('indices');
let positionLeft = 0;
let positionTop = 0;

for (let event_key in event_map) {
  let event = event_map[event_key];
  // On vérifie si on doit proposer un indice pour cet évenement
  if ( 'indice' in event ) {
    // Puis on vérifie si l'élément a déjà été découvert
    if ( sessionStorage.getItem(event['nickname'].toLowerCase() + '_visited') === "true" ) {
      createIndice(event, event_key, positionLeft, positionTop);
    }
    if ( positionLeft >= 2 ){
      positionLeft = 0;
      positionTop += 1;
    }
    else {
      positionLeft += 1;
    }
  }
}

function createIndice(currentEvent, currentEventKey, positionLeft, positionTop) {
  let boundingClientRect = indices.getBoundingClientRect();
  let newIndice = document.createElement("a");
  document.body.appendChild(newIndice);
  newIndice.className += "indice";
  newIndice.style.top = (boundingClientRect.top + positionTop * (50 + 20) ).toString() + "px";
  newIndice.style.left = (boundingClientRect.left + positionLeft * (90 + 10)).toString() + "px";
  newIndice.innerText = currentEvent['nickname'];

  newIndice.addEventListener('click',function(){
    sessionStorage.setItem('from_indices', 'true');
    sessionStorage.setItem('current_personage', currentEventKey);
    location.href = currentEvent["url"];
  });
}
