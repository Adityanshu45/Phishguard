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


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
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



app.use("/scan", scanRoutes);

app.use("/", authRoute);

app.listen(8080,()=>{
    console.log("Server Start");

});