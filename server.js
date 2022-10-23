const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

//MongoDB local
const DB = process.env.DATABASE_LOCAL;

// // MongoDB en ligne
// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log(`DB connection successful!`));

// 4) START SERVER
const PORT = process.env.PORT || 8000;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`App running on port ${PORT}`);
});
