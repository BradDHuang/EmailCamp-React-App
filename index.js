const express = require('express');
const app = express();

// route handler
app.get('/', (req, res) => {
  res.send({Hi: 'there, deployed again!'}); // JSON
});

const PORT = process.env.PORT || 5000;
// app.listen(5000); // telling node to listen.
app.listen(PORT);
// localhost:5000
