var express = require('express');
var app = express();

var mongoose    = require('mongoose');


mongoose.connect('mongodb://localhost/Users');
var db = mongoose.connection;
app.use(express.static('views'));

var UserSchema = new mongoose.Schema( {
    name: { type: String},
    password: { type: String}

} );

UserSchema.methods.speak = function () {
    var greeting = this.name
        ? "My name is " + this.name
        : "I don't have a name"
    console.log(greeting);
}

var User = db.model("User",UserSchema);



var nunjucks = require('nunjucks');
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
var bodyParser = require('body-parser')

app.get('/', function(req, res) {
    res.render('index.html');
});

app.use(bodyParser.urlencoded({ 
  extended: true
}));

 var newUser = new User ();
app.post('/ok', function(req, res) {
    var name = req.body.login,
        password = req.body.password;
    console.log(name + ' ' + password);
 var newUser = new User ({name:name,password:password});
      res.send({name:name});
newUser.save(function (err, newUser) {
   if (err) return console.log(err);
   newUser.speak();
    
});
   

  
    res.end();
});







User.find(function (err, users) {
        console.log(users)
    });
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});