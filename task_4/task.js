var func = require('./functions');
var http = require("http");

var case1 = "1 2 + 4 * 3 +";
var case2 = "1 2 % + 4 * 3 +";
var case3 = "1 2 + 4 * 3 + 2 +";

let res =  func.extraOperators(case1);
let res2 =  func.extraOperators(case2);
let res3 =  func.extraOperators(case3);

http.createServer(function (request, response) {
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   response.end(
        "case1 = " + res.toString() + ", " +
        "case2 = " + res2.toString()  + ", " +
        "case3 = " + res3.toString());
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');