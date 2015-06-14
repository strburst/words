var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var words = ['hello', 'abacus', 'miranda', 'revoke', 'intersect', 'empanada',
    'merge', 'abrasion'];

var header = fs.readFileSync('header.html');
var footer = fs.readFileSync('footer.html');

var server = http.createServer(function (request, response) {
  console.log(request.method + ' ' + request.url);

  var query = qs.parse(url.parse(request.url).query);
  console.log(qs.parse(url.parse(request.url).query));

  response.writeHead(200, {'Content-Type:': 'text/html'});

  var result = '<p>You\'re asked for the following things:</p>\n';
  for (key in query) {
    result += '<p>' + key + ': ' + query[key] + '</p>\n';
  }

  response.write(header + result + footer);
  response.end();
});

server.listen(8888);
