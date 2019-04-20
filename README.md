# keypress-overlay

Display an overlay of your current keypresses

This is helpful for tutorial videos where you want to display which commands you are using.

![keypress-overlay](https://i.imgur.com/WQdnFNb.gif)

Keypresses will only show if pressing a command(ctrl or shift or alt) or are whitelisted on `keycodes.whitelist.json` files.

You can customize how they are shown on `index.html`'s css, and also modify command names on `keycodes.US.json`.

Any bugs and new ideas are welcome on [Issues](https://github.com/AssisrMatheus/keypress-overlay/issues). And you're welcome to send pull-requests.

## How to run the listener server

- Download and install [Node](https://nodejs.org/en/download/).

- Open any terminal(cmd, powershell, bash) window

- Run the `cd` command to go to the project folder containing the files from this repository

- Run `npm i` and wait

- Run `npm start`

- Additional commands:
  - `npm start start-display`: Display the text for every keypress on the command line window.
  - `npm start start-debug`: Display the actual keypress event for every keypress on the command line window.

## How to use in [OBS (Open Broadcaster Software)](https://obsproject.com/)

- Run the listener server.

- Add a browser source

- Check the "local file" box

- Browse and select the `index.html` file contained on this repository

- Click "OK"

> I also recommend checking "Refresh browser when scene becomes active" and "Shitdown source when not visible" at the bottom.

![obs-tutorial](https://i.imgur.com/RNdIbaK.gif)

## Dependencies

The project uses [iohook](https://wilix-team.github.io/iohook/) and [socket.io](https://socket.io/) and should work with any OS, Mac, Linux or Windows.

[iohook OS Support page](https://wilix-team.github.io/iohook/os-support.html)
