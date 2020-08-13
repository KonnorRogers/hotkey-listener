'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/*! hotkeys-js v3.8.1 | MIT (c) 2020 kenny wong <wowohoo@qq.com> | http://jaywcjlove.github.io/hotkeys */

var isff = "undefined" != typeof navigator && 0 < navigator.userAgent.toLowerCase().indexOf("firefox");

function addEvent(e, t, o) {
  e.addEventListener ? e.addEventListener(t, o, !1) : e.attachEvent && e.attachEvent("on".concat(t), function () {
    o(window.event);
  });
}

function getMods(e, t) {
  for (var o = t.slice(0, t.length - 1), n = 0; n < o.length; n++) o[n] = e[o[n].toLowerCase()];

  return o;
}

function getKeys(e) {
  "string" != typeof e && (e = "");

  for (var t = (e = e.replace(/\s/g, "")).split(","), o = t.lastIndexOf(""); 0 <= o;) t[o - 1] += ",", t.splice(o, 1), o = t.lastIndexOf("");

  return t;
}

function compareArray(e, t) {
  for (var o = e.length < t.length ? t : e, n = e.length < t.length ? e : t, s = !0, r = 0; r < o.length; r++) ~n.indexOf(o[r]) || (s = !1);

  return s;
}

for (var _keyMap = {
  backspace: 8,
  tab: 9,
  clear: 12,
  enter: 13,
  return: 13,
  esc: 27,
  escape: 27,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  del: 46,
  delete: 46,
  ins: 45,
  insert: 45,
  home: 36,
  end: 35,
  pageup: 33,
  pagedown: 34,
  capslock: 20,
  "\u21ea": 20,
  ",": 188,
  ".": 190,
  "/": 191,
  "`": 192,
  "-": isff ? 173 : 189,
  "=": isff ? 61 : 187,
  ";": isff ? 59 : 186,
  "'": 222,
  "[": 219,
  "]": 221,
  "\\": 220
}, _modifier = {
  "\u21e7": 16,
  shift: 16,
  "\u2325": 18,
  alt: 18,
  option: 18,
  "\u2303": 17,
  ctrl: 17,
  control: 17,
  "\u2318": 91,
  cmd: 91,
  command: 91
}, modifierMap = {
  16: "shiftKey",
  18: "altKey",
  17: "ctrlKey",
  91: "metaKey",
  shiftKey: 16,
  ctrlKey: 17,
  altKey: 18,
  metaKey: 91
}, _mods = {
  16: !1,
  18: !1,
  17: !1,
  91: !1
}, _handlers = {}, k = 1; k < 20; k++) _keyMap["f".concat(k)] = 111 + k;

var _downKeys = [],
    _scope = "all",
    elementHasBindEvent = [],
    code = function (e) {
  return _keyMap[e.toLowerCase()] || _modifier[e.toLowerCase()] || e.toUpperCase().charCodeAt(0);
};

function setScope(e) {
  _scope = e || "all";
}

function getScope() {
  return _scope || "all";
}

function getPressedKeyCodes() {
  return _downKeys.slice(0);
}

function filter(e) {
  var t = e.target || e.srcElement,
      o = t.tagName,
      n = !0;
  return !t.isContentEditable && ("INPUT" !== o && "TEXTAREA" !== o && "SELECT" !== o || t.readOnly) || (n = !1), n;
}

function isPressed(e) {
  return "string" == typeof e && (e = code(e)), !!~_downKeys.indexOf(e);
}

function deleteScope(e, t) {
  var o, n;

  for (var s in e = e || getScope(), _handlers) if (Object.prototype.hasOwnProperty.call(_handlers, s)) for (o = _handlers[s], n = 0; n < o.length;) o[n].scope === e ? o.splice(n, 1) : n++;

  getScope() === e && setScope(t || "all");
}

function clearModifier(e) {
  var t = e.keyCode || e.which || e.charCode,
      o = _downKeys.indexOf(t);

  if (o < 0 || _downKeys.splice(o, 1), e.key && "meta" == e.key.toLowerCase() && _downKeys.splice(0, _downKeys.length), 93 !== t && 224 !== t || (t = 91), t in _mods) for (var n in _mods[t] = !1, _modifier) _modifier[n] === t && (hotkeys[n] = !1);
}

