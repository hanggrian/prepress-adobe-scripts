initTest($)

var window = new Window("dialog", "Test")
var root = window.add("group")

test("staticText", function() {
  var child = root.staticText([100, 50], "Label", { key: "value" })
  assertEquals(100, child.bounds.width)
  assertEquals(50, child.bounds.height)
  assertEquals("Label", child.text)
  assertEquals("value", child.properties.key)
})
