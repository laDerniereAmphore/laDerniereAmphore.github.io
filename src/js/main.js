let minutes, seconds; // variables for time units
let targetDate;

const gameDuration = 1000*60*90;

let target_date_stored = sessionStorage.getItem('target_date');

if (target_date_stored !== null) {
  targetDate = new Date(0);
  targetDate.setUTCMilliseconds(parseInt(target_date_stored));
  targetDate = targetDate.getTime();
}
else {
  targetDate = new Date().getTime() + gameDuration; // set the countdown date
  sessionStorage.setItem('target_date', targetDate.toString());
}

let countdown = document.getElementById("tiles"); // get tag element

let intervalCountdown = setInterval(function () { getCountdown(); }, 1000);

if ( sessionStorage.getItem('tresor_visited') === 'true') {
  window.clearInterval(intervalCountdown);
  getFinalCountdown();
}
else {
  getCountdown();
}

function getCountdown(){
  target_date_stored = sessionStorage.getItem('target_date');
  targetDate = new Date(0);
  targetDate.setUTCMilliseconds(parseInt(target_date_stored));
  targetDate = targetDate.getTime();
  // find the amount of "seconds" between now and target
  let currentDate = new Date().getTime();

  let countdownColor = "";
  if ( targetDate >= currentDate ) {
    let seconds_left = (targetDate - currentDate) / 1000;
    if (seconds_left <= 0) {
      seconds_left = 0;
    }
    minutes = pad(parseInt(seconds_left / 60));
    seconds = pad(parseInt(seconds_left % 60));
    if (parseInt(minutes) < 5) {
      countdownColor = " style='color: orange'";
    }
  }
  else {
    let seconds_left = (currentDate - targetDate) / 1000;
    minutes = pad(parseInt(seconds_left / 60));
    seconds = pad(parseInt(seconds_left % 60));
    countdownColor = " style='color: red'";
  }

  // format countdown string + set tag value
  countdown.innerHTML = "<span" + countdownColor + ">" + minutes + "</span><span" + countdownColor + ">" + seconds + "</span>";
}

function getFinalCountdown(){
  target_date_stored = sessionStorage.getItem('target_date');
  targetDate = new Date(0);
  targetDate.setUTCMilliseconds(parseInt(target_date_stored));
  targetDate = targetDate.getTime();
  // find the amount of "seconds" between now and target
  let currentDate = new Date().getTime();

  let countdownColor = "";
  // On vérifie si on est dans les temps ou pas
  if ( targetDate >= currentDate ) {
    let secondsSpend = (gameDuration - (targetDate - currentDate)) / 1000;
    minutes = pad(parseInt(secondsSpend / 60));
    seconds = pad(parseInt(secondsSpend % 60));
  }
  else {
    let secondsSpend = (gameDuration + (currentDate - targetDate)) / 1000;
    minutes = pad(parseInt(secondsSpend / 60));
    seconds = pad(parseInt(secondsSpend % 60));
  }

  // format countdown string + set tag value
  countdown.innerHTML = "<span" + countdownColor + ">" + minutes + "</span><span" + countdownColor + ">" + seconds + "</span>";
}

function pad(n) {
  return (n < 10 ? '0' : '') + n;
}

<!-- Google Analytics: change UA-XXXXX-Y to be your site's ID. -->
window.ga = function () { ga.q.push(arguments) }; ga.q = []; ga.l = +new Date;
ga('create', 'UA-XXXXX-Y', 'auto'); ga('send', 'pageview');

function loseOneMinute() {
  let target_date_stored = sessionStorage.getItem('target_date');
  let targetDate = new Date(0);
  targetDate.setUTCMilliseconds(parseInt(target_date_stored));
  targetDate -= 1000 * 60;
  sessionStorage.setItem('target_date', targetDate.toString());
  getCountdown();
}
