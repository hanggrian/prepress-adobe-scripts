initTest($.fileName)

var window = new Window('dialog', 'Test')
var root = window.add('group')

test('hasSelection', function() {
  var child = root.dropDownList(undefined, ['Apple', 'Orange'])
  assertFalse(child.hasSelection())
  child.selection = 0
  assertTrue(child.hasSelection())
})

test('selectText', function() {
  var child = root.dropDownList(undefined, ['Apple', 'Orange'])
  assertNull(child.selection)
  child.selectText('Orange')
  assertEquals('Orange', child.selection.text)
})

test('dropDownList', function() {
  var child = root.dropDownList([100, 50], ['Apple', 'Orange'], {key: 'value'})
  assertEquals(100, child.bounds.width)
  assertEquals(50, child.bounds.height)
  assertEquals('Apple', Collections.first(child.items).text)
  assertEquals('value', child.properties.key)
})
