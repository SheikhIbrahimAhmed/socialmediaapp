const { default: mongoose } = require("mongoose");

const connectMongoDB = () => {
    mongoose.connect("mongodb://localhost:27017/SocialMedia")
        .then(() => {
            console.log("Connected to the database successfully!");
        })
        .catch((error) => {
            console.error("Error connecting to the database:", error);
        });
    mongoose.connection.on('connected', () => {
        console.log('Mongoose is connected to the database');
    });

}

module.exports = {
    connectMongoDB
}