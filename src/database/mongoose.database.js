const mongoose = require("mongoose");

const connectToDatabase = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSEORD}@fullstackclubcluster.vxrvk1c.mongodb.net/?retryWrites=true&w=majority&appName=FullStackClubCluster`
        );
        console.log("Connected to MongoDB777!!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToDatabase;