function unbind(e) {
  if (e) {
    if (Array.isArray(e)) e.forEach(function (e) {
      e.key && eachUnbind(e);
    });else if ("object" == typeof e) e.key && eachUnbind(e);else if ("string" == typeof e) {
      for (var t = arguments.length, o = Array(1 < t ? t - 1 : 0), n = 1; n < t; n++) o[n - 1] = arguments[n];

      var s = o[0],
          r = o[1];
      "function" == typeof s && (r = s, s = ""), eachUnbind({
        key: e,
        scope: s,
        method: r,
        splitKey: "+"
      });
    }
  } else Object.keys(_handlers).forEach(function (e) {
    return delete _handlers[e];
  });
}

var eachUnbind = function (e) {
  var d = e.scope,
      i = e.method,
      t = e.splitKey,
      a = void 0 === t ? "+" : t;
  getKeys(e.key).forEach(function (e) {
    var t = e.split(a),
        o = t.length,
        n = t[o - 1],
        s = "*" === n ? "*" : code(n);

    if (_handlers[s]) {
      d = d || getScope();
      var r = 1 < o ? getMods(_modifier, t) : [];
      _handlers[s] = _handlers[s].map(function (e) {
        return i && e.method !== i || e.scope !== d || !compareArray(e.mods, r) ? e : {};
      });
    }
  });
};

function eventHandler(e, t, o) {
  var n;

  if (t.scope === o || "all" === t.scope) {
    for (var s in n = 0 < t.mods.length, _mods) Object.prototype.hasOwnProperty.call(_mods, s) && (!_mods[s] && ~t.mods.indexOf(+s) || _mods[s] && !~t.mods.indexOf(+s)) && (n = !1);

    (0 !== t.mods.length || _mods[16] || _mods[18] || _mods[17] || _mods[91]) && !n && "*" !== t.shortcut || !1 === t.method(e, t) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopPropagation && e.stopPropagation(), e.cancelBubble && (e.cancelBubble = !0));
  }
}

function dispatch(o) {
  var e = _handlers["*"],
      t = o.keyCode || o.which || o.charCode;

  if (hotkeys.filter.call(this, o)) {
    if (93 !== t && 224 !== t || (t = 91), ~_downKeys.indexOf(t) || 229 === t || _downKeys.push(t), ["ctrlKey", "altKey", "shiftKey", "metaKey"].forEach(function (e) {
      var t = modifierMap[e];
      o[e] && !~_downKeys.indexOf(t) ? _downKeys.push(t) : !o[e] && ~_downKeys.indexOf(t) ? _downKeys.splice(_downKeys.indexOf(t), 1) : "metaKey" === e && o[e] && 3 === _downKeys.length && (o.ctrlKey || o.shiftKey || o.altKey || (_downKeys = _downKeys.slice(_downKeys.indexOf(t))));
    }), t in _mods) {
      for (var n in _mods[t] = !0, _modifier) _modifier[n] === t && (hotkeys[n] = !0);

      if (!e) return;
    }

    for (var s in _mods) Object.prototype.hasOwnProperty.call(_mods, s) && (_mods[s] = o[modifierMap[s]]);

    o.getModifierState && (!o.altKey || o.ctrlKey) && o.getModifierState("AltGraph") && (~_downKeys.indexOf(17) || _downKeys.push(17), ~_downKeys.indexOf(18) || _downKeys.push(18), _mods[17] = !0, _mods[18] = !0);
    var r = getScope();
    if (e) for (var d = 0; d < e.length; d++) e[d].scope === r && ("keydown" === o.type && e[d].keydown || "keyup" === o.type && e[d].keyup) && eventHandler(o, e[d], r);
    if (t in _handlers) for (var i = 0; i < _handlers[t].length; i++) if (("keydown" === o.type && _handlers[t][i].keydown || "keyup" === o.type && _handlers[t][i].keyup) && _handlers[t][i].key) {
      for (var a = _handlers[t][i], c = a.key.split(a.splitKey), l = [], f = 0; f < c.length; f++) l.push(code(c[f]));

      l.sort().join("") === _downKeys.sort().join("") && eventHandler(o, a, r);
    }
  }
}

