var view = {
    init: function()  {
        this.$table = $('#connect4-table');
        this.$tableHeadRow = $('#table-header-row');
        this.$status = $('#status');
        this.$whosTurn = $('#whos-turn');

        this.initDropTokenBtns();
        this.initTabelCells();
    },

    initDropTokenBtns: function()  {
        var i, th, btn;
        for (i = 0; i < controller.getCols(); i++)  {
            th = document.createElement('th');
            th.className = 'text-center';
            btn = document.createElement('BUTTON');
            btn.setAttribute('type', 'button');
            btn.setAttribute('id', 'btn' + i);
            btn.className = (controller.getPlayerToken() == 'b') ?
                            'btn btn-xs btn-primary':
                            'btn btn-xs btn-danger';
            btn.innerHTML = 'Drop';
            th.append(btn);
            this.$tableHeadRow.append(th);

            $('#btn' + i).on('click', (function(col)  {
                return function()  {
                    controller.dropToken(col);
                };
            })(i));
        }
    },

    rerenderBtns: function()  {
        if (controller.getPlayerToken() == 'r')
            $('button').addClass('btn-danger');
    },

    disableBtns: function()  {
        $('button').addClass('disabled');
        $('button').off();
    },

    // initialize table with empty cells
    initTabelCells: function()  {
        var i, j, tr, td, div;
        for (i = 0; i < controller.getRows(); i++)  {
            tr = document.createElement('tr');
            for (j = 0; j < controller.getCols(); j++)  {
                td = document.createElement('td');
                div = document.createElement('div');
                div.className = 'content';
                controller.setGridDiv(i, j, div);
                td.append(div);
                tr.append(td);
            }
            this.$table.append(tr);
        }
    },

    updateStatus: function(text)  {
        this.$status.text(text);
    },

    updateWhosTurn: function()  {
        this.$whosTurn.text((controller.getTurn() === controller.getPlayerToken()) ?
                        'Your turn' : 'Your opponent\'s turn');
    },

    updateDraw: function()  {
        this.$whosTurn.text("It's a draw!");
    },

    updateWin: function(winnerToken)  {
        var winner = (winnerToken === 'b') ? 'Blue' : 'Red';
        this.$whosTurn.text(winner + ' won!');
    },

    initOpponentUrlSpan: function(html)  {
        var $opponentUrlSpan = $('#opponent-url-span');
        $opponentUrlSpan.html(html);
    },

    // put token by appending image at specified row, col
    putToken: function(row, col)  {
        controller.getGridDiv(row, col).append(this.getTokenImg());
    },

    // create image element with image depending on current player's token
    getTokenImg: function()  {
        var img = document.createElement('img');
        var imgSrc = (controller.getTurn() === 'b') ?
                    'img/blue_circle.png' :
                    'img/red_circle.png';

        img.setAttribute('src', imgSrc);
        img.className = 'img-fluid img-responsive';
        return img;
    }
};
