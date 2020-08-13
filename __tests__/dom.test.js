"use strict";

import hotkeyListener from "../src";

beforeEach(() => {
  document.body.innerHTML = `<div id="wrapper"></div>`;
});

// https://github.com/jsdom/jsdom/issues/1634#issuecomment-436703999
test("Add text on keypress when bound to document", async () => {
  hotkeyListener.register({
    element: document,
    keys: ["z"],
  });

  const event = new KeyboardEvent("keydown", {
    key: "z",
    keyCode: 90,
  });

  const wrapper = document.getElementById("wrapper");
  const text = "Hi there!";

  document.addEventListener("keydown:z", () => {
    wrapper.innerText = text;
  });

  document.dispatchEvent(event);

  await expect(wrapper.innerText).toEqual(text);
});

test("Add text on modifier + keypress", async () => {
  hotkeyListener.register({
    element: document,
    keys: ["ctrl+z"],
  });

  const event = new KeyboardEvent("keydown", {
    ctrlKey: true,
    key: "z",
    keyCode: 90,
  });

  const wrapper = document.getElementById("wrapper");
  const text = "Hi there!";

  document.addEventListener("keydown:ctrl+z", () => {
    wrapper.innerText = text;
  });

  document.dispatchEvent(event);

  await expect(wrapper.innerText).toEqual(text);
});

test("Appropriately records key details", async () => {
  const hotkey = "ctrl+z"
  hotkeyListener.register({
    element: document,
    keys: [hotkey],
  });

  const event = new KeyboardEvent("keydown", {
    ctrlKey: true,
    key: "z",
    keyCode: 90,
  });

  const wrapper = document.getElementById("wrapper");

  document.addEventListener(`keydown:${hotkey}`, (event) => {
    wrapper.innerText = event.detail.key;
  });

  document.dispatchEvent(event);

  await expect(wrapper.innerText).toEqual(hotkey);
});

