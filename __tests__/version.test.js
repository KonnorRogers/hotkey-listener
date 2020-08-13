'use strict';

import package from "../../package.json"

test('returns a valid version number', () => {
  expect(package.version).toNot
});
