const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const cors = require('cors');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');


const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

//app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routerUsers);
app.use(routerCards);



app.listen(PORT, () => {
  console.log(`App работает в порте ${PORT}`);
})

