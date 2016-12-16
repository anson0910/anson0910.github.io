var controller = {
    init: function()  {
        model.init();
        this.initPubnub();
        view.init();
    },

    initPubnub: function()  {

        this.$instructionsList = $('#instructions-list');

        model.pubnub.addListener({
            status: function(statusEvent) {
                if (statusEvent.category === "PNConnectedCategory") {
                    //controller.publishSampleMessage();
                }
            },
            message: function(m) {
                var playerToken = m.message.playerToken,
                    decoded = controller.decodePosition(m.message.position);
                var r = decoded[0], c = decoded[1];
                controller.subscribeCallback(playerToken, r, c);
            },
            presence: function(m) {
                controller.presenceCallback(m);
            }
        });

        this.initChannel();

        // Subscribe to the connect4 channel
        model.pubnub.subscribe({
            channels: [model.channel],
            withPresence: true
        });

    },

    // initialize PubNub channel
    initChannel: function()  {
        /* If this is player 2, get gameId from URL,
            or else generate random gameId.
        */
        var rand = (Math.random() * 9999).toFixed(0);
        var gameId = (this.getGameId()) ? this.getGameId() : rand;
        model.channel = 'connect4-' + gameId;
        console.log(gameId);
        var opponentUrl = window.location.href + '?id=' + gameId;
        view.initOpponentUrlSpan('<a href="' + opponentUrl
                                + '" target="_blank">' + opponentUrl + '</a>');
    },

    getGameId: function()  {
        // return gameID if specified in URL, or else null
        return this.getParameterByName('id');
    },

    getTurn: function()  {
        return model.turn;
    },

    getPlayerToken: function()  {
        return model.playerToken;
    },

    getRows: function()  {
        return model.ROWS;
    },

    getCols: function()  {
        return model.COLS;
    },

    getGridToken: function(row, col)  {
        return model.grid[row][col].getToken();
    },

    setGridToken: function(row, col, val)  {
        model.grid[row][col].setToken(val);
    },

    getGridDiv: function(row, col)  {
        return model.grid[row][col].getDiv();
    },

    setGridDiv: function(row, col, div)  {
        model.grid[row][col].setDiv(div);
    },

    // attempt to drop token in provided column
    dropToken: function(col)  {
        if (model.playerToken != model.turn)  return;
        var i;
        for (i = this.getRows() - 1; i >= 0; i--)  {
            if (this.getGridToken(i, col) == '_')  {
                this.publishPosition(model.playerToken,
                    this.encodePosition(i, col));
                return;
            }
        }
        alert('This column is already full!');
    },

    // Publish a simple message to the hello_world channel
    publishPosition: function(playerToken, position) {
        var publishConfig = {
            channel : model.channel,
            message : {playerToken: playerToken, position: position}
        };
        model.pubnub.publish(publishConfig, function(status, response) {
            if (status.statusCode != 200)
                console.log('Failed publishing.');
        });
    },

    encodePosition: function(row, col)  {
        return row * 10 + col;
    },

    decodePosition: function(num)  {
        return [Math.floor(num / 10), num % 10];
    },

    getParameterByName: function(name, url) {
        if (!url) {
          url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    // called when subscribed channel gets message
    subscribeCallback: function(playerToken, r, c)  {
        // update last played positions
        model.lastRow = r;
        model.lastCol = c;
        // place token
        controller.setGridToken(r, c, playerToken);
        view.putToken(r, c);
        // update turn
        model.turn = (model.turn === 'b') ? 'r' : 'b';
        view.updateWhosTurn();
    },

    // called when presence status changes
    presenceCallback: function(m)  {
        console.log('Current players: ' + m.occupancy);
        if(m.occupancy < 2) {
            view.updateStatus('Waiting for your opponent...');
        } else if(m.occupancy === 2) {
            controller.$instructionsList.remove();
            view.updateStatus('We can start playing!');
            if (m.uuid === model.uuid && m.action === 'join')  {
                model.playerToken = 'r';
                view.rerenderBtns();
            }
            view.updateWhosTurn();
        } else if (m.occupancy > 2) {
            //alert('This game already has two players!');
            // tictactoe.className = 'disabled';
            // disable buttons
        }
    }
};

controller.init();