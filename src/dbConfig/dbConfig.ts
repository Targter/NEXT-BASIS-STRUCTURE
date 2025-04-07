import mongoose from "mongoose" ; 

export async function connectDB() {
  try {
    console.log(process.env.MONGOOSE_CONNECTION_STRING)
    mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING!);

    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log('Mongoose connected to db');
    })
    connection.on('error', (err) => {
      console.error("MongoDb connection error. Please make sure MongoDB is running",err);
      process.exit();
    })

    // console.log('Connected to MongoDB');
  } catch (error) {
    console.error("MongoDb connection failed",error);
  }
}