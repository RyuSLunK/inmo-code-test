var express = require('express'),
  fs = require('fs'),
  path = require('path'),
  https = require('https'),
  http = require('http'),
  bodyParser = require('body-parser');
var app = express();
//var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res){
  res.render('index.html')
});
app.get('/books', function(request, response){
  var bookFile = fs.readFileSync(__dirname + '/data/books.json');
  response.send(JSON.parse(bookFile))
});
/*io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});*/

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
