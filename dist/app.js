"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const dim = document.getElementById("dim");
const hour = document.getElementById("hour");
const hoursHand = document.getElementById("hour-hand");
const date = document.getElementById("date");
const logo = document.getElementById("logo");
const clock = document.getElementById("clock");
const minute = document.getElementById("minute");
const minuteHand = document.getElementById("minute-hand");
const secondsHand = document.getElementById("seconds-hand");
const themeBtn = document.getElementById("theme-btn");
const pickColor = document.getElementById("pick-color");
const colors = document.getElementsByClassName("colors");
const clockFrame = document.getElementById("clock-frame");
const chooseColor = document.getElementById("choose-color");
const dateContainer = document.getElementById("date-container");
const minuteContainer = document.getElementById("minute-container");
const secondContainer = document.getElementById("second-container");
const secondIndicator = document.getElementById("second-indicator");
const millisecondContainer = document.getElementById("milliseconds-container");
const millisecondIndicator = document.getElementById("milliseconds-indicator");
const overallContainer = document.getElementById("overall-container");
const overallMinuteContainer = document.getElementById("overall-minute-container");
const digitalHours = document.getElementById("digital-hour__data");
const digitalMinutes = document.getElementById("digital-minutes__data");
const digitalSeconds = document.getElementById("digital-seconds__data");
const digitalMs = document.getElementById("digital-mseconds__data");
const numbers = document.getElementsByClassName("numbers");
Array.from(numbers).forEach((number) => {
    const child = number.firstElementChild;
    const pi = Math.PI;
    const n = parseInt(child.className);
    child.style.transform = `translate(${Math.cos((pi * n) / 6 - pi / 2) * 100}px, ${Math.sin((pi * n) / 6 - pi / 2) * 100}px)`;
});
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
class Clock {
    constructor(id, type, format = 12) {
        this.id = id;
        this.type = type;
        this.format = format;
        this.time = new Date();
        this.milliseconds = this.time.getMilliseconds();
        this.second = this.time.getSeconds();
        this.minute = this.time.getMinutes();
        this.hour = this.time.getHours();
        this.millisecondsDeg = 0;
        this.secondsDeg = 0;
        this.minuteDeg = 0;
        this.hoursDeg = 0;
        this.tickSound = "tick";
        this.setTime();
    }
    get clockId() {
        return this.id;
    }
    getTime() {
        this.time = new Date();
        this.hour = this.time.getHours();
        this.minute = this.time.getMinutes();
        this.second = this.time.getSeconds();
        this.milliseconds = this.time.getMilliseconds();
        const millisecondsRatio = this.milliseconds / 1000;
        const secondsRatio = this.second / 60;
        const minutesRatio = (secondsRatio + this.minute) / 60;
        const hoursRatio = (minutesRatio + this.hour) / 12;
        this.millisecondsDeg = millisecondsRatio * 360;
        this.secondsDeg = secondsRatio * 360;
        this.minuteDeg = minutesRatio * 360;
        this.hoursDeg = hoursRatio * 360;
        millisecondContainer.style.transform = this.setTheHands(this.millisecondsDeg);
        millisecondIndicator.style.transform = this.setTheHands(-this.millisecondsDeg);
        secondContainer.style.transform = this.setTheHands(this.secondsDeg);
        secondIndicator.style.transform = this.setTheHands(-this.secondsDeg);
        if (secondsHand)
            secondsHand.style.transform = this.setTheHands(this.secondsDeg);
        overallMinuteContainer.style.transform = this.setTheHands(this.minuteDeg);
        minuteContainer.style.transform = this.setTheHands(-this.minuteDeg);
        if (minuteHand)
            minuteHand.style.transform = this.setTheHands(this.minuteDeg);
        if (hoursHand)
            hoursHand.style.transform = this.setTheHands(this.hoursDeg);
        if (this.hour === 0)
            this.hour = 12;
        hour.innerText = `${this.hour > 12 && this.format === 12 && this.type === "analog"
            ? this.hour - 12
            : this.hour}`;
        if (digitalHours)
            digitalHours.innerText = `${this.hour > 12 && this.format === 12 ? this.hour - 12 : this.hour}`;
        minute.innerText = `${this.minute < 10 ? "0" : ""}${this.minute}`;
        digitalMinutes.innerText = `${this.minute < 10 ? "0" : ""}${this.minute}`;
        digitalSeconds.innerText = `${this.second < 10 ? "0" : ""}${this.second}`;
        digitalMs.innerText = `${this.milliseconds < 10 ? "0" : ""}${this.milliseconds}`;
        date.innerText = this.time.toDateString();
    }
    setTheHands(degrees) {
        return `rotate(${degrees}deg)`;
    }
    setTime() {
        const interval = setInterval(this.getTime, 10);
        setInterval(() => {
            playSounds(this.tickSound);
            if (this.tickSound === "tick") {
                this.tickSound = "tock";
            }
            else {
                this.tickSound = "tick";
            }
        }, 1000);
    }
}
__decorate([
    autobind
], Clock.prototype, "getTime", null);
__decorate([
    autobind
], Clock.prototype, "setTheHands", null);
chooseColor.addEventListener("click", () => {
    dim.style.display = "block";
    pickColor.style.display = "flex";
    dim.addEventListener("click", () => {
        dim.style.display = "none";
        pickColor.style.display = "none";
    });
});
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
        if (color.id === "dmb")
            document.documentElement.style.setProperty("--text-color", "#4f5c4f");
        if (color.id === "gold")
            document.documentElement.style.setProperty("--text-color", "#bd9d49");
        dim.style.display = "none";
        pickColor.style.display = "none";
    });
}
let lightMode = true;
themeBtn.addEventListener("click", () => {
    themeBtn.firstElementChild.classList.toggle("hidden");
    themeBtn.lastElementChild.classList.toggle("hidden");
    if (lightMode) {
        document.documentElement.setAttribute("data-theme", "dark");
        lightMode = !lightMode;
    }
    else {
        document.documentElement.setAttribute("data-theme", "light");
        lightMode = !lightMode;
    }
});
const newClock = new Clock(1, "analog");
let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let [milliseconds2, seconds2, minutes2, hours2] = [0, 0, 0, 0];
const timer = document.querySelector(".timer-display");
const startPauseTimer = (document.getElementById("startTimer"));
const lapTimer = document.getElementById("lapTimer");
const resetTimer = document.getElementById("resetTimer");
const lapContainer = document.getElementById("lap-container");
let int;
let int2;
let sn = 1;
startPauseTimer.addEventListener("click", () => {
    if (lapTimer.disabled)
        lapTimer.disabled = false;
    if (startPauseTimer.innerText === "Start") {
        startPauseTimer.innerText = "Pause";
        resetTimer.disabled = true;
        int = setInterval(displayTimer, 10);
        if (milliseconds2 === 0 &&
            seconds2 === 0 &&
            minutes2 === 0 &&
            hours2 === 0) {
            int2 = setInterval(startInterval, 10);
        }
    }
    else {
        startPauseTimer.innerText = "Start";
        resetTimer.disabled = false;
        clearInterval(int);
        clearInterval(int2);
    }
});
lapTimer.addEventListener("click", () => {
    if (milliseconds2 === 0 && seconds2 === 0 && minutes2 === 0 && hours2 === 0) {
        return;
    }
    else {
        recordLap();
        [milliseconds2, seconds2, minutes2, hours2] = [0, 0, 0, 0];
        if (startPauseTimer.innerText === "Start") {
            lapTimer.disabled = true;
        }
        sn++;
    }
});
resetTimer.addEventListener("click", () => {
    clearInterval(int);
    clearInterval(int2);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    [milliseconds2, seconds2, minutes2, hours2] = [0, 0, 0, 0];
    timer.innerHTML = "00:00:00:00";
    resetTimer.disabled = true;
    lapTimer.disabled = true;
});
const displayTimer = () => {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    let h = hours < 10 ? `0${hours}` : `${hours}`;
    let m = minutes < 10 ? `0${minutes}` : `${minutes}`;
    let s = seconds < 10 ? `0${seconds}` : `${seconds}`;
    let ms = milliseconds < 10
        ? `00${milliseconds}`
        : milliseconds < 100
            ? `0${milliseconds}`
            : `${milliseconds}`;
    timer.innerHTML = `${h}:${m}:${s}:${ms}`;
};
const startInterval = () => {
    milliseconds2 += 10;
    if (milliseconds2 === 1000) {
        milliseconds2 = 0;
        seconds2++;
        if (seconds2 === 60) {
            seconds2 = 0;
            minutes2++;
            if (minutes2 === 60) {
                minutes2 = 0;
                hours2++;
            }
        }
    }
};
const recordLap = () => {
    const timeInterval = document.createElement("div");
    timeInterval.className = "time-interval";
    timeInterval.id = "time-interval";
    const SN = document.createElement("span");
    SN.id = "SN";
    SN.innerText = `${sn}`;
    let timeInstance = document.createElement("span");
    timeInstance.id = "time-instance";
    let h = hours < 10 ? `0${hours}` : `${hours}`;
    let m = minutes < 10 ? `0${minutes}` : `${minutes}`;
    let s = seconds < 10 ? `0${seconds}` : `${seconds}`;
    let ms = milliseconds < 10
        ? `00${milliseconds}`
        : milliseconds < 100
            ? `0${milliseconds}`
            : `${milliseconds}`;
    timeInstance.innerText = `${h}:${m}:${s}:${ms}`;
    let interval = document.createElement("span");
    interval.id = "interval";
    let h2 = hours2 < 10 ? `0${hours2}` : `${hours2}`;
    let m2 = minutes2 < 10 ? `0${minutes2}` : `${minutes2}`;
    let s2 = seconds2 < 10 ? `0${seconds2}` : `${seconds2}`;
    let ms2 = milliseconds2 < 10
        ? `00${milliseconds2}`
        : milliseconds2 < 100
            ? `0${milliseconds2}`
            : `${milliseconds2}`;
    interval.innerText = `${h2}:${m2}:${s2}:${ms2}`;
    timeInterval.appendChild(SN);
    timeInterval.appendChild(timeInstance);
    timeInterval.appendChild(interval);
    lapContainer.insertBefore(timeInterval, lapContainer.firstElementChild);
};
const playSounds = (key) => {
    const audio = new Audio(`sounds/${key}.mp3`);
    const resp = audio.play();
    if (resp !== undefined) {
        resp
            .then((_) => { })
            .catch((_) => {
        });
    }
};
//# sourceMappingURL=app.js.map