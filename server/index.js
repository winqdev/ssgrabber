// Packages
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const underscore = require('underscore');
const axios = require("axios");
// Config
let clientendpoint = "http://localhost:8080";

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/public/html" + "/index.html")
  app.use(express.static("public"))
});

app.post('/upload-screenshot', (req, res) => {
  const imageData = req.body.image_data;
  
  if (!imageData) {
    res.status(400).send('No image data provided');
    return;
  }

  const screenshot = Buffer.from(imageData, 'base64');

  // Random string generator
  function rdm() {
    let r = (Math.random() + 1).toString(36).substring(2);
      return r;
    }

  fs.writeFileSync(`screenshots/${rdm()}.png`, screenshot);

  res.send('OK');
  console.log('New screenshot received!');
});

app.get('/get-screenshot', (req, res) => {
  const dir = __dirname + "/screenshots";

  if (!fs.existsSync(dir)) {
    console.log("Screenshots folder not present, making one...")
    fs.mkdirSync(dir);
  }

  var files = fs.readdirSync(dir);
  var latestFile = underscore.max(files, function (f) {
    var fullpath = path.join(dir, f);
    return fs.statSync(fullpath).ctime;
  });
  let final = __dirname + "/screenshots/" + latestFile;

  // Headers
  res.writeHead(200, {'Content-Type': 'image/png' });
  fs.readFile(final, function (err, content) {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.end(content);
  });
});

app.get('/screenshot', (req, res) => {
  axios.post(clientendpoint)
  .then(function (response) {
    console.log("Asked client's endpoint for a screenshot!");
  })
  .catch(function (error) {
    console.log(error);
  });
})

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
