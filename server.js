require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);

async function start() {
  await client.connect();
  console.log("MongoDB connected!");

  app.get("/api/test", (req, res) => {
    res.json({ message: "Backend connected!" });
  });

  app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
}

start();