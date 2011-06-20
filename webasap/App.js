define("webasap/App", 
[
"sys",
"http",
"dojo",
"webasap/Account"
], function(sys, http, dojo, express) {

	dojo.declare(
		"webasap.App",
		null,
		{
			start: function() {
				var express = require('express');
				var connect = require('connect');
				var mongoose = require('mongoose');

				var Schema = mongoose.Schema
				  , ObjectId = Schema.ObjectId;

				mongoose.connect('mongodb://localhost/dungeon_db');
				var server = express.createServer(connect.bodyParser());

				var Account = new Schema({
				    username      : String
				  , firstName     : String
				  , lastName      : String
				  , password      : String
				  , enabled       : Boolean
				});
				
				mongoose.model('Account', Account);
				
				server.use(express.logger());

				server.get('/', function(req, res){
					res.send('Hello, World, from Express.');
				});
				
				server.post('/accounts', function(req, res){
					sys.puts(sys.inspect(req.body));
					var Account = mongoose.model('Account');
					var account = new Account();
					dojo.mixin(account, req.body);
					account.save(function(err){
						console.log("error: " + err);
					});
					var acc = new webasap.Account(req.body);
					
					res.send('Create account');
				});
				
				server.get('/accounts', function(req, res){
					res.contentType("application/json");
					console.log("Finding accounts:");
					var Account = mongoose.model('Account');
					Account.find({}, function(err, accounts){
						/*
						var accountsToSend = [];
						console.log("Found: " + accounts[0].username);
						dojo.forEach(accounts, function(account){
							sys.puts("Found: " + sys.inspect(account));
							accountsToSend.push(account);
						});
						*/
						sys.puts("accounts to send: " + sys.inspect(accounts));
						sys.puts("Sending accounts.");
						res.send(JSON.stringify(accounts));
						console.log("Done.");
					});
				});

				server.listen(8000);
			}
		});

return webasap.App;
});
