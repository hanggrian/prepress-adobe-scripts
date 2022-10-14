initTest($.fileName)

var window = new Window('dialog', 'Test')
var root = window.add('group')

test('progressBar', function() {
  var child = root.progressBar([100, 50], 1, 10, { key: 'value' })
  assertEquals(100, child.bounds.width)
  assertEquals(50, child.bounds.height)
  // when set to different value, minvalue is no longer used
  assertEquals(10, child.maxvalue)
  assertEquals('value', child.properties.key)
})
