const mongoose = require('mongoose');
// // for developpment only
// const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// // for developpment only
// dotenv.config({ path: './config.env' });

const app = require('./app');

// MongoDB local
// const DB = process.env.DATABASE_LOCAL;

// MongoDB en ligne
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log(`DB connection successful!`));

// 4) START SERVER
const PORT = process.env.PORT || 8000;

// If you want to define the domain
// const server = app.listen(PORT, '127.0.0.1', () => {
//   console.log(`App running on port ${PORT}`);
// });

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

//listen to the unhandledRejection event
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLER REJECTION! 💥 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
