define("webasap/ChatService", 
[
"dojo"
], function(dojo) {

    dojo.declare(
        "webasap.ChatService",
        null,
        {
            constructor: function() {
                this.channel = {};
                this.rooms = {};
                //rooms has name as key and an object as value containing
                //this users [] and game id?
                registry.startTrackService(
                    "socket.io"
                    , dojo.hitch(this, "_bindSio")
                    , dojo.hitch(this, "_unbindSio")
                );
            },

            _bindSio: function(io) {
                this.channel = io.of('/chat');
                this.channel.on('join', dojo.hitch(this, "_onJoin"));
            },

            _unbindSio: function(io) {
            },

            _onJoin: function(data) {
                if(!data){
                    console.log("data was null!!!!!!!");
                }
                console.log("CHAT: joined: "+data.username);
                this.channel.emit('joined', {
                    msg: data.username+ ' joined',
                    room: 'global'
                });
            },

        });

return webasap.ChatService;
});
