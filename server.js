import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";
//config env
dotenv.config();

//rest object
const app = express();

//database config
connectDB();

//middleware
app.use(cors());
app.use(express.json()); //enable json (now can send json data in req, res without need to parse)
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product', productRoute);


//rest api
app.get("/", (req, res)=>{
    res.send("<h1>Welcome to Ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, ()=>{
    console.log(`Server is running on ${process.env.DEV_MODE} port ${PORT}`.bgCyan.white);
});