const dim = document.getElementById("dim");
const hour = document.getElementById("hour");
const date = document.getElementById("date");
const logo = document.getElementById("logo");
const clock = document.getElementById("clock");
const minute = document.getElementById("minute");
const themeBtn = document.getElementById("theme-btn");
const pickColor = document.getElementById("pick-color");
const colors = document.getElementsByClassName("colors");
const clockFrame = document.getElementById("clock-frame");
const chooseColor = document.getElementById("choose-color");
const dateContainer = document.getElementById("date-container");
const minuteContainer = document.getElementById("minute-container");
const secondContainer = document.getElementById("second-container");
const secondIndicator = document.getElementById("second-indicator");
const overallContainer = document.getElementById("overall-container");
const overallMinuteContainer = document.getElementById(
  "overall-minute-container"
);

// clock logic
setInterval(() => {
  let time = new Date();
  let hr = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();

  // rotation calc vars (60 * 6 = 360)
  let degSecs = 6 * sec;
  let degMins = 6 * min;

  //   rotation calc
  secondContainer.style.transform = `rotate(${degSecs}deg)`;
  overallMinuteContainer.style.transform = `rotate(${degMins}deg)`;
  minuteContainer.style.transform = `rotate(${-degMins}deg)`;
  // when time is 00
  if (parseInt(hr) === 0) hr = 12;
  hour.innerText = `${hr > 12 ? hr - 12 : hr}`;

  // show minute
  // if single digit make it double digits
  minuteContainer.firstElementChild.innerText = min;

  //   minute.innerText = `${minute.innerText < 10 ? "0" : ""}${minute.innerText}`;
}, 1000);

// choose color button
chooseColor.addEventListener("click", () => {
  // show backdrop
  dim.style.display = "block";
  //   show color picker
  pickColor.style.display = "flex";
  // close dime and color picker on dim(backdrop) click
  dim.addEventListener("click", () => {
    dim.style.display = "none";
    pickColor.style.display = "none";
  });
});

// colors
for (const color of colors) {
  color.addEventListener("click", () => {
    if (color.id === "green")
      document.documentElement.style.setProperty("--text-color", "#98c5a7");
    if (color.id === "orange")
      document.documentElement.style.setProperty("--text-color", "#f0b863");
    if (color.id === "pink")
      document.documentElement.style.setProperty("--text-color", "#ca8b98");
    if (color.id === "brown")
      document.documentElement.style.setProperty("--text-color", "#a0886c");
    if (color.id === "grey")
      document.documentElement.style.setProperty("--text-color", "#929292");
    if (color.id === "purple")
      document.documentElement.style.setProperty("--text-color", "#8364ac");

    dim.style.display = "none";
    pickColor.style.display = "none";
  });
}

// set date
date.innerText = new Date().toDateString();

// light or dark mode
let lightMode = true;
themeBtn.addEventListener("click", () => {
  // toggle mode icons
  themeBtn.firstElementChild.classList.toggle("hidden");
  themeBtn.lastElementChild.classList.toggle("hidden");

  if (lightMode) {
    document.documentElement.setAttribute("data-theme", "dark");

    lightMode = !lightMode;
  } else {
    document.documentElement.setAttribute("data-theme", "light");

    lightMode = !lightMode;
  }
});
