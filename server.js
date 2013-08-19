var express = require('express'),
    swig = require('swig'),
    cons = require('consolidate');
    


var app    = express();
var server = require('http').createServer(app);
var io     = require('socket.io').listen(server);

server.listen(3000);


//view engines
app.engine('.html', cons.swig);
app.set('view engine', 'html');
app.set('views', './views');

//static file
app.use(express.static('./public'));

app.get('/',function (req, res){
    res.render('home');
});
app.get("/mensaje/:mensaje", function (req, res){
    res.send(req.params.mensaje);
});

var connection = function(socket){
    console.log('Hola');
    socket.on('avanzar',function(data){
        socket.broadcast.emit('avanzar',data);
    });
};
io.sockets.on('connection', connection);
