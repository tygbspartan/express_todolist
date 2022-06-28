var express = require('express');
var cors = require('cors');

var indexRouter = require('./routes/index');

var app = express();
const port = 8000

app.use(cors());
app.use(express.json())

//routes
app.use('/api', indexRouter);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
