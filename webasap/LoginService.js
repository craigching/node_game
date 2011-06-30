define("webasap/LoginService", 
[
"dojo",
"sys",
"crypto"
], function(dojo, sys, crypto) {

    dojo.declare(
        "webasap.LoginService",
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
                server.post('/login', dojo.hitch(this, "_login"));
            },

            _unbindHttpService: function(server) {
            },

            _login: function(req, res){
                console.log("Loggin in");
                console.log("req.body.username: "+req.body.username);
                console.log("req.body.password: "+req.body.password);
                var auth = dojo.hitch(this, "_authenticate", req.body.password);
                new webasap.Account().findOne({username: req.body.username},function(err, account){
                    responseMessage = "Invalid username or password.";
                    if(account){
                        console.log("Account Found: "+account.username);
                        if(auth(account.password)){
                            console.log("Auth was successful");
                            responseMessage = "Login Successful!";
                            req.session.username = account.username;
                        }
                        res.end(responseMessage);
                    } 
                });
           },

            _authenticate: function(enteredPassword, currentPassword){
                 var enteredSHA1 =  webasap.LoginService.getSHA1(enteredPassword); 
                 console.log("enteredSHA1: "+enteredSHA1);
                 console.log("currentPassword: "+currentPassword);
                 console.log("original pw: "+enteredPassword);
                return ( enteredSHA1 === currentPassword );
            }
        });

        webasap.LoginService.getSHA1 = function(value){
                var shasum = crypto.createHash('sha1');
                shasum.update(value);
               return  shasum.digest('hex');
        }

return webasap.LoginService;
});
