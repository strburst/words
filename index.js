var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var filters = require('./filters.js');

var words = ['hello', 'abacus', 'miranda', 'revoke', 'intersect', 'empanada',
    'merge', 'abrasion', 'serendipitous', 'pelican', 'finally', 'ort', 'thing'];

var header = fs.readFileSync('header.html');
var footer = fs.readFileSync('footer.html');

var server = http.createServer(function (request, response) {
  var requestUrl = url.parse(request.url)
  var query = qs.parse(requestUrl.query);

  console.log('%s request for %s', request.method, request.url);

  response.writeHead(200, {'Content-Type:': 'text/html'});

  var result = '<h2>You asked for the following things:</h2>\n';
  for (key in query) {
    result += '<p>' + key + ': ' + query[key] + '</p>\n';
  }

  result += '<h2>The following words match your query:</h2>\n';
  var matchesAll = filters.composeFilter(query);
  var filteredWords = words.filter(matchesAll);;

  filteredWords.forEach(function(elem) {
    result += '<p><a href="http://dictionary.reference.com/browse/' + elem +
      '?s=t" target="_blank" title="Definition">' + elem + '</a></p>\n';
  });

  response.write(header + result + footer);
  response.end();
});

server.listen(8888);
