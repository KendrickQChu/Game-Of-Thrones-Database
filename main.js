/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);
app.use('/character', require('./character.js'));
app.use('/region', require('./region.js'));
app.use('/alliance', require('./alliance.js'));
app.use('/family', require('./family.js'));
app.use('/ruler', require('./ruler.js'));
app.use('/character_family', require('./character_family.js'))
app.use('/', express.static('public'));

app.get('/character', function(req,res){
  var param = {};
  param.css = 'style.css';
  res.render('character', param);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
