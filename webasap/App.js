define("webasap/App", 
[
"sys",
"http",
"dojo",
"express",
"connect",
"mongoose",
"webasap/Account"
], function(sys, http, dojo, express, connect, mongoose) {

	dojo.declare(
		"webasap.App",
		null,
		{
			start: function() {

				mongoose.connect('mongodb://localhost/dungeon_db');
				var server = express.createServer(connect.bodyParser());

				server.use(express.logger());

				server.get('/', function(req, res){
					res.send('Hello, World, from Express.');
				});
				
				server.post('/accounts', function(req, res){
					new webasap.Account(req.body).save();
					res.send('Create account');
				});
				
				server.get('/accounts', function(req, res){
					res.contentType("application/json");
					console.log("Finding accounts:");
					new webasap.Account().findAll(function(err, accounts){
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
