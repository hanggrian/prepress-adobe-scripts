function assertEquals(expected, actual) {
  if (expected != actual) {
    throwError("`" + actual + "` to be `" + expected + "`")
  }
}

function assertNotEquals(expected, actual) {
  if (expected == actual) {
    throwError("`" + actual + "` to not be `" + expected + "`")
  }
}

function assertTrue(expected) {
  if (!expected) {
    throwError("to be true")
  }
}

function assertFalse(expected) {
  if (expected) {
    throwError("to be false")
  }
}

function assertNull(actual) {
  if (actual !== undefined && actual !== null) {
    throwError("to be null")
  }
}

function assertNotNull(actual) {
  if (actual === undefined || actual === null) {
    throwError("to be not null")
  }
}

function throwError(errorMessage) {
  var message = "TEST FAIL\nExpected " + errorMessage.toString()
  throw new Error(message)
}
