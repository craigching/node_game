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
				var server = express.createServer(connect.bodyParser());

				server.use(express.logger());

				server.get('/', function(req, res){
					res.send('Hello, World, from Express.');
				});
				
				server.post('/accounts', function(req, res){
					sys.puts(sys.inspect(req.body));
					new webasap.Account(req.body);
					res.send('Create account');
				});

				server.listen(8000);
			}
		});

return webasap.App;
});
