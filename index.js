var fs = require('fs'); //for reading api key
var querystring = require('querystring');
var request = require('request'); //simple api query
const apiKey = readApiKey();

request("https://translate.yandex.net/api/v1.5/tr.json/getLangs?key="+apiKey, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    allLangs = JSON.parse(body)["dirs"];
    allLangs.forEach( function (val) {
      if(val.startsWith("en-")) printInLang(val); //we're only doing english to other langauges"
    });
  }
});

function printInLang(lang) {
  if(!lang) return;
  var data = querystring.stringify({ "lang": "en-be", "text": "Hello World"});
  console.log("printing "+lang);
  request.post({ url: 'https://translate.yandex.net/api/v1.5/tr.json/translate?key='+apiKey,
    body: data,
    headers: {"Content-Type": "application/x-www-form-urlencoded", "Content-Length": data.length}},
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
      }
    }
  );
}

function readApiKey() {
  var raw = fs.readFileSync('apiConfig', 'utf8'); //read from file
  raw = raw.replace(/\n$/, ''); //trim new line if its there
  if(!raw) {
    console.log('failed to read api key');
    process.exit(1); //fail
  }
  return raw;
}
