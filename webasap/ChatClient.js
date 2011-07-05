define("webasap/ChatClient", 
[
"dojo",
"webasap/ServiceResolver"
], function(dojo) {

    dojo.declare(
        "webasap.ChatClient",
        [webasap.ServiceResolver],
        {
            constructor: function() {
                this.channel = {};
                this.rooms = {}; 
                this.sio = {};
                this.setServiceNames(["webasap.ChatClient"]);
                this.setServiceDeps([
                    {
                        serviceName:"socket.io"
                        , instName: "sio"
                    }
                    ]);
            },

            activate: function() {
                console.log("ChatClient.activate()");
                this.channel = this.sio.connect("http://localhost:8000/chat");
                this.channel.on('joined', dojo.hitch(this, "_joined"));
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
