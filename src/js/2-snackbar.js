const refs = {
  state: document.querySelector('input[name="state"]:checked')?.value,
  notifyBtn: document.querySelector('.submit-btn'),
};

refs.notifyBtn.addEventListener('click', console.log(refs.state));
