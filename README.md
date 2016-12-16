# Connect 4 - Multiplayer 

Simple web application using PubNub Javascript API, inspired by [PubNub Publish/Subscribe Tutorial](http://pubnub.github.io/api-guide-with-tictactoe/pubsub.html).

## To play:
Go to [https://anson0910.github.io/](https://anson0910.github.io/), and follow instructions as described on page.

## To play locally:
1. Clone repository.
2. Open **index.html**.
3. Follow instructions as described on page.

## Code description:
* **model.js** defines **Cell** class, which has a token (string which could be '_', 'b', or 'r') and a div to store images. <br>
It also defines a **model** object, which stores the grid and the **PubNub** object.

* **view.js** renders the html buttons and table, and also updates text when required.

* **utils.js** contains utility functions, such as checking if the last token played is a winning move.

* **controller.js** is where the main logic is.