function isElementBind(e) {
  return !!~elementHasBindEvent.indexOf(e);
}

function hotkeys(e, t, o) {
  _downKeys = [];
  var n = getKeys(e),
      s = [],
      r = "all",
      d = document,
      i = 0,
      a = !1,
      c = !0,
      l = "+";

  for (void 0 === o && "function" == typeof t && (o = t), "[object Object]" === Object.prototype.toString.call(t) && (t.scope && (r = t.scope), t.element && (d = t.element), t.keyup && (a = t.keyup), void 0 !== t.keydown && (c = t.keydown), "string" == typeof t.splitKey && (l = t.splitKey)), "string" == typeof t && (r = t); i < n.length; i++) s = [], 1 < (e = n[i].split(l)).length && (s = getMods(_modifier, e)), (e = "*" === (e = e[e.length - 1]) ? "*" : code(e)) in _handlers || (_handlers[e] = []), _handlers[e].push({
    keyup: a,
    keydown: c,
    scope: r,
    mods: s,
    shortcut: n[i],
    method: o,
    key: n[i],
    splitKey: l
  });

  void 0 !== d && !isElementBind(d) && window && (elementHasBindEvent.push(d), addEvent(d, "keydown", function (e) {
    dispatch(e);
  }), addEvent(window, "focus", function () {
    _downKeys = [];
  }), addEvent(d, "keyup", function (e) {
    dispatch(e), clearModifier(e);
  }));
}

var _api = {
  setScope: setScope,
  getScope: getScope,
  deleteScope: deleteScope,
  getPressedKeyCodes: getPressedKeyCodes,
  isPressed: isPressed,
  filter: filter,
  unbind: unbind
};

for (var a in _api) Object.prototype.hasOwnProperty.call(_api, a) && (hotkeys[a] = _api[a]);

if ("undefined" != typeof window) {
  var _hotkeys = window.hotkeys;
  hotkeys.noConflict = function (e) {
    return e && window.hotkeys === hotkeys && (window.hotkeys = _hotkeys), hotkeys;
  }, window.hotkeys = hotkeys;
}

var hotkeys_common_min = hotkeys;

/*!
 * hotkeys-js v3.8.1
 * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies.
 * 
 * Copyright (c) 2020 kenny wong <wowohoo@qq.com>
 * http://jaywcjlove.github.io/hotkeys
 * 
 * Licensed under the MIT license.
 */

var isff$1 = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase().indexOf('firefox') > 0 : false; // 绑定事件

function addEvent$1(object, event, method) {
  if (object.addEventListener) {
    object.addEventListener(event, method, false);
  } else if (object.attachEvent) {
    object.attachEvent("on".concat(event), function () {
      method(window.event);
    });
  }
} // 修饰键转换成对应的键码


function getMods$1(modifier, key) {
  var mods = key.slice(0, key.length - 1);

  for (var i = 0; i < mods.length; i++) {
    mods[i] = modifier[mods[i].toLowerCase()];
  }

  return mods;
} // 处理传的key字符串转换成数组


function getKeys$1(key) {
  if (typeof key !== 'string') key = '';
  key = key.replace(/\s/g, ''); // 匹配任何空白字符,包括空格、制表符、换页符等等

  var keys = key.split(','); // 同时设置多个快捷键，以','分割

  var index = keys.lastIndexOf(''); // 快捷键可能包含','，需特殊处理

  for (; index >= 0;) {
    keys[index - 1] += ',';
    keys.splice(index, 1);
    index = keys.lastIndexOf('');
  }

  return keys;
} // 比较修饰键的数组


function compareArray$1(a1, a2) {
  var arr1 = a1.length >= a2.length ? a1 : a2;
  var arr2 = a1.length >= a2.length ? a2 : a1;
  var isIndex = true;

  for (var i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) === -1) isIndex = false;
  }

  return isIndex;
}

