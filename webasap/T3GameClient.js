define("webasap/T3GameClient", 
[
"dojo",
"webasap/ServiceResolver"
], function(dojo) {

    dojo.declare(
        "webasap.T3GameClient",
        [webasap.ServiceResolver],
        {
            constructor: function() {
                this.channel = {};
                this.sio = {};
                this.chat = {};
                this.setServiceNames(["webasap.T3GameClient"]);
                this.setServiceDeps([
                    {
                        serviceName:"webasap.ChatClient"
                        , instName:"chat"
                    },
                    {
                        serviceName:"socket.io"
                        , instName: "sio"
                    }
                    ]);
            },

            activate: function() {
                console.log("T3GameClient.activate()");
                this.channel = this.sio.connect("http://localhost:8000/games/t3");
                this.channel.on('connect', function() {
                    console.log("Connected to t3 game service.");
                });
                this.channel.on('update', dojo.hitch(this, "_update"));
                this.chat.join("global"); 
                this.chat.join("T3Chat"); 
            },

            _update: function(data) {
                console.debug(data);
            },

            move: function(data) {
                this.channel.emit('move', data);
            }
        });

return webasap.T3GameClient;
});
