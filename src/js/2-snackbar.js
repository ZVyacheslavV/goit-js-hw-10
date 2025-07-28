import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
};

const makePromise = (delay, state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  });
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = +refs.form.elements.delay.value;
  const state = refs.form.elements.state.value;

  makePromise(delay, state)
    .then(delay =>
      iziToast.success({
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        timeout: 2000,
        progressBar: false,
      })
    )
    .catch(delay =>
      iziToast.error({
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        timeout: 2000,
        progressBar: false,
      })
    );
  refs.form.reset();
});
