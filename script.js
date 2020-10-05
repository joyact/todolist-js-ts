const hourHand = document.querySelector('[data-hour-hand]');
const minuteHand = document.querySelector('[data-minute-hand]');
const secondHand = document.querySelector('[data-second-hand]');

const setClock = () => {
  const currentDate = new Date();
  const secondsRatio = currentDate.getSeconds() / 60;
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
  //adding ratio to the value makes hands gradually move
  setRotation(secondHand, secondsRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hoursRatio);
};

const setRotation = (element, rotationRatio) => {
  element.style.setProperty('--rotation', rotationRatio * 360);
};

setInterval(setClock, 1000);
setClock();
