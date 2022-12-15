const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'test123'
  });
});

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
