import "module-alias/register";
import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";

import dbConn from "@/config/dbConn";
import corsOptions from "@/config/corsOptions";
import cloudinaryConfig from "@/config/cloudinary";
// import mailConfig from "@/config/mailConfig";
import apiRoutes from "@/routes/apiRoutes";

config();
dbConn();
cloudinaryConfig();
// mailConfig();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());

app.use("^/$", (req, res) => {
    res.json({ message: "API Running" });
});

app.use("/api/v1", apiRoutes);

app.all("*", (req, res) => {
    res.json({ message: "Resource not found!" });
});

mongoose.connection.once("open", () => {
    console.log("MongoDB Connected!");
    app.listen(PORT, () => {
        console.log(`Listening on PORT: ${PORT}`);
    });
});
