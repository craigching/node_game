define("webasap/ChatClient", 
[
"dojo"
], function(dojo) {

    dojo.declare(
        "webasap.ChatClient",
        null,
        {
            constructor: function() {
                this.channel = {};
                registry.register("webasap.ChatClient", this);
                registry.startTrackService(
                    "socket.io"
                    , dojo.hitch(this, "_bindSio")
                    , dojo.hitch(this, "_unbindSio")
                );
            },

            _bindSio: function(io) {
                this.channel = io.connect("http://localhost:8000/chat");
                this.channel.on('connect', dojo.hitch(this, function() {
                    console.log("Connected to Chat service.");
                    this.channel.emit('woot');
                }));
                this.channel.on('joined', function(data) {
                    console.log("received 'chat message'");
                    console.debug(data);
                });
            },

            _unbindSio: function(io) {
            }

        });

return webasap.ChatClient;
});
