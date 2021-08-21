import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

// const keyboardListener = new GlobalKeyboardListener();

// console.log(os.platform());

function App() {

  const [val, setVal] = useState("");
  useEffect(() => {
    setVal(window !== undefined ? 'has window' : "no window");
    window.addEventListener('message', function(event) {
      setVal(event.data);
      var data = JSON.parse(event.data);
      console.log(data);
    }, false);

    // //Log every key that's pressed.
    // keyboardListener.addListener((e, down) => {
    //   const rawValue = e.vKey;
    //   const code = codes[`${rawValue}`];
    //
    //   let string = "";
    //
    //   const ctrlKey =
    //       (down["LEFT CTRL"] || down["RIGHT CTRL"]) &&
    //       e.name !== "LEFT CTRL" &&
    //       e.name !== "RIGHT CTRL";
    //
    //   const shiftKey =
    //       (down["LEFT SHIFT"] || down["RIGHT SHIFT"]) &&
    //       e.name !== "LEFT SHIFT" &&
    //       e.name !== "RIGHT SHIFT";
    //
    //   const altKey =
    //       (down["LEFT ALT"] || down["RIGHT ALT"]) &&
    //       e.name !== "LEFT ALT" &&
    //       e.name !== "RIGHT ALT";
    //
    //   if (
    //       e.state == "DOWN" &&
    //       (ctrlKey || shiftKey || altKey || whitelist[`${rawValue}`])
    //   ) {
    //     if (ctrlKey) string = string.concat(codes[17], " + ");
    //
    //     if (shiftKey) string = string.concat(codes[16], " + ");
    //
    //     if (altKey) string = string.concat(codes[18], " + ");
    //
    //     if (code) string = string.concat(code);
    //   }
    //
    //   if (string) setVal(string);
    // });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {val}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
