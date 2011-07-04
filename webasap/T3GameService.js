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
                console.log("index: " + index + ", ch: " + ch);
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
                this.subscriber = {};
                this.publisher = {};

                registry.startTrackService(
                    "redis"
                    , dojo.hitch(this, "_bindRedis")
                    , dojo.hitch(this, "_unbindRedis")
                );

                registry.startTrackService(
                    "socket.io"
                    , dojo.hitch(this, "_bindSio")
                    , dojo.hitch(this, "_unbindSio")
                );
            },

            _bindRedis: function(redis) {
                this.redis = redis;
                this.subscriber = redis.createClient();
                this.publisher = redis.createClient();
                this.subscriber.subscribe("/games/t3");
                this.subscriber.on('message', function(channel, message) {
                    console.log("Received game update: " + message);
                });
            },

            _unbindRedis: function(redis) {
            },

            _bindSio: function(io) {
                this.channel = io.of('/games/t3');
                this.channel.on('connection', dojo.hitch(this, "_onPlayerConnect"));
                this.channel.on('move', dojo.hitch(this, "_onPlayerMoved"));
            },

            _unbindSio: function(io) {
            },

            _onPlayerConnect: function(socket) {
                console.log("this.channel.on'connection'");
                this.channel.emit('joined', {
                    msg: 'player joined'
                });
            },

            _onPlayerMoved: function(data) {
                data = JSON.parse(data);
                console.log("_onPlayerMoved: " + sys.inspect(data));
                this.modifyGame(data.index, data.ch);
                this.channel.emit('update', {board: this.board.board});
            },

            _createGame: function(req, res) {
                this.board.clear();
                res.end("New game created.\n");
            },

            _gameUpdates: function(channel, data) {
                //console.log("_gameUpdates, channel: " + sys.inspect(channel));
                console.log("_gameUpdates, data: " + sys.inspect(data));
            },

            _modifyGame: function(req, res) {
                var index = req.body.index;
                var ch = req.body.ch;
                this.modifyGame(index, ch);
                if (this.board.win()) {
                    res.end("Game over, " + ch + " wins.\n");
                } else if (this.board.done()) {
                    res.end("Game over, draw.\n");
                } else {
                    res.end(ch + " placed at: " + index + "\n");
                }
            },

            modifyGame: function(index, ch) {
                this.board.place(index, ch);
                return this.getGameState();
            },

            _getGame: function(req, res) {
                res.end(this.getGameState());
            },

            getGameState: function() {
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
                this.publisher.publish("/games/t3", state);
                return state;
            }
        });

return webasap.T3GameService;
});
