#include "../.lib/core.js"
#include "../../.stdlib-test/assert.js"

var parseUnits = function() {
  assertEquals("7", parseUnits("2.5 mm").round())
}()
