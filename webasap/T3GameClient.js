define("webasap/T3GameClient", 
[
"dojo"
], function(dojo) {

    dojo.declare(
        "webasap.T3GameClient",
        null,
        {
            constructor: function() {
                this.channel = {};
                registry.register("webasap.T3GameClient", this);
                registry.startTrackService(
                    "socket.io"
                    , dojo.hitch(this, "_bindSio")
                    , dojo.hitch(this, "_unbindSio")
                );
            },

            _bindSio: function(io) {
                this.channel = io.connect("http://localhost:8000/games/t3");
                this.channel.on('connect', function() {
                    console.log("Connected to t3 game service.");
                });
            },

            _unbindSio: function(io) {
            },

            move: function(data) {
                this.channel.emit('move', data);
            }


        });

return webasap.T3GameClient;
});
