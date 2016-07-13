var express=require('express');
var wagner=require('wagner-core');

require('./models')(wagner);

var app=express();

app.use('/api/v1',require('./api')(wagner));

app.listen(1212);
console.log('Server:1212');