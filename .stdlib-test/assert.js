exports.assertEquals = function(expected, actual) {
  if (expected != actual) {
    throwError("`" + actual + "` to be `" + expected + "`")
  }
}

exports.assertNotEquals = function(expected, actual) {
  if (expected == actual) {
    throwError("`" + actual + "` to not be `" + expected + "`")
  }
}

exports.assertTrue = function(expected) {
  if (!expected) {
    throwError("to be true")
  }
}

exports.assertFalse = function(expected) {
  if (expected) {
    throwError("to be false")
  }
}

exports.assertNull = function(actual) {
  if (actual !== undefined && actual !== null) {
    throwError("to be null")
  }
}

exports.assertNotNull = function(actual) {
  if (actual === undefined || actual === null) {
    throwError("to be not null")
  }
}

function throwError(message) {
  throw new Error("TEST FAIL\nExpected " + message + ".")
}
