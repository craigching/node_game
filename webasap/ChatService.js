define("webasap/ChatService", 
[
"dojo",
"webasap/ServiceResolver"
], function(dojo) {

    dojo.declare(
        "webasap.ChatService",
        [webasap.ServiceResolver],
        {
            constructor: function() {
                this.channel = {};
                this.rooms = {};
                //rooms has name as key and an object as value containing
                //this users [] and game id?
                this.declareServices(
                    // deps
                    [
                    {
                        serviceName:"socket.io"
                        , instName: "sio"
                    }
                    ],
                    // service names
                    ["webasap.ChatService"]
                );
            },

            activate: function() {
                this.channel = this.sio.of('/chat');
                this.channel.on('join', dojo.hitch(this, "_onJoin"));
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