var _keyMap$1 = {
  backspace: 8,
  tab: 9,
  clear: 12,
  enter: 13,
  return: 13,
  esc: 27,
  escape: 27,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  del: 46,
  delete: 46,
  ins: 45,
  insert: 45,
  home: 36,
  end: 35,
  pageup: 33,
  pagedown: 34,
  capslock: 20,
  '⇪': 20,
  ',': 188,
  '.': 190,
  '/': 191,
  '`': 192,
  '-': isff$1 ? 173 : 189,
  '=': isff$1 ? 61 : 187,
  ';': isff$1 ? 59 : 186,
  '\'': 222,
  '[': 219,
  ']': 221,
  '\\': 220
}; // Modifier Keys

var _modifier$1 = {
  // shiftKey
  '⇧': 16,
  shift: 16,
  // altKey
  '⌥': 18,
  alt: 18,
  option: 18,
  // ctrlKey
  '⌃': 17,
  ctrl: 17,
  control: 17,
  // metaKey
  '⌘': 91,
  cmd: 91,
  command: 91
};
var modifierMap$1 = {
  16: 'shiftKey',
  18: 'altKey',
  17: 'ctrlKey',
  91: 'metaKey',
  shiftKey: 16,
  ctrlKey: 17,
  altKey: 18,
  metaKey: 91
};
var _mods$1 = {
  16: false,
  18: false,
  17: false,
  91: false
};
var _handlers$1 = {}; // F1~F12 special key

for (var k$1 = 1; k$1 < 20; k$1++) {
  _keyMap$1["f".concat(k$1)] = 111 + k$1;
}

var _downKeys$1 = []; // 记录摁下的绑定键

var _scope$1 = 'all'; // 默认热键范围

var elementHasBindEvent$1 = []; // 已绑定事件的节点记录
// 返回键码

var code$1 = function code(x) {
  return _keyMap$1[x.toLowerCase()] || _modifier$1[x.toLowerCase()] || x.toUpperCase().charCodeAt(0);
}; // 设置获取当前范围（默认为'所有'）


function setScope$1(scope) {
  _scope$1 = scope || 'all';
} // 获取当前范围


function getScope$1() {
  return _scope$1 || 'all';
} // 获取摁下绑定键的键值


function getPressedKeyCodes$1() {
  return _downKeys$1.slice(0);
} // 表单控件控件判断 返回 Boolean
// hotkey is effective only when filter return true


function filter$1(event) {
  var target = event.target || event.srcElement;
  var tagName = target.tagName;
  var flag = true; // ignore: isContentEditable === 'true', <input> and <textarea> when readOnly state is false, <select>

  if (target.isContentEditable || (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') && !target.readOnly) {
    flag = false;
  }

  return flag;
} // 判断摁下的键是否为某个键，返回true或者false


function isPressed$1(keyCode) {
  if (typeof keyCode === 'string') {
    keyCode = code$1(keyCode); // 转换成键码
  }

  return _downKeys$1.indexOf(keyCode) !== -1;
} // 循环删除handlers中的所有 scope(范围)


function deleteScope$1(scope, newScope) {
  var handlers;
  var i; // 没有指定scope，获取scope

  if (!scope) scope = getScope$1();

  for (var key in _handlers$1) {
    if (Object.prototype.hasOwnProperty.call(_handlers$1, key)) {
      handlers = _handlers$1[key];

      for (i = 0; i < handlers.length;) {
        if (handlers[i].scope === scope) handlers.splice(i, 1);else i++;
      }
    }
  } // 如果scope被删除，将scope重置为all


  if (getScope$1() === scope) setScope$1(newScope || 'all');
} // 清除修饰键


function clearModifier$1(event) {
  var key = event.keyCode || event.which || event.charCode;

  var i = _downKeys$1.indexOf(key); // 从列表中清除按压过的键


  if (i >= 0) {
    _downKeys$1.splice(i, 1);
  } // 特殊处理 cmmand 键，在 cmmand 组合快捷键 keyup 只执行一次的问题


  if (event.key && event.key.toLowerCase() === 'meta') {
    _downKeys$1.splice(0, _downKeys$1.length);
  } // 修饰键 shiftKey altKey ctrlKey (command||metaKey) 清除


  if (key === 93 || key === 224) key = 91;

  if (key in _mods$1) {
    _mods$1[key] = false; // 将修饰键重置为false

    for (var k in _modifier$1) {
      if (_modifier$1[k] === key) hotkeys$1[k] = false;
    }
  }
}

function unbind$1(keysInfo) {
  // unbind(), unbind all keys
  if (!keysInfo) {
    Object.keys(_handlers$1).forEach(function (key) {
      return delete _handlers$1[key];
    });
  } else if (Array.isArray(keysInfo)) {
    // support like : unbind([{key: 'ctrl+a', scope: 's1'}, {key: 'ctrl-a', scope: 's2', splitKey: '-'}])
    keysInfo.forEach(function (info) {
      if (info.key) eachUnbind$1(info);
    });
  } else if (typeof keysInfo === 'object') {
    // support like unbind({key: 'ctrl+a, ctrl+b', scope:'abc'})
    if (keysInfo.key) eachUnbind$1(keysInfo);
  } else if (typeof keysInfo === 'string') {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    } // support old method
    // eslint-disable-line


    var scope = args[0],
        method = args[1];

    if (typeof scope === 'function') {
      method = scope;
      scope = '';
    }

    eachUnbind$1({
      key: keysInfo,
      scope: scope,
      method: method,
      splitKey: '+'
    });
  }
} // 解除绑定某个范围的快捷键


