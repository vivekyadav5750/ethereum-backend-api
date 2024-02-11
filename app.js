const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./src/controller/routes');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Routes
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});