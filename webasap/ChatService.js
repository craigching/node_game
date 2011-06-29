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
                    , dojo.hitch(this, "_bindIo")
                    , dojo.hitch(this, "_unbindIo")
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

            _bindIo: function(io) {
                this.channel = io.of('/chat');
                this.channel.on('connection', dojo.hitch(this, function (socket) {
                    console.log(">> Chat << this.channel.on'connection'");
                    socket.emit('chat message', {
                        that: 'only'
                        , '/chat': 'will get'
                    });
                    this.channel.emit('chat message', {
                        everyone: 'in'
                        , '/chat': 'will get'
                    });
                }));
            },

            _unbindIo: function(io) {
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