var eachUnbind$1 = function eachUnbind(_ref) {
  var key = _ref.key,
      scope = _ref.scope,
      method = _ref.method,
      _ref$splitKey = _ref.splitKey,
      splitKey = _ref$splitKey === void 0 ? '+' : _ref$splitKey;
  var multipleKeys = getKeys$1(key);
  multipleKeys.forEach(function (originKey) {
    var unbindKeys = originKey.split(splitKey);
    var len = unbindKeys.length;
    var lastKey = unbindKeys[len - 1];
    var keyCode = lastKey === '*' ? '*' : code$1(lastKey);
    if (!_handlers$1[keyCode]) return; // 判断是否传入范围，没有就获取范围

    if (!scope) scope = getScope$1();
    var mods = len > 1 ? getMods$1(_modifier$1, unbindKeys) : [];
    _handlers$1[keyCode] = _handlers$1[keyCode].map(function (record) {
      // 通过函数判断，是否解除绑定，函数相等直接返回
      var isMatchingMethod = method ? record.method === method : true;

      if (isMatchingMethod && record.scope === scope && compareArray$1(record.mods, mods)) {
        return {};
      }

      return record;
    });
  });
}; // 对监听对应快捷键的回调函数进行处理


function eventHandler$1(event, handler, scope) {
  var modifiersMatch; // 看它是否在当前范围

  if (handler.scope === scope || handler.scope === 'all') {
    // 检查是否匹配修饰符（如果有返回true）
    modifiersMatch = handler.mods.length > 0;

    for (var y in _mods$1) {
      if (Object.prototype.hasOwnProperty.call(_mods$1, y)) {
        if (!_mods$1[y] && handler.mods.indexOf(+y) > -1 || _mods$1[y] && handler.mods.indexOf(+y) === -1) {
          modifiersMatch = false;
        }
      }
    } // 调用处理程序，如果是修饰键不做处理


    if (handler.mods.length === 0 && !_mods$1[16] && !_mods$1[18] && !_mods$1[17] && !_mods$1[91] || modifiersMatch || handler.shortcut === '*') {
      if (handler.method(event, handler) === false) {
        if (event.preventDefault) event.preventDefault();else event.returnValue = false;
        if (event.stopPropagation) event.stopPropagation();
        if (event.cancelBubble) event.cancelBubble = true;
      }
    }
  }
} // 处理keydown事件


