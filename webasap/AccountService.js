define("webasap/AccountService", 
[
"dojo",
"sys"
], function(dojo, sys) {

    dojo.declare(
        "webasap.AccountService",
        null,
        {
            constructor: function() {
                registry.startTrackService(
                    "http"
                    , dojo.hitch(this, "_bindHttpService")
                    , dojo.hitch(this, "_unbindHttpService")
                );
            },

            _bindHttpService: function(server) {
                server.post('/accounts', dojo.hitch(this, "_createAccount"));
                server.get('/accounts', dojo.hitch(this, "_findAll"));
                server.post('/account/login', dojo.hitch(this, "_login"));
            },

            _unbindHttpService: function(server) {
            },

            _createAccount: function(req, res) {
                new webasap.Account(req.body).save();
                res.send('Create account');
            },

            _findAll: function(req, res) {
                res.contentType("application/json");
                console.log("Finding accounts:");
                new webasap.Account().findAll(function(err, accounts){
                    sys.puts("accounts to send: " + sys.inspect(accounts));
                    sys.puts("Sending accounts.");
                    res.send(JSON.stringify(accounts));
                    console.log("Done.");
                });
            },

            _login: function(req, res){
                console.log("Loggin in");
                console.log("req.body: "+req.body.username);
                //find user (make sure that user exists)
                //if so set check password and set in session
                var responseMessage = "Invalid username or password.";
                new webasap.Account().findOne(req.body,function(err, account){
                    if(account != null && account != undefined){
                        //valid username and password
                        console.log("Account and password are valid");
                        
                        req.session.username = account.username;
                        console.log("account.username= "+account.username);
                        responseMessage = "Account and password are valid!";
                        responseMessage += "\nCheck that it is in the session...\n";
                        responseMessage += "Username from session: "+req.session.username+"\n";
                    }
                    res.send(responseMessage);
                });
           }
        });

return webasap.AccountService;
});
