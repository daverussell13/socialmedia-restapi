require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;

/* Routes */
const userRoute = require('./routes/users');
const auth = require('./routes/auth');

/* MongoDb connection */
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to mongoDB");
  }
);

/* Middleware */
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use('/api/users', userRoute);
app.use('/api/auth', auth);

app.listen(PORT, () => {
  console.log(`Server is listening to port : ${PORT}`);
});