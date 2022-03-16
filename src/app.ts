const dim = document.getElementById("dim")! as HTMLElement;
const hour = document.getElementById("hour")! as HTMLHeadingElement;
const hoursHand = document.getElementById("hour-hand") as HTMLDivElement;
const date = document.getElementById("date")! as HTMLParagraphElement;
const logo = document.getElementById("logo")! as HTMLHeadingElement;
const clock = document.getElementById("clock")! as HTMLDivElement;
const minute = document.getElementById("minute")! as HTMLParagraphElement;
const minuteHand = document.getElementById("minute-hand") as HTMLDivElement;
const secondsHand = document.getElementById("seconds-hand") as HTMLDivElement;
const themeBtn = document.getElementById("theme-btn")! as HTMLSpanElement;
const pickColor = document.getElementById("pick-color")! as HTMLDivElement;
const colors = document.getElementsByClassName(
  "colors"
)! as HTMLCollectionOf<HTMLElement>;
const clockFrame = document.getElementById("clock-frame")! as HTMLDivElement;
const chooseColor = document.getElementById(
  "choose-color"
)! as HTMLButtonElement;
const dateContainer = document.getElementById(
  "date-container"
)! as HTMLDivElement;
const minuteContainer = document.getElementById(
  "minute-container"
)! as HTMLDivElement;
const secondContainer = document.getElementById(
  "second-container"
)! as HTMLElement;
const secondIndicator = document.getElementById(
  "second-indicator"
)! as HTMLDivElement;
const millisecondContainer = document.getElementById(
  "milliseconds-container"
)! as HTMLElement;
const millisecondIndicator = document.getElementById(
  "milliseconds-indicator"
)! as HTMLDivElement;
const overallContainer = document.getElementById(
  "overall-container"
)! as HTMLDivElement;
const overallMinuteContainer = document.getElementById(
  "overall-minute-container"
)! as HTMLElement;
const digitalHours = document.getElementById(
  "digital-hour__data"
)! as HTMLDivElement;
const digitalMinutes = document.getElementById(
  "digital-minutes__data"
)! as HTMLDivElement;
const digitalSeconds = document.getElementById(
  "digital-seconds__data"
)! as HTMLDivElement;
const digitalMs = document.getElementById(
  "digital-mseconds__data"
)! as HTMLDivElement;
const numbers = document.getElementsByClassName(
  "numbers"
) as HTMLCollectionOf<HTMLDivElement>;

// position numbers for analog clock
Array.from(numbers).forEach((number) => {
  const child = number.firstElementChild as HTMLDivElement;
  const pi: number = Math.PI;
  const n: number = parseInt(child.className);

  child.style.transform = `translate(${
    Math.cos((pi * n) / 6 - pi / 2) * 100
  }px, ${Math.sin((pi * n) / 6 - pi / 2) * 100}px)`;
});

interface Degrees {
  transform?: string;
}

