define("webasap/ServiceRegistry", 
[
"dojo"
], function(dojo) {

	dojo.declare(
		"webasap.ServiceRegistry",
		null,
		{
			services: {},

			constructor: function(args) {
			},
			
			register: function(name, service) {
				var entry = this.services[name];
				if (!entry) {
					entry = this._newServiceEntry();
					this.services[name] = entry;
				}
				entry.refs.push(service);
			},
			
			unregister: function(/*Handle*/ handle) {
				var entry = this.services[name];
				if (entry) {
					
				}
				delete this.services[name];
			},
			
			startTrackService: function(name) {
				
			},
			
			stopTrackService: function(name) {
				
			},
			
			_newServiceEntry: function() {
				return {
					refs: [],
					callbacks: []
				};
			}
		});

return webasap.ServiceRegistry;
});