function dispatch$1(event) {
  var asterisk = _handlers$1['*'];
  var key = event.keyCode || event.which || event.charCode; // 表单控件过滤 默认表单控件不触发快捷键

  if (!hotkeys$1.filter.call(this, event)) return; // Gecko(Firefox)的command键值224，在Webkit(Chrome)中保持一致
  // Webkit左右 command 键值不一样

  if (key === 93 || key === 224) key = 91;
  /**
   * Collect bound keys
   * If an Input Method Editor is processing key input and the event is keydown, return 229.
   * https://stackoverflow.com/questions/25043934/is-it-ok-to-ignore-keydown-events-with-keycode-229
   * http://lists.w3.org/Archives/Public/www-dom/2010JulSep/att-0182/keyCode-spec.html
   */

  if (_downKeys$1.indexOf(key) === -1 && key !== 229) _downKeys$1.push(key);
  /**
   * Jest test cases are required.
   * ===============================
   */

  ['ctrlKey', 'altKey', 'shiftKey', 'metaKey'].forEach(function (keyName) {
    var keyNum = modifierMap$1[keyName];

    if (event[keyName] && _downKeys$1.indexOf(keyNum) === -1) {
      _downKeys$1.push(keyNum);
    } else if (!event[keyName] && _downKeys$1.indexOf(keyNum) > -1) {
      _downKeys$1.splice(_downKeys$1.indexOf(keyNum), 1);
    } else if (keyName === 'metaKey' && event[keyName] && _downKeys$1.length === 3) {
      /**
       * Fix if Command is pressed:
       * ===============================
       */
      if (!(event.ctrlKey || event.shiftKey || event.altKey)) {
        _downKeys$1 = _downKeys$1.slice(_downKeys$1.indexOf(keyNum));
      }
    }
  });
  /**
   * -------------------------------
   */

  if (key in _mods$1) {
    _mods$1[key] = true; // 将特殊字符的key注册到 hotkeys 上

    for (var k in _modifier$1) {
      if (_modifier$1[k] === key) hotkeys$1[k] = true;
    }

    if (!asterisk) return;
  } // 将 modifierMap 里面的修饰键绑定到 event 中


  for (var e in _mods$1) {
    if (Object.prototype.hasOwnProperty.call(_mods$1, e)) {
      _mods$1[e] = event[modifierMap$1[e]];
    }
  }
  /**
   * https://github.com/jaywcjlove/hotkeys/pull/129
   * This solves the issue in Firefox on Windows where hotkeys corresponding to special characters would not trigger.
   * An example of this is ctrl+alt+m on a Swedish keyboard which is used to type μ.
   * Browser support: https://caniuse.com/#feat=keyboardevent-getmodifierstate
   */


  if (event.getModifierState && !(event.altKey && !event.ctrlKey) && event.getModifierState('AltGraph')) {
    if (_downKeys$1.indexOf(17) === -1) {
      _downKeys$1.push(17);
    }

    if (_downKeys$1.indexOf(18) === -1) {
      _downKeys$1.push(18);
    }

    _mods$1[17] = true;
    _mods$1[18] = true;
  } // 获取范围 默认为 `all`


  var scope = getScope$1(); // 对任何快捷键都需要做的处理

  if (asterisk) {
    for (var i = 0; i < asterisk.length; i++) {
      if (asterisk[i].scope === scope && (event.type === 'keydown' && asterisk[i].keydown || event.type === 'keyup' && asterisk[i].keyup)) {
        eventHandler$1(event, asterisk[i], scope);
      }
    }
  } // key 不在 _handlers 中返回


  if (!(key in _handlers$1)) return;

  for (var _i = 0; _i < _handlers$1[key].length; _i++) {
    if (event.type === 'keydown' && _handlers$1[key][_i].keydown || event.type === 'keyup' && _handlers$1[key][_i].keyup) {
      if (_handlers$1[key][_i].key) {
        var record = _handlers$1[key][_i];
        var splitKey = record.splitKey;
        var keyShortcut = record.key.split(splitKey);
        var _downKeysCurrent = []; // 记录当前按键键值

        for (var a = 0; a < keyShortcut.length; a++) {
          _downKeysCurrent.push(code$1(keyShortcut[a]));
        }

        if (_downKeysCurrent.sort().join('') === _downKeys$1.sort().join('')) {
          // 找到处理内容
          eventHandler$1(event, record, scope);
        }
      }
    }
  }
} // 判断 element 是否已经绑定事件


function isElementBind$1(element) {
  return elementHasBindEvent$1.indexOf(element) > -1;
}

