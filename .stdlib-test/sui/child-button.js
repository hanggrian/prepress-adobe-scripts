initTest($)

var window = new Window("dialog", "Test")
var root = window.add("group")

test("tooltip", function() {
  var child = root.button()
  child.tooltip("Description")
  assertEquals("Description.", child.helpTip)
})

test("button", function() {
  var child = root.button([100, 50], "Click", { key: "value" })
  assertEquals(100, child.bounds.width)
  assertEquals(50, child.bounds.height)
  assertEquals("Click", child.text)
  assertEquals("value", child.properties.key)
})
