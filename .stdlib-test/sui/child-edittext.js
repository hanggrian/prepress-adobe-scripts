initTest($)

var window = new Window("dialog", "Test")
var root = window.add("group")

test("activate", function() {
  var child = root.editText()
  assertFalse(child.active)
  child.activate()
  if (!Scripts.OS_MAC && Scripts.APP_AI) {
    return
  }
  assertTrue(child.active)
})

test("editText", function() {
  var child = root.editText([100, 50], "Input", { key: "value" })
  assertEquals(100, child.bounds.width)
  assertEquals(50, child.bounds.height)
  assertEquals("Input", child.text)
  assertEquals("value", child.properties.key)
})
