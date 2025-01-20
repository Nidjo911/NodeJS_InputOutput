const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet');

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

  switch (page) {

    case "/":
      fs.readFile('index.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
      });

/*       case "/end":
        fs.readFile('index.html', function (err, data) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write(data);
          res.end();
        }); */
    case "/css/normalize.css":
      fs.readFile('css/normalize.css', function (err, data) {
        res.write(data);
        res.end();
      });

    case "/css/styles.css":
      fs.readFile('css/styles.css', function (err, data) {
        res.write(data);
        res.end();
      });
    case "main.js":
      fs.readFile('main.js', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(data);
        res.end();
      });
    default:
      figlet('404!!', function (err, data) {
        if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
        }
        res.write(data);
        res.end();
      });

      console.log(page);

      break; // do not continue any further... break out of it!
  }
});
server.listen(8000);
