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
            }

        });

return webasap.AccountService;
});
