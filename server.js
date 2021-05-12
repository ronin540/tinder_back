const express = require('express');
const mongoose = require('mongoose') ;
const Cards = require ('./dbCards.js');
const cors =  require("cors");


//app config
const app = express();
const port = process.env.PORT || 8080;
const conn_url = `mongodb+srv://tinder-admin:mJIS9yWQLU7R4s6L@cluster0.edxmo.mongodb.net/tinderdb?retryWrites=true&w=majority`
const temp = "temp";
//middleware
app.use(express.json()) 
app.use(cors());

//db config
mongoose.connect(conn_url, {
    useNewUrlParser :true,
    useCreateIndex : true,
    useUnifiedTopology : true
})

//api endpoints
app.get('/', (req, res) => {
    res.status(200).send("hello world");
})

// add card
app.post('/tinder/card', (req, res) => {
    const dbCard = req.body;
    Cards.create(dbCard, (err, data) => {
        if(err) {
           return res.status(500).send(err);
        } 
        res.status(201).send(data);
    })
});

app.get('/tinder/cards', (req, res ) => {
    Cards.find((err, data) => {
        if(err) {
           return res.status(500).send(err);
        } 
        res.status(201).send(data);
    })
})

app.get('/', (req, res ) => {
    Cards.find((err, data) => {
        if(err) {
           return res.status(500).send(err);
        } 
        res.status(201).send("hello world");
    })
})
//listener

app.listen(port, () => console.log(`Listening to ${port}`))