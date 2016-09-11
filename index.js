var fs = require('fs'); //for reading api key
var request = require('request'); //simple api query
const apiKey = readApiKey();

request("https://translate.yandex.net/api/v1.5/tr.json/getLangs?key="+apiKey, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    allLangs = JSON.parse(body)["dirs"];
    allLangs.forEach( function (val) {
      printInLang(val);
    });
  }
});

function printInLang( lang) {
  request('http://www.google.com', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  });
}

function readApiKey() {
  var raw = fs.readFileSync('apiConfig', 'utf8'); //read from file
  raw.replace(/\n$/, ''); //trim new line if its there
  if(!raw) {
    console.log('failed to read api key');
    process.exit(1); //fail
  }
  return raw;
}
