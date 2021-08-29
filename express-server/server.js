const express = require('express');
const app = express();
const keys = require('./config/keys.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User =require('./models/user');
const {resolve} = require('path');
const PORT=process.env.PORT || 5000;

mongoose.connect(keys.MongoDB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
},() => {
    console.log('Connected to MongoDB.....')
});
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.get('/',(req,res) => {
    const path = resolve('public'+ '/index.html');
    res.sendFile(path);
})

app.get('/about',(req,res) => {
    res.send('This Is About page!');
})

app.get('/contact',(req,res) => {
    res.json({
        'title':'this is contact page!'
    })
 })

app.post('/users',(req,res)=>{
    User.find({})
    .then((users)=>{
        res.send(users)
    })
    .catch((e)=>{
         console.log(e)
        })
})
app.post('/newUser',(req,res)=>{
  console.log(req.body)
  res.send(req.body)
})
app.get('/users',(req,res) => {
   const newUser = {
       name: 'Deepak',
       age: 20,
       isGraduated: true
   }
   new User(newUser).save((err,user)=>{
       if(err){
           console.log(err)
       }
       if(user){
           res.json(user)
       }
    })
})


app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
}) ;

// Database Password: pdxLofHiy65DCbCM
