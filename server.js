var express = require('express');

var app = express();

app.get('/',function (req, res){
	res.send('Te quiero Pau');
});

app.listen(3000);