var timeLeft = new Date(0);
onReset();

function onReset() {
  onPause();
  timeLeft = new Date(0);
  timeLeft.setSeconds(15);
  updateView();
}

var everySecondInterval;
function onStart() {
  onPause();
  everySecondInterval = setInterval(() => {
    if (timeLeft.getSeconds() <= 0) {
      onPause();
      return;
    }
    timeLeft.setSeconds(timeLeft.getSeconds() - 1);
    updateView();
  }, 1000);
}
function onPause() {
  clearInterval(everySecondInterval);
}

function updateView() {
  if (document.getElementById("timer") != null) {
    let minutesStr = ("00" + timeLeft.getMinutes()).slice(-2);
    let secondsStr = ("00" + timeLeft.getSeconds()).slice(-2);
    let timerString = minutesStr + ":" + secondsStr;
    document.getElementById("timer").innerText = timerString;
  }
}
