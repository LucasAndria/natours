import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateSettings } from './updateSetting';
import { bookTour, payTour } from './payment';
import { signup } from './signup';
import { showAlert } from './alerts';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.signup-form');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const visaForm = document.querySelector('.form_visa');
const bookBtn = document.getElementById('book-tour');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (signupForm) {
  const emailDom = document.getElementById('email');
  const passwordConfirmDom = document.getElementById('passwordConfirm');

  emailDom.addEventListener('click', (e) => {
    e.target.classList.remove('input-error');
  });

  passwordConfirmDom.addEventListener('click', (e) => {
    e.target.classList.remove('input-error');
  });

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    const res = await signup(name, email, password, passwordConfirm);

    if (res.split(':')[0] === 'Duplicate field value') {
      showAlert('error', 'email already taken !');
      emailDom.classList.add('input-error');
    }

    if (res === 'Password are not the same') {
      showAlert('error', 'Password are not the same !');
      passwordConfirmDom.classList.add('input-error');
    }
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;

    window.setTimeout(() => {
      bookTour(tourId);
    }, 1500);
  });
}

if (visaForm) {
  const btnPay = document.getElementById('btnPay');
  const cardNumber = document.getElementById('cardnumber');
  const name = document.getElementById('name');
  const ccv = document.getElementById('ccv');

  cardNumber.addEventListener('click', (e) => {
    e.target.classList.remove('error');
  });

  name.addEventListener('click', (e) => {
    e.target.classList.remove('error');
  });

  ccv.addEventListener('click', (e) => {
    e.target.classList.remove('error');
  });

  visaForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    cardNumber.classList.remove('error');
    name.classList.remove('error');
    ccv.classList.remove('error');

    const cardNumberValue = cardNumber.value;
    const nameValue = name.value;
    const ccvValue = ccv.value;

    if (!cardNumberValue) return cardNumber.classList.add('error');
    if (!nameValue) return name.classList.add('error');
    if (!ccvValue) return ccv.classList.add('error');

    // 1) Recup les elements du form
    const tour = btnPay.dataset.tour;
    const user = btnPay.dataset.user;
    const price = btnPay.dataset.price;

    // 2) Procceder au payement
    await payTour(tour, user, price);
  });
}
