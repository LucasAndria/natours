import axios from 'axios';
const { showAlert } = require('./alerts');

exports.bookTour = (tourId) => {
  // Redirigena makany am ilay fausse payement
  location.assign(`/checkout-booking/${tourId}`);
};

exports.payTour = async (tour, user, price) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/v1/bookings',
      data: {
        tour,
        user,
        price
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Tour purchassed successfuly!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', 'Error occured, Please reload the page!');
  }
};
