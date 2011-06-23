define("webasap/MongooseSessionStore", 
[
"dojo",
"connect",
"mongoose"
], function(dojo, connect, mongoose) {

	dojo.declare(
		"webasap.MongooseSessionStore",
		[connect.session.Store],
		{
			schema: {
			      sid: { type: String, required: true, unique: true }
			    , data: { type: String, default: '{}' }
			    //, expires: { type: Date, index: true }
			},

			constructor: function(args) {
				var sch = new mongoose.Schema(this.schema);
				var modelName = 'Session';
				mongoose.model(modelName, sch);
				this.Model = mongoose.model(modelName);
			},

			get: function(sid, callback) {
				console.log("MongooseSessionStore.get() called.");
				this.Model.findOne({sid: sid}, callback);
			},
			
			set: function(sid, session, callback) {
				console.log("MongooseSessionStore.set() called.");
				var inst = new this.Model();
				inst.sid = sid;
				inst.data = JSON.stringify(session);
				inst.save(callback);
			},
			
			destroy: function(sid, callback) {
				console.log("MongooseSessionStore.destroy() called.");
				this.Model.remove({sid: sid}, callback);
			},
			
			length: function(callback) {
				console.log("MongooseSessionStore.length() called.");
				this.Model.count({}, callback);
			},
			
			clear: function(callback) {
				console.log("MongooseSessionStore.clear() called.");
				this.Model.drop(callback);
			}
		});

return webasap.MongooseSessionStore;
});
