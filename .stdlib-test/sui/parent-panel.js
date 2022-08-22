initTest($)

var window = new Window("dialog", "Test")
var root = window.add("group")

test("tooltips", function() {
  var parent1 = root.hpanel()
  parent1.tooltips("Description")
  assertEquals("Description", parent1.helpTips)

  var parent2 = root.vpanel()
  parent2.tooltips("Description")
  assertEquals("Description", parent2.helpTips)

  var parent3 = root.spanel()
  parent3.tooltips("Description")
  assertEquals("Description", parent3.helpTips)
})

test("panels", function() {
  var parent1 = root.hpanel("Section")
  assertEquals("Section", parent1.text)
  assertEquals("row", parent1.orientation)

  var parent2 = root.vpanel("Section")
  assertEquals("Section", parent2.text)
  assertEquals("column", parent2.orientation)

  var parent3 = root.spanel("Section")
  assertEquals("Section", parent3.text)
  assertEquals("stack", parent3.orientation)
})
