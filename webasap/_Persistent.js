define("webasap/_Persistent", 
[
"dojo",
"mongoose"
], function(dojo, mongoose) {

    dojo.declare(
        "webasap._Persistent",
        null,
        {
            constructor: function() {
                var parts = this.declaredClass.split(".");
                var modelName = parts[1];
                var sch = new mongoose.Schema(this.schema);
                mongoose.model(modelName, sch);
                this.Model = mongoose.model(modelName);
            },

            save: function() {
                if (this.schema) {
                    var inst = new this.Model();
                    var i;
                    for (i in this.schema) {
                        inst[i] = this[i];
                    }
                    inst.save(function(err){
                        console.log("error: " + err);
                    });
                }
            },
            
            findAll: function(callback) {
                this.Model.find({}, callback);
            }
        });

return webasap._Persistent;
});
