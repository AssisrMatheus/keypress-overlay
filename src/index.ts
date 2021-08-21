import { GlobalKeyboardListener, IGlobalKeyEvent, IGlobalKeyDownMap } from "node-global-key-listener";
import whitelist from "../keycodes.whitelist.json";
import codes from "../keycodes.US.json";
import { createServer } from "http";
import { Server, Socket } from "socket.io";


const getCommandString = (e: IGlobalKeyEvent, down: IGlobalKeyDownMap) => {
  const rawValue = e.vKey;
  const code = codes[`${rawValue}`];

  let string = "";

  const ctrlKey =
      (down["LEFT CTRL"] || down["RIGHT CTRL"]) &&
      e.name !== "LEFT CTRL" &&
      e.name !== "RIGHT CTRL";

  const shiftKey =
      (down["LEFT SHIFT"] || down["RIGHT SHIFT"]) &&
      e.name !== "LEFT SHIFT" &&
      e.name !== "RIGHT SHIFT";

  const altKey =
      (down["LEFT ALT"] || down["RIGHT ALT"]) &&
      e.name !== "LEFT ALT" &&
      e.name !== "RIGHT ALT";

  if (
      e.state == "DOWN" &&
      (ctrlKey || shiftKey || altKey || whitelist[`${rawValue}`])
  ) {
    if (ctrlKey) string = string.concat(codes[17], " + ");

    if (shiftKey) string = string.concat(codes[16], " + ");

    if (altKey) string = string.concat(codes[18], " + ");

    if (code) string = string.concat(code);
  }
  return string;
}

const main = async () => {
  const httpServer = createServer();
  const io = new Server(httpServer, {
    cors: {
      origin: "*"
    }
  });

  const keyboardListener = new GlobalKeyboardListener();

  io.on("connection", (socket: Socket) => {
    console.log("Connected...");

    //Log every key that's pressed.
    keyboardListener.addListener((e, down) => {
      const command = getCommandString(e, down);

      if (e && process.argv.includes("--debug")) {
        console.dir(e);
      }

      if (command && !process.argv.includes("--no-display")) {
        console.dir(command);
      }

      if (command) socket.emit("keydown", command);
    });

    console.log("Listening keypresses...");
  });

  console.log("Starting server");

  httpServer.listen(3000);
};

main();
