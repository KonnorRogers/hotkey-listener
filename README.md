# hotkey-listener

A modest js library that dispatches low-level keyboard events in the form of CustomEvents.

## Issues

Hotkey listener is 5.99kb according to Unpkg.
[https://unpkg.com/browse/hotkey-listener/](https://unpkg.com/browse/hotkey-listener@0.0.2/dist-web/)

Hotkey Listener is 2.6kb GZipped according to Bundlephobia.
[https://bundlephobia.com/result?p=hotkey-listener@0.0.3](https://bundlephobia.com/result?p=hotkey-listener@0.0.4)

Hotkey Listener can only be registered on `HTMLElement`'s that implement
the "KeyboardEvent" interface.

For example: `window`, `document`

## Installation

```bash
npm install hotkey-listener

## OR

yarn add hotkey-listener
```

## Usage

```javascript
// index.js

hotkeyListener.register({
  element: window,
  keys: [
    "f5",
    "ctrl+d"
  ],
  eventOptions: {
    // Required to preventDefault() in chrome
    cancelable: true
  }
})

window.addEventListener("keydown:f5", (event) => {
  // Prevent window refresh
  event.preventDefault()
  console.log("f5 pushed")
  console.log(event.cancelable)
})

window.addEventListener("keydown:ctrl+d", (event) => {
  event.preventDefault()
  console.log(`${event.detail.key} pushed`) // ctrl+d pressed
})
```

Hotkey listener creates custom `keyup:<keystroke>` and `keydown:<keystroke>` events.

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
    // Detail is an Object you can attach other [key: value] pairs to
  },
})
```

## Hotkeys API

Should you need more finely grained tuning of `hotkeys`, you can
communicate with the `hotkeys` API directly. For example, to enable
hotkeys on `input`, `textarea`, etc, you can do the following:

```bash
import hotkeyListener from "hotkey-listener"

hotkeyListener.hotkeys.filter = function(event) {
  return true
}
```

[https://github.com/jaywcjlove/hotkeys#filter](https://github.com/jaywcjlove/hotkeys#filter)

## How it works?

Hotkey-Listener under the hood uses [the `hotkeys` library](https://github.com/jaywcjlove/hotkeys) to dispatch [CustomEvents](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) to the client.

## Contributors


