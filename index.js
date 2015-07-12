var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var filters = require('./filters.js');
var handlebars = require('handlebars');

var words = ['hello', 'abacus', 'miranda', 'revoke', 'intersect', 'empanada',
    'merge', 'abrasion', 'serendipitous', 'pelican', 'finally', 'ort', 'thing'];

var pageTemplate = fs.readFileSync('search.hbs').toString();
var makePage = handlebars.compile(pageTemplate);

// Format how words are displayed
handlebars.registerHelper('word', function(options) {
  var word = options.fn(this);
  return '<a href="http://dictionary.reference.com/browse/' + word +
    '" target="_blank" title="Definition">' + word + '</a>';
});

var server = http.createServer(function (request, response) {
  var requestUrl = url.parse(request.url);
  var query = qs.parse(requestUrl.query);

  console.log('%s request for %s', request.method, request.url);

  response.writeHead(200, {'Content-Type:': 'text/html'});

  var matchesAll = filters.composeFilter(query);
  var filteredWords = words.filter(matchesAll);

  var page = makePage({
    query: query,
    wordList: filteredWords
  });

  response.write(page);
  response.end();
});

server.listen(8888);
