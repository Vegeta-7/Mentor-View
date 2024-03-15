const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');




const app = express()
const URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000; 

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend origin
    methods: ['GET', 'POST', 'DELETE', 'PUT'], // Allowed methods (adjust as needed)
}));

// to access the req.body(we set middleware here);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/',(req,res)=>{
    res.send("Thsi is server");
})


app.use('/api/mentor',require('./routes/MentorRoutes.js'));
app.use('/api/student',require('./routes/StudentRoutes.js'));


// connect this to mongodb    
mongoose
    .connect(URL)
    .then(() => {
        console.log("connected to database"); 
        // server listen at 3000 ok       
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        })
    }).catch((error) => {
        console.log(error); 
    });