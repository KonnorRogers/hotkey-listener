'use strict';

import pkg from "../../package.json"

test('returns a valid version number', () => {
  expect(pkg.version).toNotBeNil()
});
