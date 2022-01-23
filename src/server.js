const express = require('express');
const { cats } = require('./server-data');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/cats', async (req, res) => {
  // throw new Error('error');
  return res.json(cats);
});

app.listen(4000, () => {
  console.log('listening');
});
