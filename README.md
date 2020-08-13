# hotkey-listener

A modest js library to provide low-level keyboard events the form of DOM events.

## Usage

```bash
npm install hotkey-listener

## OR

yarn add hotkey-listener
```

```javascript
// index.js

import hotkeyListener from "hotkey-listener"

hotkeyListener.register({
  // Registers to the window
  keys: [
    "f5",
    "ctrl+d"
  ]
})

div = document.getElementById("mydiv")
div.addEventListener("keyup:f5", () => console.log("f5 pushed"))
div.addEventListener("keydown:ctrl+f5", (event) => {
  console.log(`event.detail.key` pushed`)
}) // => ctrl+f5 pushed
```

Hotkey listener creates custom `keyup:<keystroke>` and
`keydown:<keystroke>` events.

Events also record the key that was pressed via `event.detail.key`

## API Reference

```javascript
hotkeyListener.register({
  element: <HTMLElement>, // Default is window
  keys: <String[]>,

  // https://github.com/jaywcjlove/hotkeys#option
  // element, keyup, and keydown are already predefined
  hotkeyOptions: {
    scope: <String>,
    splitKey <String>
  },

  // https://developer.mozilla.org/en-US/docs/Web/API/Event/Event
  // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
  eventOptions: {
    bubbles: <Boolean>, // default false
    cancelable: <Boolean>, // default false
    composed: <Boolean>, // default false
    detail: { key: "<key pressed>" }
  },
})
```

## How it works?

Hotkey-Listener under the hood uses the library
[https://github.com/jaywcjlove/hotkeys](https://github.com/jaywcjlove/hotkeys)
to dispatch
[CustomEvents](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
