
import app from './app';
import mongoose from 'mongoose';
import config from './config/config';

const PORT = config.port || 3000;

mongoose.connect(config.mongoUri)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error('Failed to connect to MongoDB', err);
  });
