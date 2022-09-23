initTest($)

var window = new Window("dialog", "Test")
var root = window.add("group")

test("addClickListener", function() {
  var counter1 = 0
  var child1 = root.checkBox()
  child1.addClickListener(function() { counter1++ })
  child1.addClickListener(function() { counter1++ })
  child1.onClick()
  assertEquals(2, counter1)

  var counter2 = 0
  var child2 = root.checkBox()
  child2.addClickListener(function() { counter2++ })
  child2.addClickListener(function() { counter2++ })
  child2.onClick()
  assertEquals(2, counter2)
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
