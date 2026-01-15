if(process.env.NODE_ENV !="production"){
    require('dotenv').config()
}

const express =require("express");
const app=express();
const cors = require("cors")
const mongoose=require("mongoose");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/AuthRoute");
const scanRoutes = require("./routes/ScanRoute");

const mongoUrl = process.env.ATLAS_DB_URL;
const Port = process.env.PORT || 5000;

// middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "https://phishguard-blond.vercel.app",
    credentials: true,
  })
);


// connect to database
main()
.then(()=>{
    console.log("Connection Successfully")
})
.catch((err)=>{
    console.log(err);
});
async function main() {
    await mongoose.connect(mongoUrl);
};


//routes
app.use("/scan", scanRoutes);
app.use("/", authRoute);

// start server
app.listen(Port,()=>{
    console.log("Server Started on Port" ,Port);
});