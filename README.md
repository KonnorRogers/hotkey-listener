# hotkey-listener

A modest js library that dispatches low-level keyboard events in the form of CustomEvents.

## Issues

Hotkey listener is 5.99kb according to Unpkg.
[https://unpkg.com/browse/hotkey-listener@0.0.2/dist-web/](https://unpkg.com/browse/hotkey-listener@0.0.2/dist-web/)

This is partly because it uses
[Hotkeys](https://github.com/jaywcjlove/hotkeys) as a dependency and
bundles it up into a single file.

Hotkey Listener can only be registered on `HTMLElement`'s that implement
the "KeyboardEvent" interface.
IE: `window`, `input`, `textarea`, `document`

## Usage

```bash
npm install hotkey-listener

## OR

yarn add hotkey-listener
```

```javascript
// index.js

    hotkeyListener.register({
      element: document,
      keys: [
        "f5",
        "ctrl+d"
      ]
    })

    document.addEventListener("keyup:f5", (event) => {
      // Prevent window refresh
      event.preventDefault()
      console.log("f5 pushed")
    })

    document.addEventListener("keydown:ctrl+d", (event) => {
      console.log(`${event.detail.key}` pushed) // ctrl+d pressed
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

## How it works?

Hotkey-Listener under the hood uses [the hotkeys library] (https://github.com/jaywcjlove/hotkeys) to dispatch [CustomEvents](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) to the client.
