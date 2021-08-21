const { GlobalKeyboardListener } = require("node-global-key-listener");

const startUrl = process.env.NWJS_START_URL || '../build/index.html';

const keyboardListener = new GlobalKeyboardListener();

nw.Window.open(startUrl, {}, function(win) {
    win.on('loaded', function (){
        keyboardListener.addListener(function (e, down) {
            win.window.postMessage(JSON.stringify({ e, down }), "*"); //the second parameter specifies the message origin. afaik, this is merely a string and has no effect beyond being there
        })
    });
});
