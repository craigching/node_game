define("webasap/Character", 
[
"dojo",
"webasap/_Persistent"
], function(dojo) {

    dojo.declare(
        "webasap.Character",
        [webasap._Persistent],
        {
            username: null,

            name: null,

            melee: null,

            ranged: null,

            magic: null,

            schema: {
                username      : String
              , name          : String
              , melee         : String
              , ranged        : String
              , magic         : String
            },

            constructor: function(args) {
                dojo.mixin(this, args);
            }
        });

return webasap.Character;
});
