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
      refs.startBtn.disabled = false;
    } else {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        timeout: 2000,
        progressBar: false,
      });
      refs.startBtn.classList.remove('active');
      refs.startBtn.disabled = true;
    }
  },
};

//Date choosing
flatpickr(refs.inputDate, options);

//Init countdown
refs.startBtn.addEventListener('click', () => {
  if (countdown) return;

  refs.startBtn.classList.remove('active');
  refs.startBtn.disabled = true;
  refs.inputDate.disabled = true;

  updateTimer();
  countdown = setInterval(updateTimer, 1000);
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

  const { days, hours, minutes, seconds } = convertMs(delta);

  //Changing online display countdown
  refs.outputDays.textContent = addLeadingZero(days);
  refs.outputHours.textContent = addLeadingZero(hours);
  refs.outputMinutes.textContent = addLeadingZero(minutes);
  refs.outputSeconds.textContent = addLeadingZero(seconds);
}

//Adding zeroes for proper displaying
function addLeadingZero(val) {
  return `${val}`.padStart(2, 0);
}
