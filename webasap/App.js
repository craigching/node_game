define("webasap/App", 
[
"sys",
"http",
"dojo",
"express",
"connect",
"mongoose",
"webasap/ServiceRegistry",
"webasap/AccountService",
"webasap/Account",
"webasap/MongooseSessionStore",
"webasap/ChatService"
], function(sys, http, dojo, express, connect, mongoose) {
    
    dojo.declare(
        "webasap.App",
        null,
        {
            start: function() {
                
                // Create the Service Registry before anything else,
                // and create it in the global scope
                registry = new webasap.ServiceRegistry();

                mongoose.connect('mongodb://localhost/dungeon_db');
                var sessionStore = new webasap.MongooseSessionStore();
                var server = express.createServer();

                server.use(express.logger());
                server.use(express.bodyParser());
                server.use(express.cookieParser());
                server.use(express.session({
                    store: sessionStore,
                    secret: 'blahblahblah'
                }));

                registry.register("http", server);

                registry.register("webasap.ChatService", new webasap.ChatService());
                registry.register("webasap.AccountService", new webasap.AccountService());

                server.get('/', function(req, res){
                    res.send('Hello, World, from Express.');
                });

                server.listen(8000);
            }
        });

return webasap.App;
});
