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

const countdown = {
  countdownId: null,
  userSelectedDate: null,

  start() {
    if (this.countdownId) return;

    refs.startBtn.disabled = true;
    refs.inputDate.disabled = true;

    //Internal function, one countdown step
    const tick = () => {
      const delta = this.userSelectedDate - Date.now();

      if (delta <= 0) {
        clearInterval(this.countdownId);
        this.countdownId = null;
        refs.inputDate.disabled = false;
        return;
      }

      //Changing online display countdown
      const { days, hours, minutes, seconds } = convertMs(delta);
      refs.outputDays.textContent = addLeadingZero(days);
      refs.outputHours.textContent = addLeadingZero(hours);
      refs.outputMinutes.textContent = addLeadingZero(minutes);
      refs.outputSeconds.textContent = addLeadingZero(seconds);
    };

    tick();
    this.countdownId = setInterval(tick, 1000);
  },
};

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    countdown.userSelectedDate = selectedDates[0];

    if (countdown.userSelectedDate > new Date()) {
      refs.startBtn.disabled = false;
    } else {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        timeout: 2000,
        progressBar: false,
      });
      refs.startBtn.disabled = true;
    }
  },
};

//Date choosing
flatpickr(refs.inputDate, flatpickrOptions);

//Start countdown
refs.startBtn.addEventListener('click', () => {
  countdown.start();
});

//Functions:
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//Adding zeroes for proper displaying
function addLeadingZero(val) {
  return `${val}`.padStart(2, 0);
}
