define("webasap/T3GameService", 
[
"dojo",
"sys"
], function(dojo, sys) {

    dojo.declare(
        "webasap._T3Board",
        null,
        {
            board: [],

            constructor: function() {
                this.board = [];
            },

            place: function(index, ch) {
                this.board[index] = ch;
            },

            get: function(index) {
                return this.board[index];
            },

            clear: function() {
                this.board = [];
            },

            win: function() {

                // Check rows
                var i;
                // 0, 1, 2
                // 3, 4, 5
                // 6, 7, 8
                for (i = 0; i < 3; i += 3) {
                    if (this.board[i] &&
                        this.board[i] === this.board[i + 1] &&
                        this.board[i + 1] === this.board[i + 2]) {
                        return true;
                    }
                }
                // 0, 3, 6
                // 1, 4, 7
                // 2, 5, 8
                for (i = 0; i < 3; ++i) {
                    if (this.board[i] &&
                        this.board[i] === this.board[i + 3] &&
                        this.board[i + 3] === this.board[i + 6]) {
                        return true
                    }
                }
                if (this.board[0] &&
                    this.board[0] === this.board[4] &&
                    this.board[4] === this.board[8]) {
                    return true;
                }
                if (this.board[2] &&
                    this.board[2] === this.board[4]
                    && this.board[4] === this.board[6]) {
                    return true;
                }
                return false;
            },

            done: function() {
                var i;
                for (i = 0; i < 9; ++i) {
                    if (this.board[i] === undefined) {
                        return false;
                    }
                }
                return true;
            }

        });

    dojo.declare(
        "webasap.T3GameService",
        null,
        {

            constructor: function() {
                this.board = new webasap._T3Board();
                this.channel = {};
                this.redis = {};
                this.client = {};
                registry.startTrackService(
                    "http"
                    , dojo.hitch(this, "_bindHttpService")
                    , dojo.hitch(this, "_unbindHttpService")
                );

                registry.startTrackService(
                    "redis"
                    , dojo.hitch(this, "_bindRedis")
                    , dojo.hitch(this, "_unbindRedis")
                );

                registry.startTrackService(
                    "socket.io"
                    , dojo.hitch(this, "_bindIo")
                    , dojo.hitch(this, "_unbindIo")
                );
            },

            _bindHttpService: function(server) {
                server.post('/games/t3', dojo.hitch(this, "_createGame"));
                // TODO We need an inst id for a game
                server.get('/games/t3', dojo.hitch(this, "_getGame"));
                server.put('/games/t3', dojo.hitch(this, "_modifyGame"));
            },

            _unbindHttpService: function(server) {
            },

            _bindRedis: function(redis) {
                this.redis = redis;
                this.client = redis.createClient();
//                this.client.subscribe("tictactoe");
            },

            _unbindRedis: function(redis) {
            },

            _bindIo: function(io) {
                this.channel = io.of('/games/t3');
                this.channel.on('connection', dojo.hitch(this, function (socket) {
                    console.log("this.channel.on'connection'");
                    socket.emit('a message', {
                        that: 'only'
                        , '/games/t3': 'will get'
                    });
                    this.channel.emit('a message', {
                        everyone: 'in'
                        , '/games/t3': 'will get'
                    });
                }));
            },
            
            _unbindIo: function(io) {
            },

            _createGame: function(req, res) {
                this.board.clear();
                res.end("New game created.\n");
            },

            _modifyGame: function(req, res) {
                var index = req.body.index;
                var ch = req.body.ch;
                this.board.place(index, ch);
                if (this.board.win()) {
                    res.end("Game over, " + ch + " wins.\n");
                } else if (this.board.done()) {
                    res.end("Game over, draw.\n");
                } else {
                    res.end(ch + " placed at: " + index + "\n");
                }
            },

            _getGame: function(req, res) {
                var state = "";
                var i, x, y, z;
                for (i = 0; i < 9; i += 3) {
                    x = this.board.get(i);
                    y = this.board.get(i + 1);
                    z = this.board.get(i + 2);
                    state +=
                        (x ? x : " ") + "|" +
                        (y ? y : " ") + "|" +
                        (z ? z : " ") + "\n";
                    if (i < 6) {
                        state += "-----\n";
                    }
                }
                state += "\n";
                this.client.publish("tictactoe", state);
                res.end(state);
            }
        });

return webasap.T3GameService;
});
