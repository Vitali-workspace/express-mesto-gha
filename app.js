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

app.use((req, res, next) => {
  req.user = { _id: '633290e5121aa47983421da5' };
  next();
});

app.use(routerUsers);
app.use(routerCards);

//! проверка на ошибки

app.listen(PORT, () => {
  console.log(`App работает в порте ${PORT}`);
})

