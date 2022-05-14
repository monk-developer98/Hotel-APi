const express = require("express");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const hotelRoute = require("./routes/hotels");
const userRoute = require("./routes/users");
const roomRoute = require("./routes/rooms");
const cookieParser = require("cookie-parser");
const app  = express();
dotenv.config();

require("./db/conn.js");

app.use(cookieParser())

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/users", userRoute);
app.use("/api/rooms", roomRoute);


app.use((err,req,res,next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something Went Wrong"
    return res.status(errorStatus).json({
        success:false,
        status: errorStatus,
        message: errorMessage,
        stack : err.stack
    })
})

app.listen(5000 , ()=>{
    console.log("Server running on port 5000");
})