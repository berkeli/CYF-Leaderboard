import mongoose from 'mongoose';
import 'dotenv/config'

async function connect() {
  try {
    await mongoose.connect(process.env.DBURL ? process.env.DBURL : '');
    console.log('DB connected');
  } catch (error) {
    console.error('Could not connect to db', process.env.DBURL);
    process.exit(1);
  }
}

export default connect;
