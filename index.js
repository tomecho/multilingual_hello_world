var fs = require('fs'); //for reading api key
var request = require('request'); //simple api query
var apiKey = fs.readFileSync('apiConfig', 'utf8');
if(!apiKey) {
  console.log('failed to read api key');
  process.exit(1); //fail
}

request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
}
});


function getLangs()
{
  var langs = [];
  request("https://translate.yandex.net/api/v1.5/tr.json/getLangs?key="+apiKey, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      langs = JSON.parse(body)["dirs"];
    }
  });
  return langs;
}
