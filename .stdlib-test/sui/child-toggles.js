initTest($)

var window = new Window("dialog", "Test")
var root = window.add("group")

test("tooltip", function() {
  var child1 = root.checkBox()
  child1.tooltip("Description")
  assertEquals("Description.", child1.helpTip)

  var child2 = root.radioButton()
  child2.tooltip("Description")
  assertEquals("Description.", child2.helpTip)
})

test("toggles", function() {
  var child1 = root.checkBox([100, 50], "Option", { key: "value" })
  assertEquals(100, child1.bounds.width)
  assertEquals(50, child1.bounds.height)
  assertEquals("Option", child1.text)
  assertEquals("value", child1.properties.key)

  var child2 = root.radioButton([100, 50], "Option", { key: "value" })
  assertEquals(100, child2.bounds.width)
  assertEquals(50, child2.bounds.height)
  assertEquals("Option", child2.text)
  assertEquals("value", child2.properties.key)
})
