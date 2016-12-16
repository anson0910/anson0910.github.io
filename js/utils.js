var utils = {
    encodePosition: function(row, col)  {
        return row * 10 + col;
    },

    decodePosition: function(num)  {
        return [Math.floor(num / 10), num % 10];
    },

    // find parameter of query by name
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

    // detects whether the last token played was a winning move.
    isWinningPlay: function(r, c)  {
        var token = controller.getGridToken(r, c);
        var streak = (token === 'b') ? 'bbbb' : 'rrrr';
        return this.contains(this.horizontal(r), streak) ||
                this.contains(this.vertical(c), streak) ||
                this.contains(this.slash(r, c), streak) ||
                this.contains(this.backslash(r, c), streak);
    },

    // returns row of tokens containing given row as a string
    horizontal: function(row)  {
        var i, str = '';
        for (i = 0; i < controller.getCols(); i++)
            str += controller.getGridToken(row, i);
        return str;
    },

    // returns column of tokens containing given col as a string
    vertical: function(col)  {
        var i, str = '';
        for (i = 0; i < controller.getRows(); i++)
            str += controller.getGridToken(i, col);
        return str;
    },

    // returns slash diagonal of tokens containing given row, col as a string
    slash: function(row, col)  {
        var i, j, str = '';
        for (i = 0; i < controller.getRows(); i++)  {
            j = row + col - i;
            if (0 <= j && j < controller.getCols())
                str += controller.getGridToken(i, j);
        }
        return str;
    },

    // returns backslash diagonal of tokens containing given row, col as a string
    backslash: function(row, col)  {
        var i, j, str = '';
        for (i = 0; i < controller.getRows(); i++)  {
            j = col - row + i;
            if (0 <= j && j < controller.getCols())
                str += controller.getGridToken(i, j);
        }
        return str;
    },

    contains: function(haystack, needle)  {
        return haystack.indexOf(needle) != -1;
    }


};
