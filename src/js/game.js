(function () {
  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: true, cancelable: true, detail: undefined };
    let evt = document.createEvent('submit');
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;

})();

let evt = new CustomEvent("submit" );

document.getElementById("eventField").addEventListener("submit",function(event) {
  event.preventDefault();
});

let wrongEvent = document.getElementById('wrongEventContainer');

// When the user clicks anywhere outside of the wrongEvent, close it
wrongEvent.addEventListener('click',function(){
  wrongEvent.style.display = "none";
});

document.getElementById('eventButton').addEventListener('click',function(){
  const event_current_id = document.getElementById('eventField').value;
  if ( event_current_id !== "") {
    if (event_current_id in event_map) {
      sessionStorage.setItem('current_personage', event_current_id);
      location.href = event_map[event_current_id]["url"];
    } else {
      wrongEvent.style.display = "block";
      loseOneMinute();
      postElasticWrongEvent(event_current_id);
    }
  }
  else {
    document.getElementById('eventField').value = '';
  }
},false);

document.getElementById("eventField").addEventListener("submit", function(){
  const event_current_id = document.getElementById('eventField').value;
  if ( event_current_id !== "") {
    if (event_current_id in event_map) {
      sessionStorage.setItem('current_personage', event_current_id);
      location.href = event_map[event_current_id]["url"];
    } else {
      wrongEvent.style.display = "block";
      loseOneMinute();
    }
  }
  else {
    document.getElementById('eventField').value = '';
  }
});

document.getElementById('eventField').onkeydown = function(event){
  if (event.key !== undefined) {
    if(event.key === "Enter"){
      $(document.activeElement).filter(':input:focus').blur();
      document.getElementById("eventField").dispatchEvent(evt);
    }
  } else if (event.keyCode !== undefined) {
    if(event.keyCode === 13){
      $(document.activeElement).filter(':input:focus').blur();
      document.getElementById("eventField").dispatchEvent(evt);
    }
  }
};
