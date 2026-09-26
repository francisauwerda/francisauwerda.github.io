const body = document.body;

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  body.classList.add("dark-mode");
}

document.addEventListener("DOMContentLoaded", function () {
  setupYearProgress();
  setupHamsterMotion();
});

function setupYearProgress() {
  const now = new Date();
  const year = now.getFullYear();
  const dayOfYear = getDayOfYear(now);
  const totalDays = isLeapYear(year) ? 366 : 365;
  const daysLeft = totalDays - dayOfYear;
  const percent = (dayOfYear / totalDays) * 100;

  const dateLabel = now.toLocaleDateString("en-NZ", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const meta = document.getElementById("percentage");
  meta.textContent =
    dateLabel +
    " · " +
    percent.toFixed(0) +
    "% · " +
    daysLeft +
    " day" +
    (daysLeft === 1 ? "" : "s") +
    " left";

  const bar = document.getElementById("progress-bar");
  const track = document.getElementById("progress-bar-container");
  bar.style.width = percent + "%";
  track.setAttribute("aria-valuenow", String(Math.round(percent)));

  const ticks = document.getElementById("month-ticks");
  const labels = document.getElementById("month-labels");
  const monthNames = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

  for (let month = 0; month < 12; month++) {
    const start = new Date(year, month, 1);
    const startDay = getDayOfYear(start);
    const startPct = ((startDay - 1) / totalDays) * 100;
    const next =
      month === 11
        ? totalDays + 1
        : getDayOfYear(new Date(year, month + 1, 1));
    const midPct = ((startDay - 1 + (next - startDay) / 2) / totalDays) * 100;

    if (month > 0) {
      const tick = document.createElement("span");
      tick.className = "month-tick";
      tick.style.left = startPct + "%";
      ticks.appendChild(tick);
    }

    const label = document.createElement("span");
    label.className = "month-label";
    label.textContent = monthNames[month];
    label.style.left = midPct + "%";
    if (month === now.getMonth()) {
      label.classList.add("is-current");
    }
    labels.appendChild(label);
  }
}

function setupHamsterMotion() {
  const video = document.getElementById("hamster");
  const toggle = document.getElementById("hamster-toggle");
  if (!video || !toggle) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function setPlaying(playing) {
    if (playing) {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(function () {
          setPlaying(false);
        });
      }
      toggle.textContent = "Pause";
      toggle.setAttribute("aria-pressed", "false");
    } else {
      video.pause();
      toggle.textContent = "Play";
      toggle.setAttribute("aria-pressed", "true");
    }
  }

  if (reduceMotion.matches) {
    setPlaying(false);
  } else {
    setPlaying(true);
  }

  toggle.addEventListener("click", function () {
    setPlaying(video.paused);
  });

  video.addEventListener("click", function () {
    setPlaying(video.paused);
  });

  reduceMotion.addEventListener("change", function (event) {
    setPlaying(!event.matches);
  });
}

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
