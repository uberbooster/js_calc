var express = require('express'),
    logger  = require('morgan')('dev'),
    server  = express();


server.use(logger);
server.use(express.static(__dirname+'/public'));
server.set('port', (process.env.PORT || 8080))

server.get('/', home);


server.listen(server.get('port'), listenCallback);


function home(req, res){
  res.sendFile('public/html/index.html', {root: __dirname});
}

function listenCallback(){
  console.log('Now listening on port ' + server.get('port'));
}
