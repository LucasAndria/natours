const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

// 4) START SERVER
const PORT = process.env.PORT || 8000;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`App running on port ${PORT}`);
});
