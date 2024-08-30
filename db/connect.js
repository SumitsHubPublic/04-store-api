const mongoose = require('mongoose')

const connectDB = (url, successCB) => {
  return mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
    error => {
      if (error) {
        console.log('Failed to connect to monogodb', error);
        return;
      }
      successCB();
      console.log('Connected to mongodb');
    }
  );
};

module.exports = connectDB
