require('dotenv').config();
require('express-async-errors');

const cors = require("console");

const express = require('express');
const connectDB = require('./db/connect');

const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const productsRouter = require('./routes/products');

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>Store Api</h1><a href="/api/v1/products">products route</a>');
});

app.use('/api/v1/products', productsRouter);

app.use([notFoundMiddleware, errorHandler]);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    connectDB(process.env.MONGO_URI, () => {
      app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

start();
