const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

let connected = false;

module.exports = async (req, res) => {
    try {
        if (!connected) {
            await client.connect();
            connected = true;
        }

        res.status(200).json({
            message: "Backend connected!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Database connection failed"
        });
    }
};