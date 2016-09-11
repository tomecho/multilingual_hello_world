var request = require('request');
var apiKey = "trnsl.1.1.20160911T162422Z.130a65c5539d40ee.0aa7035cace58a17949d314bb12b16cd2c0ada9f"



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
