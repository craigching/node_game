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
                this.rooms = {}; 
                registry.register("webasap.ChatClient", this);
                registry.startTrackService(
                    "socket.io"
                    , dojo.hitch(this, "_bindSio")
                    , dojo.hitch(this, "_unbindSio")
                );
            },

            _bindSio: function(io) {
                console.log("In _bindSio");
                alert("in the _bindSio function");
                this.channel = io.connect("http://localhost:8000/chat");
                this.channel.on('joined', dojo.hitch(this, "_joined"));
            },

            _unbindSio: function(io) {
            },

            join: function(room){
               console.log("In join function");
               console.log("Room is: "+room);
               this.channel.emit('join', {room: room, username: "Eric"}); 
               this.rooms[room] = this.rooms[room] ? this.rooms[room] : {};
            },

            _joined: function(data){
                console.log("Joined Channel: "+data.room);
                console.debug(data);
            },

            leave: function(room){
                this.channel.emit('leave', {room: room});
            }
        });

return webasap.ChatClient;
});
