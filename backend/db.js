import mongoose from 'mongoose';

const connnectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://janhavi:janhavi@cluster0.oit2lec.mongodb.net/food");
        console.log(`mongo server connected at ${conn.connection.host}`);
    } catch (error) {
        console.log(`mongoDB server not connected ${error}`);
    }
};

export default connnectDB;