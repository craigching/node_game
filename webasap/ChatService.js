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
                registry.startTrackService(
                    "http"
                    , dojo.hitch(this, "_bindHttpService")
                    , dojo.hitch(this, "_unbindHttpService")
                );
                registry.startTrackService(
                    "socket.io"
                    , dojo.hitch(this, "_bindSio")
                    , dojo.hitch(this, "_unbindSio")
                );
            },

            _bindHttpService: function(server) {
                server.get('/chat/join', dojo.hitch(this, "join"));
                server.get('/chat/recv', dojo.hitch(this, "recv"));
                server.get('/chat/send', dojo.hitch(this, "send"));
                server.get('/chat/quit', dojo.hitch(this, "quit"));
            },

            _unbindHttpService: function(server) {
            },

            _bindSio: function(io) {
                this.channel = io.of('/chat');
                this.channel.on('connection', dojo.hitch(this, "_onJoin"));
            },

            _unbindSio: function(io) {
            },

            _onJoin: function(socket) {
                console.log(">> Chat << this.channel.on'connection'");
                this.channel.emit('joined', {
                    msg: 'soandso joined'
                });
            },

            join: function(req, res) {
                console.log("Chat.join()");
            },

            recv: function(req, res) {
                console.log("Chat.recv()");
            },

            send: function(req, res) {
                console.log("Chat.send()");
            },

            quit: function(req, res) {
                console.log("Chat.quit()");
            }
        });

return webasap.ChatService;
});
