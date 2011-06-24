define("webasap/ServiceRegistry", 
[
"dojo"
], function(dojo) {

	dojo.declare(
		"webasap.ServiceRegistry",
		null,
		{
			services: {},

			register: function(name, service) {
		        var handle = null;
		        var entry = this._getOrCreateServiceEntry(name);
		        handle = entry.refs.push(service);
		        this._bind(entry.handlers, service);
		        return {
		            service: name,
		            handle: handle
		        };
			},
			
			unregister: function(/*Handle*/ handle) {
				var service;
		        --handle.handle;
		        if (this.services[handle.name]) {
		            service = this.services[handle.name].refs[handle.handle];
		            this._unbind(this.services[handle.name].handlers, service);
		            delete this.services[handle.name].refs[handle.handle];
		        }
			},
			
			getService: function(name) {
		        if (this.services[name]) {
		            return this.services[name].refs;
		        }
			},
			
			startTrackService: function(name) {
		        var entry = this._getOrCreateServiceEntry(name);

		        // Add the handlers
		        var handle = entry.handlers.push({
		            bind : bind,
		            unbind : unbind
		        });

		        // Are there any current service refs?  If so,
		        // send a registered notification back now
		        if (entry.refs.length > 0) {
		            dojo.forEach(entry.refs, function(ref) {
		                bind(ref);
		            });
		        }

		        return handle;
			},
			
			stopTrackService: function(name) {
		        delete this.services[handle.name].handlers[handle.handle];
			},
			
		    _newServiceEntry : function() {
		        return {
		            // The service reference(s)
		            refs: [],
		            // The service tracker handlers, each
		            // element in the array is an object
		            // that contains a bind and unbind
		            // handler
		            handlers: []
		        };
		    },

		    _getOrCreateServiceEntry : function(name) {
		        var entry = null;
		        if (this.services[name] === undefined) {
		            entry = this._newServiceEntry();
		            this.services[name] = entry;
		        } else {
		            entry = this.services[name];
		        }
		        return entry;
		    },

		    _bind: function(handlers, service) {
		        if (handlers) {
		            dojo.forEach(handlers, function(handler) {
		                if (handler.bind) {
		                    handler.bind(service);
		                }
		            });
		        }
		    },

		    _unbind: function(handlers, service) {
		        if (handlers) {
		            dojo.forEach(handlers, function(handler) {
		                if (handler.unbind) {
		                    handler.unbind(service);
		                }
		            });
		        }
		    }
		});

return webasap.ServiceRegistry;
});
