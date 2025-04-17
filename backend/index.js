const express =  require("express");
const mongoose =  require("mongoose");
const cors  =  require("cors");
const dotenv = require("dotenv/config");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/mongodb.js");
const authRouter = require("./routes/authRoutes.js");
const userRouter =  require("./routes/userRoutes.js");

const app = express()
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000

// database connection 
connectDB();

const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL
  ];
  

app.use(cors({origin: allowedOrigins, credentials:true}))

// Api Endpoints

app.get("/" , (req , res) => res.send("api working"))
app.use("/api/auth" , authRouter)
app.use("/api/user" , userRouter)


app.listen(port, () => {console.log(`Server started on PORT ${port}`)});