#target Illustrator
#include '../.lib/commons.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [120, 21]
var PREDICATE_LINKS = function(it) {
  return it.typename === 'PlacedItem' && it.isFileExists() && it.file.isPDF()
}

checkHasSelection()
check(selection.anyItem(PREDICATE_LINKS), 'No PDF links found in selection')

var dialog = new Dialog('Change Page', 'relinking-files#change-page-f7')
var pdfPanel, rangeGroup, orderByGroup, recursiveCheck, keepSizeCheck
var prefs = preferences2.resolve('links/change_page')

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
    group.list.selectText(prefs.getString('order', 'Reversed'))
  })
  main.hgroup(function(group) {
    recursiveCheck = new RecursiveCheck(group).also(function(it) {
      it.main.value = prefs.getBoolean('recursive')
    })
    keepSizeCheck = new KeepSizeCheck(group).also(function(it) {
      it.main.value = prefs.getBoolean('keep_size')
    })
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var current = rangeGroup.getStart()
  var end = rangeGroup.getEnd()
  var isRecursive = recursiveCheck.isSelected()
  var source = isRecursive ? selection.filterItem(PREDICATE_LINKS) : selection
  var progress = new ProgressPalette(source.length)

  orderByGroup.forEach(source, function(item, i) {
    progress.increment('Linking item {0}', i + 1)
    print('Item {0} page {1}.'.format(i, current))
    preferences.setPDFPage(current)
    var relinked = false
    if (!isRecursive && item.typename === 'GroupItem') {
      [item].forEachItem(function(innerItem) {
        if (PREDICATE_LINKS(innerItem)) {
          relinked = relink(innerItem)
        }
      })
    } else {
      relinked = relink(item)
    }
    if (relinked && ++current > end) {
      current--
    }
    println('Done')
  })
  selection = source

  prefs.setString('order', orderByGroup.list.selection.text)
  prefs.setBoolean('recursive', isRecursive)
  prefs.setBoolean('keep_size', keepSizeCheck.isSelected())
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
  return true
}
