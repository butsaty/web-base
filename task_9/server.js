var express    = require('express'); 
var app        = express();   
var bodyParser = require('body-parser');
var cors       = require('cors');
var searcher   = require("./search-module.js");

var port = process.env.PORT || 8080;
var router = express.Router();

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// routes
router.use(function(req, res, next) {
    console.log("request: " + req.query.query);
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/search')
        .get(cors(), function(req, res) {
            // search the array items by the query as a substring
            let substr = req.query.query;
            let result = searcher.searchByQuery(substr);
            
            // return result                
            console.log("answear: " + result);
            res.json(result);
        });
app.use('/api', router);

// start the server
app.listen(port);
console.log('Express server started on port: ' + port);