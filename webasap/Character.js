define("webasap/Character", 
[
"dojo"
], function(dojo) {

	dojo.declare(
		"webasap.Character",
		null,
		{
			name: null,
			
			melee: null,
			
			ranged: null,
			
			magic: null,
			
			constructor: function(args) {
				this.name = args.name;
				this.melee = args.melee;
				this.ranged = args.ranged;
				this.magic = args.magic;
			}
		});

return webasap.Character;
});
