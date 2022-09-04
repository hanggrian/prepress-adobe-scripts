initTest($)

var window = new Window("dialog", "Test")
var root = window.add("group")

test("setHelpTips", function() {
  var parent = root.hpanel()
  parent.staticText(undefined, "Label")
  parent.editText(undefined, "Input")
  parent.setHelpTips("Description")
  assertEquals("Description", parent.children[0].helpTip)
  assertEquals("Description", parent.children[1].helpTip)
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
