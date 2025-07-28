import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  outputDays: document.querySelector('[data-days]'),
  outputHours: document.querySelector('[data-hours]'),
  outputMinutes: document.querySelector('[data-minutes]'),
  outputSeconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate;
let countdown;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate > new Date()) {
      refs.startBtn.classList.add('active');
    } else {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        timeout: 2000,
        progressBar: false,
      });
      refs.startBtn.classList.remove('active');
    }
  },
};

//Date choosing
flatpickr(refs.inputDate, options);

//Init countdown
refs.startBtn.addEventListener('click', () => {
  if (refs.startBtn.classList.contains('active')) {
    refs.startBtn.classList.remove('active');
    updateTimer();
    countdown = setInterval(updateTimer, 1000);
  }
});

//FUNCTIONS:
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//Updating timer
function updateTimer() {
  const delta = userSelectedDate.getTime() - Date.now();

  if (delta <= 0) {
    clearInterval(countdown);
    countdown = null;
    refs.inputDate.disabled = false;
    return;
  }

  const remaining = convertMs(delta);
  refs.inputDate.disabled = true;

  //Changing online display countdown
  refs.outputDays.textContent = addLeadingZero(remaining.days);
  refs.outputHours.textContent = addLeadingZero(remaining.hours);
  refs.outputMinutes.textContent = addLeadingZero(remaining.minutes);
  refs.outputSeconds.textContent = addLeadingZero(remaining.seconds);
}

//Adding zeroes for proper displaying
function addLeadingZero(val) {
  return `${val}`.padStart(2, 0);
}

//test3
