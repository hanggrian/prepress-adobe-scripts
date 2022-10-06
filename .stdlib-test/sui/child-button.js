initTest($)

var window = new Window('dialog', 'Test')
var root = window.add('group')

test('addClickListener', function() {
  var counter = 0
  var child = root.button()
  child.addClickListener(function() { counter++ })
  child.addClickListener(function() { counter++ })
  child.onClick()
  assertEquals(2, counter)
})

test('button', function() {
  var child = root.button([100, 50], 'Click', { key: "value" })
  assertEquals(100, child.bounds.width)
  assertEquals(50, child.bounds.height)
  assertEquals('Click', child.text)
  assertEquals('value', child.properties.key)
})
