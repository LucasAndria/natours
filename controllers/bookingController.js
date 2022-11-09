// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);

  // 2) Create checkout session
  // Mada have not access to Stripe so I simulate it
  const session = {
    customer_email: req.user.email,
    tour_id: req.params.tourId,
    items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images: tour.imageCover,
        amount: tour.price,
        currency: 'MGA',
        quantity: 1
      }
    ]
  };

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session
  });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  const { tour, user, price } = req.body;

  res.status(200).json({ status: 'success', message: 'yes' });
  if (!tour && !user && !price) {
    return res
      .status(401)
      .json({ status: 'fail', message: 'Provide the required field!' });
  }

  const booking = await Booking.create({ tour, user, price });

  res.status(200).json({
    status: 'success',
    data: {
      booking
    }
  });
  // res.redirect(req.originalUrl.split('?')[0]);
});
