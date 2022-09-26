const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');



const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// на роуты пользователя и карточек
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));


app.listen(PORT, () => {
  console.log(`App работает в порте ${PORT}`);
})

