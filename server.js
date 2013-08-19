var express = require('express'),
    swig = require('swig'),
    cons = require('consolidate');

var app = express();

// swig.init({
//     cache:false
// });

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
app.listen(3000);