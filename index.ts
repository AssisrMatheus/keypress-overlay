import { GlobalKeyboardListener } from "node-global-key-listener";
import whitelist from "./keycodes.whitelist.json";
import codes from "./keycodes.US.json";

const main = async () => {
  const keyboardListener = new GlobalKeyboardListener();

  //Log every key that's pressed.
  await keyboardListener.addListener((e, down) => {
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
      rawValue !== 165 && // Alt gr
      rawValue !== 17 && // Ctrl
      rawValue !== 162 && // Ctrl
      rawValue !== 163 && // Ctrl
      rawValue !== 16 && // Shift
      rawValue !== 160 && // Shift
      rawValue !== 161 && // Shift
      rawValue !== 18 && // Alt
      rawValue !== 164 // Alt
    ) {
      // console.dir(e);
    }

    if (
      e.state == "DOWN" &&
      (ctrlKey || shiftKey || altKey || whitelist[`${rawValue}`])
    ) {
      if (ctrlKey) string = string.concat(codes[17], " + ");

      if (shiftKey) string = string.concat(codes[16], " + ");

      if (altKey) string = string.concat(codes[18], " + ");

      if (code) string = string.concat(code);
    }

    if (string) console.log(string);
  });
};

main();
