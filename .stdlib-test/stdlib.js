#include '../.stdlib/stdlib.js'

#include 'collections/base.js'
#include 'collections/predicate.js'
#include 'collections/transform.js'
#include 'io/file.js'
#include 'sui/child-button.js'
#include 'sui/child-dropdownlist.js'
#include 'sui/child-edittext.js'
#include 'sui/child-iconbutton.js'
#include 'sui/child-image.js'
#include 'sui/child-listbox.js'
#include 'sui/child-progressbar.js'
#include 'sui/child-slider.js'
#include 'sui/child-staticText.js'
#include 'sui/child-toggles.js'
#include 'sui/parent-group.js'
#include 'sui/parent-panel.js'
#include 'sui/parent-tab.js'
#include 'assert.js'
#include 'enums.js'
#include 'geometry.js'
#include 'math.js'
#include 'objects.js'
#include 'standard.js'
#include 'text.js'
#include 'time.js'

initTest($)

test('Languages', function () {
  assertEquals('English', Language.valueOfCode('en').text)
  assertEquals('Indonesia', Language.valueOfCode('id').text)
})
