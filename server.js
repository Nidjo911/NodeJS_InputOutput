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
    case "/api-get-number":

      res.writeHead(305, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
      const rndNum = Math.floor(Math.random() * 100) + 1;

      res.end(JSON.stringify({ number: rndNum }));


    /* cases for file handling - styling, documents etc. */

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
  // page load requests
  if (page === '/') {
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  }

  /* this part here is giving me a number back to the game */
  else if (page === '/api-get-number') {
    res.writeHead(305, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    const rndNum = Math.floor(Math.random() * 100) + 1;

    res.end(JSON.stringify({ number: rndNum }));
  }

  /* end of the number generator part here */


  // when HTML makes a stylesheet request
  else if (page === '/css/styles.css') {
    fs.readFile('css/styles.css', function (err, data) {
      res.write(data);
      res.end();
    });
    // when HTML makes a script request
  } else if (page === '/js/main.js') {
    fs.readFile('js/main.js', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(data);
      res.end();
    });
  } else {
    figlet('404!!', function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
