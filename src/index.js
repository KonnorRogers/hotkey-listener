import hotkeys from "hotkeys-js";

/**
 * @param {HTMLElement} [element=window] - The element to attach the hotkey listener to
 * @param {String[]} keyAry - A string of keys IE: 'enter', 'space', etc
 * @param {Object} [hotkeyOptions={}] - only supports scope and splitKey
 *   documentation found here: https://github.com/jaywcjlove/hotkeys#option
 *
 * @param {string} hotkeyOptions.scope - The scope of the listener
 * @param {string} hotkeyOptions.splitKey - What to use as a split key, used for modifiers
 * @param {Object} [eventOptions={}] -
 *   Possible options found here https://developer.mozilla.org/en-US/docs/Web/API/Event/Event
 *   eventOptions also supports the detail: key
 *   https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
 */
function register({
  element = window,
  keys,
  hotkeyOptions = {},
  eventOptions = {},
}) {
  keys.forEach((key) => {
    Object.assign(eventOptions, { detail: { key: key } })
    const keyupEvent = new CustomEvent(`keyup:${key}`, eventOptions);
    const keydownEvent = new CustomEvent(`keydown:${key}`, eventOptions);

    const keyup = {
      keyup: true,
      keydown: false,
      element: element,
      scope: hotkeyOptions.scope,
      splitKey: hotkeyOptions.splitKey,
    };

    const keydown = Object.assign(keyup, { keyup: false, keydown: true });

    hotkeys(key, keyup, () => {
      element.dispatchEvent(keyupEvent)
    });

    hotkeys(key, keydown, () => {
      element.dispatchEvent(keydownEvent)
    });
  });
}

export const hotkeyListener = { register, hotkeys }
export default hotkeyListener
