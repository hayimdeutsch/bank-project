import mongoose from "mongoose";

export const connectDB = async () => {
    const uri = process.env.MONGO_CONNECT_STRING;
    const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
    await mongoose.connect(uri, clientOptions);
}