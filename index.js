onReset();

var everySecondInterval;
var timeLeft = 0; // in ms

function onReset() {
  onPause();
  timeLeft = 0;
  resetView();
}

function getPomodoroEndDateTime() {
  let end = new Date(Date.now());
  if (timeLeft > 0) {
    end.setMilliseconds(timeLeft);
  } else {
    end.setMinutes(end.getMinutes() + 25);
  }
  return end;
}

function onStart() {
  onPause();
  showPauseButton();
  hideStartButton();
  let endDateTime = getPomodoroEndDateTime();
  everySecondInterval = setInterval(() => {
    timeLeft = endDateTime.getTime() - Date.now();
    if (timeLeft <= 0) {
      onPause();
      timeLeft = 0;
    }
    updateView();
  }, 250);
}

function onPause() {
  clearInterval(everySecondInterval);
  hidePauseButton();
  showStartButton();
}

function resetView() {
  if (document.getElementById("timer") == null) return;
  document.getElementById("timer").innerText = "25:00";
}

function updateView() {
  if (document.getElementById("timer") == null) return;

  let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  let minutesStr = ("00" + minutes).slice(-2);
  let secondsStr = ("00" + seconds).slice(-2);
  let timerString = minutesStr + ":" + secondsStr;

  document.getElementById("timer").innerText = timerString;
}

function hideStartButton() {
  document.getElementById("startButton").style.display = "none";
}

function showStartButton() {
  document.getElementById("startButton").style.display = "";
}

function hidePauseButton() {
  document.getElementById("pauseButton").style.display = "none";
}

function showPauseButton() {
  document.getElementById("pauseButton").style.display = "";
}
