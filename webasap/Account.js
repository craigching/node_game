define("webasap/Account", 
[
"dojo"
], function(dojo) {

	dojo.declare(
		"webasap.Account",
		null,
		{
			username: null,
			
			firstName: null,
			
			lastName: null,
			
			password: null,
			
			enabled: false,
			
			constructor: function(args) {
				dojo.mixin(this, args);
				console.log("Creating account for " + this.username);
			}
		});

return webasap.Account;
});
