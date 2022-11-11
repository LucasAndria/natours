const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Booking = require('../models/bookingModel');
const Review = require('../models/reviewModel');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get Tour data from collection
  const tours = await Tour.find();

  // 2) Build template
  // 3) Render that template using tour data from 1)

  res.status(200).render('overview', {
    title: 'All tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  if (!res.locals.user) {
    return res.status(200).render('tour', {
      title: `${tour.name} Tour`,
      tour
    });
  }

  const bookedAlready = (
    await Booking.find({
      tour: tour._id,
      user: res.locals.user._id
    })
  ).length
    ? true
    : false;

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
    bookedAlready
  });
});

exports.getLoginForm = (req, res) => {
  if (res.locals.user) {
    return res.redirect(`${req.originalUrl.split('/')[0]}/`);
  }
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};

exports.getSignupForm = (req, res) => {
  if (res.locals.user) {
    return res.redirect(`${req.originalUrl.split('/')[0]}/`);
  }
  res.status(200).render('signup', {
    title: 'Create an account'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('myTours', {
    title: 'My tours',
    tours
  });
});

exports.getBookingCheckout = catchAsync(async (req, res) => {
  const tour = await Tour.findById(req.params.tourId).populate({
    path: 'reviews',
    fields: 'name summary imageCover price'
  });

  const session = {
    customer_email: req.user.email,
    tour_id: req.params.tourId,
    item: {
      name: `${tour.name} Tour`,
      description: tour.summary,
      image: tour.imageCover,
      amount: tour.price,
      currency: 'EN',
      quantity: 1
    }
  };

  res.status(200).render('bookingCheckout/bookingCkeckout', {
    title: 'Check out',
    session
  });
});