function hotkeys$1(key, option, method) {
  _downKeys$1 = [];
  var keys = getKeys$1(key); // 需要处理的快捷键列表

  var mods = [];
  var scope = 'all'; // scope默认为all，所有范围都有效

  var element = document; // 快捷键事件绑定节点

  var i = 0;
  var keyup = false;
  var keydown = true;
  var splitKey = '+'; // 对为设定范围的判断

  if (method === undefined && typeof option === 'function') {
    method = option;
  }

  if (Object.prototype.toString.call(option) === '[object Object]') {
    if (option.scope) scope = option.scope; // eslint-disable-line

    if (option.element) element = option.element; // eslint-disable-line

    if (option.keyup) keyup = option.keyup; // eslint-disable-line

    if (option.keydown !== undefined) keydown = option.keydown; // eslint-disable-line

    if (typeof option.splitKey === 'string') splitKey = option.splitKey; // eslint-disable-line
  }

  if (typeof option === 'string') scope = option; // 对于每个快捷键进行处理

  for (; i < keys.length; i++) {
    key = keys[i].split(splitKey); // 按键列表

    mods = []; // 如果是组合快捷键取得组合快捷键

    if (key.length > 1) mods = getMods$1(_modifier$1, key); // 将非修饰键转化为键码

    key = key[key.length - 1];
    key = key === '*' ? '*' : code$1(key); // *表示匹配所有快捷键
    // 判断key是否在_handlers中，不在就赋一个空数组

    if (!(key in _handlers$1)) _handlers$1[key] = [];

    _handlers$1[key].push({
      keyup: keyup,
      keydown: keydown,
      scope: scope,
      mods: mods,
      shortcut: keys[i],
      method: method,
      key: keys[i],
      splitKey: splitKey
    });
  } // 在全局document上设置快捷键


  if (typeof element !== 'undefined' && !isElementBind$1(element) && window) {
    elementHasBindEvent$1.push(element);
    addEvent$1(element, 'keydown', function (e) {
      dispatch$1(e);
    });
    addEvent$1(window, 'focus', function () {
      _downKeys$1 = [];
    });
    addEvent$1(element, 'keyup', function (e) {
      dispatch$1(e);
      clearModifier$1(e);
    });
  }
}

var _api$1 = {
  setScope: setScope$1,
  getScope: getScope$1,
  deleteScope: deleteScope$1,
  getPressedKeyCodes: getPressedKeyCodes$1,
  isPressed: isPressed$1,
  filter: filter$1,
  unbind: unbind$1
};

for (var a$1 in _api$1) {
  if (Object.prototype.hasOwnProperty.call(_api$1, a$1)) {
    hotkeys$1[a$1] = _api$1[a$1];
  }
}

if (typeof window !== 'undefined') {
  var _hotkeys$1 = window.hotkeys;

  hotkeys$1.noConflict = function (deep) {
    if (deep && window.hotkeys === hotkeys$1) {
      window.hotkeys = _hotkeys$1;
    }

    return hotkeys$1;
  };

  window.hotkeys = hotkeys$1;
}

var hotkeys_common = hotkeys$1;

var hotkeysJs = createCommonjsModule(function (module) {
if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require
  module.exports = hotkeys_common_min;
} else {
  // eslint-disable-next-line global-require
  module.exports = hotkeys_common;
}
});

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
  eventOptions = {}
}) {
  keys.forEach(key => {
    Object.assign(eventOptions, {
      detail: {
        key: key
      }
    });
    const keyupEvent = new CustomEvent(`keyup:${key}`, eventOptions);
    const keydownEvent = new CustomEvent(`keydown:${key}`, eventOptions);
    const keyup = {
      keyup: true,
      keydown: false,
      element: element,
      scope: hotkeyOptions.scope,
      splitKey: hotkeyOptions.splitKey
    };
    const keydown = Object.assign(keyup, {
      keyup: false,
      keydown: true
    });
    hotkeysJs(key, keyup, () => element.dispatchEvent(keyupEvent));
    hotkeysJs(key, keydown, () => element.dispatchEvent(keydownEvent));
  });
}

const hotkeyListener = {
  register
};

exports.default = hotkeyListener;
//# sourceMappingURL=index.bundled.js.map
