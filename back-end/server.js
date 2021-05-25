
// Generator Model //////////////////////////////////////////////////////////////////

const generator = require('./generator/generator');
const cors = require('cors');

// Configure Express ///////////////////////////////////////////////////////////

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../front-end')));
app.use(cors());

// RESTful Routes for CRUD operations //////////////////////////////////////////

// Read all (cRud) -- collection route
app.get('/sonnet', (req, res) => {
  var sonnetObj = generator.generateSonnet();
  res.status(200).send(sonnetObj);
});

// Read one (cRud) -- member route
app.get('/sonnet/:id', (req, res) => {
  var sonnetObj = generator.generateSonnet(req.params.id);
  res.status(200).send(sonnetObj);
});

// Start & Initialize Web Server ///////////////////////////////////////////////

const port = 3000;
app.listen(port, () => {
  console.log('CRUDdy Todo server is running in the terminal');
  console.log(`To get started, visit: http://localhost:${port}`);
});
