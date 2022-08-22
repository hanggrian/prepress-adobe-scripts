initTest($)

var window = new Window("dialog", "Test")
var root = window.add("group")

test("tooltip", function() {
  var child = root.slider()
  child.tooltip("Description")
  assertEquals("Description.", child.helpTip)
})

test("slider", function() {
  var child = root.slider([100, 50], 5, 1, 10, { key: "value" })
  assertEquals(100, child.bounds.width)
  assertEquals(50, child.bounds.height)
  assertEquals(5, child.value)
  assertEquals(1, child.minvalue)
  assertEquals(10, child.maxvalue)
  assertEquals("value", child.properties.key)
})
