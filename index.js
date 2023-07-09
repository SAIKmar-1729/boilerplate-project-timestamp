// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', (req, res) => {
  const { date } = req.params;

  if (!date) {
    // If date parameter is empty, return the current time
    const currentTime = new Date();
    return res.json({ unix: currentTime.getTime(), utc: currentTime.toUTCString() });
  }

  const parsedDate = new Date(date);

  if (isNaN(parsedDate)) {
    // If the parsed date is invalid, check if it's a Unix timestamp
    const timestamp = parseInt(date);
    if (!isNaN(timestamp)) {
      const unixDate = new Date(timestamp);
      if (!isNaN(unixDate)) {
        return res.json({ unix: unixDate.getTime(), utc: unixDate.toUTCString() });
      }
    }
    // If not a valid date or Unix timestamp, return an error
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
