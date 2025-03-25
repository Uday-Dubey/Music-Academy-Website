const express = require("express");
const path = require("path");
const app = express();
const bodyparser =require("body-parser");
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost/registerMusic');}
const port = 80;

//Mongoose Schema
const registerSchema = new mongoose.Schema({
    Name: String,
    Phone: String,
    Email: String,
    Instrument: String,
    Age: String,
    Queries: String,
  });
  const Register = mongoose.model('Register', registerSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('Home.pug', params);
})
app.get('/About-Us', (req, res)=>{
    const params = {}
    res.status(200).render('About-Us.pug', params);
})
app.get('/Services', (req, res)=>{
    const params = {}
    res.status(200).render('Services.pug', params);
})
app.get('/Register', (req, res)=>{
    const params = {}
    res.status(200).render('Register.pug', params);
})
app.post('/Register', (req, res)=>{
    var myData= new Register(req.body)
    myData.save().then(()=>{
        res.send("Form Submitted successfully")
    }).catch(()=>{
        res.status(400).send("Failed to submit form. Please try again")
    })
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});