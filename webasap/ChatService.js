define("webasap/ChatService", 
[
"dojo"
], function(dojo) {

	dojo.declare(
		"webasap.ChatService",
		null,
		{
			constructor: function() {
				registry.startTrackService(
					"http"
					, dojo.hitch(this, "_bindHttpService")
					, dojo.hitch(this, "_unbindHttpService")
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
