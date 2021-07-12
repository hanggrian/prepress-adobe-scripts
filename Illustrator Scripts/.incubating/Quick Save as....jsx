#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/range.js'

var TYPES = ['PDF', 'PNG']
var LOCATIONS = ['Desktop', 'Documents', 'Download']

var BOUNDS_TEXT = [90, 21]
var BOUNDS_EDIT = [100, 21]

checkSaved()

var dialog = new Dialog('Quick Save Artboards as')
var typeList, locationList, rangeGroup

dialog.hgroup(function(group) {
    group.setTooltips('Save file as desired type')
    group.staticText(BOUNDS_TEXT, 'File Type:', JUSTIFY_RIGHT)
    typeList = group.dropDownList(BOUNDS_EDIT, TYPES, function(it) {
        it.selectText('PDF')
    })
})
dialog.hgroup(function(group) {
    group.setTooltips('Where to save files?')
    group.staticText(BOUNDS_TEXT, 'Save Location:', JUSTIFY_RIGHT)
    typeList = group.dropDownList(BOUNDS_EDIT, LOCATIONS, function(it) {
        it.selectText('Desktop')
    })
})
rangeGroup = new RangeGroup(dialog.main, BOUNDS_TEXT, BOUNDS_EDIT).let(function(it) {
    it.maxRange = document.artboards.length
    it.endEdit.text = document.artboards.length
    it.startEdit.activate()
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
})
dialog.show()