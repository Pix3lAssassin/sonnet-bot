
// Generator Model //////////////////////////////////////////////////////////////////

const generator = require('./generator/generator');

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

// RESTful Routes for CRUD operations //////////////////////////////////////////

// Read all (cRud) -- collection route
app.get('/sonnet', (req, res) => {
  res.status(400).send(generator.generateSonnet());
});

// Read one (cRud) -- member route
app.get('/sonnet/:id', (req, res) => {
  generator.generateSonnet(req.params.id);
});

// Start & Initialize Web Server ///////////////////////////////////////////////

const port = 3000;
app.listen(port, () => {
  console.log('CRUDdy Todo server is running in the terminal');
  console.log(`To get started, visit: http://localhost:${port}`);
});