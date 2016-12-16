"use strict";


/*
    Cell Class:
*/
var Cell = function(token)  {
    this.token = token;     // token in the cell, could be '_', 'b', or 'r'
    this.div = null;        // corresponding div of this cell to append images

    this.getToken = function()  { return this.token; };
    this.setToken = function(token)  { this.token = token; };
    this.getDiv = function()  {  return this.div; };
    this.setDiv = function(div)  {  this.div = div; };
};


var model = {

    init: function() {
        this.uuid = PubNub.generateUUID();
        // token of player, player1's token will be 'b', player2's will be 'r'
        this.playerToken = 'b';
        // who's turn it is, initially 'b'
        this.turn = 'b';
        // how many moves so far
        this.moves = 0;
        this.initGrid();
        this.initPubnub();
    },

    initGrid: function()  {
        this.ROWS = 6;
        this.COLS = 7;
        // last row and col played
        this.lastRow = -1;
        this.lastCol = -1;

        /* grid of connect4 tokens, where 'b' is blue, 'r' is red,
            and '_' is an empty cell
        */
        var i, j;
        this.grid = [];
        for (i = 0; i < this.ROWS; i++)  {
            this.grid[i] = [];
            for (j = 0; j < this.COLS; j++)
                this.grid[i][j] = new Cell('_');
        }
    },

    initPubnub: function()  {
        // Instantiate PubNub
        this.pubnub = new PubNub({
            publishKey : 'pub-c-6ac9e424-e68c-4ea2-903b-5f49f6d69b41',
            subscribeKey : 'sub-c-83e8cc84-c25b-11e6-a856-0619f8945a4f',
            uuid: model.uuid
        });
    }


};

//model.init();
