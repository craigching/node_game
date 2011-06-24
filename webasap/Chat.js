define("webasap/Chat", 
[
"dojo"
], function(dojo) {

	dojo.declare(
		"webasap.Chat",
		null,
		{
			constructor: function(args) {
				var server = args.server;
				server.get('/chat/join', dojo.hitch(this, "join"));
				server.get('/chat/recv', dojo.hitch(this, "recv"));
				server.get('/chat/send', dojo.hitch(this, "send"));
				server.get('/chat/quit', dojo.hitch(this, "quit"));
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

return webasap.Chat;
});