function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Clock {
  public time: Date = new Date();
  public milliseconds: number = this.time.getMilliseconds();
  public second: number = this.time.getSeconds();
  public minute: number = this.time.getMinutes();
  public hour: number = this.time.getHours();
  private millisecondsDeg: number = 0;
  private secondsDeg: number = 0;
  private minuteDeg: number = 0;
  private hoursDeg: number = 0;

  constructor(
    private readonly id: number,
    public type: "analog" | "digital",
    public format: 12 | 24 = 12
  ) {
    this.setTime();
  }

  get clockId() {
    return this.id;
  }

  @autobind
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

    // make the clock items rotate

    millisecondContainer.style.transform = this.setTheHands(
      this.millisecondsDeg
    );
    millisecondIndicator.style.transform = this.setTheHands(
      -this.millisecondsDeg
    );
    secondContainer.style.transform = this.setTheHands(this.secondsDeg);
    secondIndicator.style.transform = this.setTheHands(-this.secondsDeg);
    if (secondsHand)
      secondsHand.style.transform = this.setTheHands(this.secondsDeg);
    overallMinuteContainer.style.transform = this.setTheHands(this.minuteDeg);
    minuteContainer.style.transform = this.setTheHands(-this.minuteDeg);
    if (minuteHand)
      minuteHand.style.transform = this.setTheHands(this.minuteDeg);
    if (hoursHand) hoursHand.style.transform = this.setTheHands(this.hoursDeg);

    // show hour
    // when hour is 00
    if (this.hour === 0) this.hour = 12;
    hour.innerText = `${
      this.hour > 12 && this.format === 12 && this.type === "analog"
        ? this.hour - 12
        : this.hour
    }`;
    if (digitalHours)
      digitalHours.innerText = `${
        this.hour > 12 && this.format === 12 ? this.hour - 12 : this.hour
      }`;

    // show minute
    minute.innerText = `${this.minute < 10 ? "0" : ""}${this.minute}`;
    digitalMinutes.innerText = `${this.minute < 10 ? "0" : ""}${this.minute}`;

    // show seconds
    digitalSeconds.innerText = `${this.second < 10 ? "0" : ""}${this.second}`;

    // show ms
    digitalMs.innerText = `${this.milliseconds < 10 ? "0" : ""}${
      this.milliseconds
    }`;

    // set date
    date.innerText = this.time.toDateString();
  }

  @autobind
  setTheHands(degrees: number): string {
    return `rotate(${degrees}deg)`;
  }

  setTime() {
    const interval = setInterval(this.getTime, 10);
  }
}

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
    if (color.id === "dmb")
      document.documentElement.style.setProperty("--text-color", "#4f5c4f");
    if (color.id === "gold")
      document.documentElement.style.setProperty("--text-color", "#bd9d49");

    dim.style.display = "none";
    pickColor.style.display = "none";
  });
}

// light or dark mode
let lightMode = true;
themeBtn.addEventListener("click", () => {
  // toggle mode icons
  themeBtn.firstElementChild!.classList.toggle("hidden");
  themeBtn.lastElementChild!.classList.toggle("hidden");

  if (lightMode) {
    document.documentElement.setAttribute("data-theme", "dark");

    lightMode = !lightMode;
  } else {
    document.documentElement.setAttribute("data-theme", "light");

    lightMode = !lightMode;
  }
});

const newClock = new Clock(1, "analog");

// stop watch
let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let [milliseconds2, seconds2, minutes2, hours2] = [0, 0, 0, 0];
const timer = <HTMLDivElement>document.querySelector(".timer-display");
const startPauseTimer = <HTMLButtonElement>(
  document.getElementById("startTimer")!
);
const lapTimer = <HTMLButtonElement>document.getElementById("lapTimer")!;
const resetTimer = <HTMLButtonElement>document.getElementById("resetTimer")!;
const lapContainer = <HTMLDivElement>document.getElementById("lap-container");
let int: number;
let int2: number;
let sn: number = 1;

startPauseTimer.addEventListener("click", () => {
  if (lapTimer.disabled) lapTimer.disabled = false;
  if (startPauseTimer.innerText === "Start") {
    startPauseTimer.innerText = "Pause";

    // disable reset
    resetTimer.disabled = true;

    // start timer
    int = setInterval(displayTimer, 10);
    if (
      milliseconds2 === 0 &&
      seconds2 === 0 &&
      minutes2 === 0 &&
      hours2 === 0
    ) {
      int2 = setInterval(startInterval, 10);
    }
  } else {
    startPauseTimer.innerText = "Start";

    // make reset available
    resetTimer.disabled = false;

    // pause timer
    clearInterval(int);
    clearInterval(int2);
  }
});

lapTimer.addEventListener("click", () => {
  if (milliseconds2 === 0 && seconds2 === 0 && minutes2 === 0 && hours2 === 0) {
    return;
  } else {
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

  // disable reset
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
  let ms =
    milliseconds < 10
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
  let ms =
    milliseconds < 10
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
  let ms2 =
    milliseconds2 < 10
      ? `00${milliseconds2}`
      : milliseconds2 < 100
      ? `0${milliseconds2}`
      : `${milliseconds2}`;
  interval.innerText = `${h2}:${m2}:${s2}:${ms2}`;

  // add todiv
  timeInterval.appendChild(SN);
  timeInterval.appendChild(timeInstance);
  timeInterval.appendChild(interval);

  lapContainer.insertBefore(timeInterval, lapContainer.firstElementChild);
};
