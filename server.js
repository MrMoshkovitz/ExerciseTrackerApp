require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require("morgan");
const getDate = require("./utils/getCurrentDateTime");
morgan.token("body", function (req, res) {
	return JSON.stringify(req.body);
});

morgan.token("date", function (req, res) {
	return getDate();
});

//Morgan Middleware Function To Log Request Details
app.use(
	morgan(
		"Morgan Token =  :method :url :status :res[content-length] - :response-time ms :body :date"
	)
);
// const bodyParser = require('body-parser')

const cors = require('cors')

const mongoose = require("mongoose");
let uri =`mongodb+srv://fullstack:${process.env.PW}@cluster0.wiesv.mongodb.net/${process.env.DBName}?retryWrites=true&w=majority`
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true },() => console.log(`Connecting to DB => ${process.env.DBName}`))

app.use(cors())

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})




const exerciseSessionSchema = new mongoose.Schema({
	description: {
        type: String,
        minlength: 2,
        required: true
	},
	duration: {
        type: Number,
        required: true
    },
    date: String
});

let userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  log: [exerciseSessionSchema]
})

let Session = mongoose.model('Session' , exerciseSessionSchema)
let User = mongoose.model('User', userSchema)