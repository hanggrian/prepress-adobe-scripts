#target Illustrator
#include '../.lib/commons.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [120, 21]

checkHasSelection()
check(selection.anyItem(function(it) {
  return it.typename === 'PlacedItem' && it.isFileExists() && it.file.isPDF()
}), 'No PDF links found in selection')

var dialog = new Dialog('Change Page', 'relinking-files#change-page-f7')
var pdfPanel, rangeGroup, orderByGroup, recursiveCheck, keepSizeCheck

dialog.vgroup(function(main) {
  main.alignChildren = 'right'
  pdfPanel = new OpenPDFPanel(main, BOUNDS_TEXT, BOUNDS_EDIT).also(function(panel) {
    panel.main.hgroup(function(group) {
      group.tips('Which pages should be used when opening a multipage document')
      group.staticText(BOUNDS_TEXT, 'Pages:').also(JUSTIFY_RIGHT)
      rangeGroup = new RangeGroup(group, BOUNDS_EDIT).also(function(it) {
        it.startEdit.activate()
      })
    })
  })
  orderByGroup = new OrderByGroup(main, [ORDER_LAYERS, ORDER_POSITIONS]).also(function(group) {
    group.list.selectText('Reversed')
  })
  main.hgroup(function(group) {
    recursiveCheck = new RecursiveCheck(group)
    keepSizeCheck = new KeepSizeCheck(group)
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var current = rangeGroup.getStart()
  var end = rangeGroup.getEnd()

  var source = !recursiveCheck.isSelected() ? selection : selection.filterItem(function(it) {
    return it.typename === 'PlacedItem' && it.isFileExists() && it.file.isPDF()
  })
  var progress = new ProgressPalette(source.length)
  orderByGroup.forEach(source, function(item, i) {
    progress.increment('Linking item {0}', i + 1)
    print('Item {0} page {1}.'.format(i, current))
    preferences.setPDFPage(current++)
    if (item.typename === 'GroupItem') {
      _forEachItem(item.pageItems, function(innerItem) {
        if (innerItem.typename === 'PlacedItem' && innerItem.isFileExists() && innerItem.file.isPDF()) {
          relink(innerItem)
        }
      })
    } else {
      relink(item)
    }
    if (current > end) {
      current--
    }
    println('Done')
  })
  selection = source
})
dialog.show()

function relink(item) {
  var width = item.width
  var height = item.height
  var position = item.position
  var file = item.file
  item.file = getImage('relink_fix') // Apply PDF fix
  item.file = file
  if (keepSizeCheck.isSelected()) {
    print('Keep size, ')
    item.width = width
    item.height = height
    item.position = position
  }
}