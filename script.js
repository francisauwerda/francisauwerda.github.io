const body = document.body;

// Check system preference for dark mode
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  body.classList.add("dark-mode");
}

document.addEventListener("DOMContentLoaded", function () {
    // Get the current date
    const currentDate = new Date();

    // Get the current day of the year (1-365)
    const dayOfYear = getDayOfYear(currentDate);

    // Calculate the percentage of the year
    const totalDaysInYear = isLeapYear(currentDate.getFullYear()) ? 366 : 365;
    const percentageOfYear = (dayOfYear / totalDaysInYear) * 100;

    // Display the result on the webpage
    const percentageElement = document.getElementById("percentage");
    percentageElement.innerHTML = `${currentDate.toDateString()}<br>${percentageOfYear.toFixed(2)}% of the year has passed`;

    // Set the width of the progress bar
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = `${percentageOfYear}%`;
});

function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return day + 1; // Adding 1 to start counting from 1 instead of 0
}

function isLeapYear(year) {
    // Leap year is divisible by 4, but not by 100 unless it is divisible by 400
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

