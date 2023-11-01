// ============== countdown JS ============
// Function to create a countdown timer
function createCountdownTimer(targetDate, targetElement) {
  // Update the countdown every 1 second
  const countdownInterval = setInterval(function () {
    const currentDate = new Date().getTime();
    const timeRemaining = targetDate - currentDate;

    if (timeRemaining <= 0) {
      // Countdown has ended
      clearInterval(countdownInterval);
      targetElement.querySelector(".theTimer").innerHTML = "Countdown Expired!";
    } else {
      // Calculate days, hours, minutes, and seconds
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      // Update the countdown display for the target element
      targetElement.querySelector(".theTimer").innerHTML =
        `<span data-name="days">${padZeroes(days)}</span> <span class="dots">:</span> <span data-name="hours">${padZeroes(hours)}</span> <span class="dots">:</span> <span data-name="minutes">${padZeroes(minutes)}</span> <span class="dots">:</span> <span data-name="seconds">${padZeroes(seconds)}</span>`;
    }
  }, 1000);
}

// Function to pad zeroes to a number if it's less than 10
function padZeroes(num) {
  return num < 10 ? "0" + num : num;
}

// Set target dates and elements for each countdown section
const countdownSections = document.querySelectorAll(".countdown_timer");

countdownSections.forEach((section) => {
  const targetDate = new Date(section.getAttribute("data-target-date")).getTime();
  const targetElement = section.querySelector(".countdown_block");
  createCountdownTimer(targetDate, targetElement);
});