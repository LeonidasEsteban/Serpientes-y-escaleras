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
var id= 0;
var lista = [];
var connection = function(socket){
    console.log('Hola');
    var movimientos = [];
    socket.on('avanzar',function(data){
        socket.broadcast.emit('avanzar',data);
    });
    id++;
    lista.push(id);
    for(i = 1; i <= lista.length; i++){
        socket.emit('newPlayer',{id: i, mover:i , total:lista});
    }
    var ultimo = lista.length - 1;
    socket.broadcast.emit('newPlayer',{id: lista[ultimo]});

};
io.sockets.on('connection', connection);
