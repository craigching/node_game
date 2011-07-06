define("webasap/App", 
[
"sys",
"http",
"dojo",
"express",
"mongoose",
"webasap/ServiceRegistry",
"webasap/AccountService",
"webasap/Account",
"webasap/ChatService",
"webasap/LoginService",
"webasap/T3GameService"
], function(sys, http, dojo, express, mongoose, redis) {
    
    dojo.declare(
        "webasap.App",
        null,
        {
            start: function() {
                
                // Create the Service Registry before anything else,
                // and create it in the global scope
                registry = new webasap.ServiceRegistry();

                mongoose.connect('mongodb://localhost/dungeon_db');
                var server = express.createServer();
                var RedisStore = require('connect-redis')(express);

                server.use(express.static('./public'));
                server.use(express.logger());
                server.use(express.bodyParser());
                server.use(express.cookieParser());
                server.use(express.session({
                    store: new RedisStore,
                    secret: 'blahblahblah'
                }));
                server.post('/test', function(req, res){
                    res.send('test');
                });

                const sio = require('socket.io').listen(server);
                const redis = require('redis');

                registry.register("http", server);
                registry.register("redis", redis);
                registry.register("socket.io", sio);

                new webasap.ChatService();
                registry.register("webasap.AccountService", new webasap.AccountService());
                registry.register("webasap.LoginService", new webasap.LoginService());
                new webasap.T3GameService();

                server.get('/', function(req, res){
                    res.send('Hello, World, from Express.');
                });

                server.listen(8000);
            }
        });

return webasap.App;
});
