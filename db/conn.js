const mongoose = require("mongoose");

const db = process.env.DB

mongoose.connect(db ,{useNewUrlParser:true})
.then(()=>{
    console.log("DB connected");
}).catch((err)=>{
    console.log(err);
});


