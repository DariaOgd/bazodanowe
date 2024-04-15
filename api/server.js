import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();
dotenv.config();
mongoose.set("strictQuery", true);
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
app.use(cors({origin:"http://localhost:3000", credentials:true}))
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoute)

app.use((err, req, res, next) =>{
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong"

  return res.status(errorStatus).send(errorMessage);
})


app.listen(8800, () => {
  connect();
  console.log("Backend server is running!");
});