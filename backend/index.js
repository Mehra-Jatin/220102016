import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import urlRoutes from "./routes/urlShortner.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use('/shorturls', urlRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
