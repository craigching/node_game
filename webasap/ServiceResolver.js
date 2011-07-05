define("webasap/ServiceResolver", 
[
"dojo"
], function(dojo) {

    dojo.declare(
        "webasap.ServiceResolver",
        null,
        {
            constructor: function() {
                this.serviceDeps = {};
                this.serviceNames = [];
            },

            setServiceDeps: function(serviceDeps) {
                this.serviceDeps = serviceDeps;
                dojo.forEach(this.serviceDeps, function(dep) {
                    registry.startTrackService(
                        dep.serviceName
                        , dojo.hitch(this, function(dep) {  // bind
                            return function(service) {
                                this[dep.instName] = service;
                                dep.status = 'satisfied';
                                this._checkStatus();
                            }
                        }(dep))
                        , dojo.hitch(this, function(dep) {  // unbind
                            return function(service) {
                                this[dep.instName] = null;
                            }
                        }(dep))
                    );
                }, this);
            },

            setServiceNames: function(serviceNames) {
                console.log("==> setServiceNames");
                console.debug(serviceNames);
                this.serviceNames = serviceNames;
            },

            _checkStatus: function() {
                //  TODO Not really safe to assume satisfied is true here
                var satisfied = true;
                dojo.forEach(this.serviceDeps, function(dep) {
                    console.log("==> _checkStatus, dep name: " + dep.serviceName + ", status: " + dep.status);
                    if (!dep.status || dep.status !== 'satisfied') {
                        satisfied = false;
                    }
                }, this);
                if (satisfied) {
                    // Activate the component
                    this.activate();
                    // Now register it if there are 
                    // any services specified.
                    console.log("serviceNames: ");
                    console.debug(this.serviceNames);
                    dojo.forEach(this.serviceNames, dojo.hitch(this, function(name) {
                        console.log("registering: " + name);
                        registry.register(name, this);
                    }));
                }
            }

        });

return webasap.ServiceResolver;
});
