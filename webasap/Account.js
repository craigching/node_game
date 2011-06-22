define("webasap/Account", 
[
"dojo",
"webasap/_Persistent"
], function(dojo) {

	dojo.declare(
		"webasap.Account",
		[webasap._Persistent],
		{
			username: null,
			
			email: null,
			
			token: null,
			
			firstName: null,
			
			lastName: null,
			
			password: null,
			
			enabled: false,
			
			schema: {
			    username      : String
			  , email         : String
			  , token         : String
			  , firstName     : String
			  , lastName      : String
			  , password      : String
			  , enabled       : Boolean
			},
			
			constructor: function(args) {
				dojo.mixin(this, args);
			}
		});

return webasap.Account;
});
