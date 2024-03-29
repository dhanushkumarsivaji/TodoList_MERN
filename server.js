const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path')

const items = require('./routes/api/items')

const app = express()

//BodyParser Middleware
app.use(bodyParser.json())

//DB config
const db = require('./config/keys').mongoURI






//connect to mongo
mongoose
    .connect(db)
    .then(()=>console.log("MongoDB Connected..."))
    .catch(err=>console.log(err))

//use routes
app.use('/api/items',items)

//Server static assests if in production

if(process.env.NODE_ENV === 'production'){
    //set ststic folder
    app.use(express.static('client/build'));

    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const port = process.env.PORT || 8000

app.listen(port,()=>console.log(`Server started on Port ${port}`))