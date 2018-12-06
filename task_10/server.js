const 
    func = require("./app/js/polish-notation"),
    http = require("http");

const 
    case1 = "1 2 + 4 * 3 +",
    case2 = "1 2 % + 4 * 3 +",
    case3 = "1 2 + 4 * 3 + 2 +",
    
    res = func.extraOperators(case1),
    res2 = func.extraOperators(case2),
    res3 = func.extraOperators(case3);

http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
   
    response.end(
        "case1 = " + res.toString() + ", " +
        "case2 = " + res2.toString()  + ", " +
        "case3 = " + res3.toString());
}).listen(8081);

console.log("Server running at http://127.0.0.1:8081/");