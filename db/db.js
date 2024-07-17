import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("DB connection established successfully");
        }).catch((err) => {
            console.log(err);
            process.exit();
        });
    } catch (err) {
        console.log("Error: ", err.message);
        throw err;
        return;
    }
};

export default connectDB;
