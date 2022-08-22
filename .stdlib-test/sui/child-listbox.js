initTest($)

var window = new Window("dialog", "Test")
var root = window.add("group")

test("tooltip", function() {
  var child = root.listBox()
  child.tooltip("Description")
  assertEquals("Description.", child.helpTip)
})

test("hasSelection", function() {
  var child = root.listBox(undefined, ["Apple", "Orange"])
  assertFalse(child.hasSelection())
  child.selection = 0
  assertTrue(child.hasSelection())
})

test("selectText", function() {
  var child = root.listBox(undefined, ["Apple", "Orange"])
  assertNull(child.selection)
  child.selectText("Orange")
  assertEquals("Orange", child.selection.text)
})

test("listBox", function() {
  var child = root.listBox([100, 50], ["Apple", "Orange"], { key: "value" })
  assertEquals(100, child.bounds.width)
  assertEquals(50, child.bounds.height)
  assertEquals("Apple", Collections.first(child.items).text)
  assertEquals("value", child.properties.key)
})
