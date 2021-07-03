// Configure Express ///////////////////////////////////////////////////////////
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../dist')));
app.use(cors());

app.get('/sonnet', (req, res) => {
  axios.get('http://localhost:8080/sonnet')
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => console.error(err));
});

app.get('/sonnet/:id', (req, res) => {
  axios.get(`http://localhost:8080/sonnet/${req.params.id}`)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => console.error(err));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Sonnet-bot client server is running in the terminal on localhost:${port}`);
});
