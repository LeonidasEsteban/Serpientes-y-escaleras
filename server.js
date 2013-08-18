var express = require('express');

var app = express();

app.get('/',function (req, res){
    res.send('Te quiero Pau!!');
});
app.get("/mensaje/:mensaje", function (req, res){
    res.send(req.params.mensaje);
});
app.listen(3000);