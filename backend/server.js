const express=require('express')
const app=express();
const mongoose=require('mongoose')
const port=process.env.PORT ||5000
// const bodyParser=require('body-parser')


const cors=require('cors');
require('dotenv').config();

app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());

const uri=process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true});
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
})

const exerciseRouter=require('./routes/exercises');
const userRouter=require('./routes/users');

app.use('/users',userRouter);
app.use('/exercises',exerciseRouter);


app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});