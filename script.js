const body = document.body;

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  body.classList.add("dark-mode");
}

document.addEventListener("DOMContentLoaded", function () {
  const currentDate = new Date();
  const dayOfYear = getDayOfYear(currentDate);
  const totalDaysInYear = isLeapYear(currentDate.getFullYear()) ? 366 : 365;
  const percentageOfYear = (dayOfYear / totalDaysInYear) * 100;

  const percentageElement = document.getElementById("percentage");
  percentageElement.innerHTML = `${currentDate.toDateString()}<br>${percentageOfYear.toFixed(2)}% of the year has passed`;

  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = `${percentageOfYear}%`;
});

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day + 1;
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
