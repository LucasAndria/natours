const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    env: process.env.NODE_ENV,
    message: process.env.EMAIL_USERNAME
  });
});

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
