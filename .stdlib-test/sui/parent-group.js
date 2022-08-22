initTest($)

var window = new Window("dialog", "Test")
var root = window.add("group")

test("tooltips", function() {
  var parent1 = root.hgroup()
  parent1.tooltips("Description")
  assertEquals("Description", parent1.helpTips)

  var parent2 = root.vgroup()
  parent2.tooltips("Description")
  assertEquals("Description", parent2.helpTips)

  var parent3 = root.sgroup()
  parent3.tooltips("Description")
  assertEquals("Description", parent3.helpTips)
})

test("groups", function() {
  var parent1 = root.hgroup()
  assertEquals("row", parent1.orientation)

  var parent2 = root.vgroup()
  assertEquals("column", parent2.orientation)

  var parent3 = root.sgroup()
  assertEquals("stack", parent3.orientation)
})
