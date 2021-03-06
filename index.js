const socket = require("socket.io")(80);
const ioHook = require("iohook");
const codes = require("./keycodes.US.json");
const whitelist = require("./keycodes.whitelist.json");

const getCommandString = event => {
  const rawValue = codes[event.rawcode];
  let string = "";

  if (
    rawValue &&
    (event.ctrlKey ||
      event.altKey ||
      event.shiftKey ||
      whitelist[event.rawcode])
  ) {
    if (
      event.rawcode !== 165 &&
      event.rawcode !== 17 &&
      event.rawcode !== 162 &&
      event.rawcode !== 163 &&
      event.rawcode !== 16 &&
      event.rawcode !== 160 &&
      event.rawcode !== 161 &&
      event.rawcode !== 18 &&
      event.rawcode !== 164
    ) {
      if (event.ctrlKey) {
        string = string.concat(codes[17], " + ");
      }

      if (event.shiftKey) {
        string = string.concat(codes[16], " + ");
      }

      if (event.altKey) {
        string = string.concat(codes[18], " + ");
      }

      string = string.concat(rawValue);
    }
  }

  return string;
};

// Start OS Hook for key presses
ioHook.start();

if (process.argv.includes("--debug")) {
  ioHook.on("keydown", event => {
    console.dir(event);
  });
}

if (process.argv.includes("--display")) {
  ioHook.on("keydown", event => {
    const command = getCommandString(event);
    if (command) console.log(command);
  });
}

socket.on("connection", socket => {
  // When a socket exists
  console.log("Socket connected");

  // When a key is pressed
  ioHook.on("keydown", event => {
    const command = getCommandString(event);
    if (command) socket.emit("keydown", command);
  });
});

console.log("Listening keypresses...");
