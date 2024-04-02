import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    //await mongoose.connect(process.env.MONGO, {
   // });
    await mongoose.connect(process.env.MONGO);
  
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoute)

app.use((err, req, res, next) =>{
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong"

  return res.status(errorStatus).send(errorMessage);
})

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(8800, () => {
  connect();
  console.log("Backend server is running!");
});