#target Illustrator
#include '../.lib/commons.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [120, 21]

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename === 'PlacedItem' })
check(items.isNotEmpty(), 'No links found in selection')

var dialog = new Dialog('Relink Same', 'relinking-files#relink-same--f7')
var pdfPanel, pageEdit, keepSizeCheck

var file = openFile(dialog.getTitle(), [
  FILTERS_ADOBE_ILLUSTRATOR, FILTERS_ADOBE_PDF,
  FILTERS_BMP, FILTERS_GIF89a, FILTERS_JPEG, FILTERS_JPEG2000, FILTERS_PNG, FILTERS_PHOTOSHOP, FILTERS_TIFF
])

if (file !== null) {
  dialog.vgroup(function(main) {
    if (file.isPDF()) {
      pdfPanel = new OpenPDFPanel(main, BOUNDS_TEXT, BOUNDS_EDIT).also(function(panel) {
        panel.main.hgroup(function(group) {
          group.tips('Which page should be used when opening a multipage document')
          group.staticText(BOUNDS_TEXT, 'Page:').also(JUSTIFY_RIGHT)
          pageEdit = group.editText(BOUNDS_EDIT, '1').also(function(it) {
            it.validateDigits()
            it.activate()
          })
        })
      })
    }
    main.hgroup(function(group) {
      group.alignment = 'right'
      keepSizeCheck = new KeepSizeCheck(group)
    })
  })
  dialog.setCancelButton()
  dialog.setDefaultButton(undefined, function() {
    if (file.isPDF()) {
      var page = parseInt(pageEdit.text) - 1
      println('PDF page=' + page)
      preferences.setPDFPage(page)
    }

    var progress = new ProgressPalette(items.length)
    items.forEach(function(item, i) {
      progress.increment('Linking item {0}', i + 1)
      print(i + '. ')
      relink(item, file)
      println('Done')
    })
    selection = items
  })
  dialog.show()
}

function relink(item, file) {
  var width = item.width
  var height = item.height
  var position = item.position
  if (file.isPDF() && item.isFileExists() && item.file.isPDF()) {
    print('Appling PDF fix, ')
    item.file = getImage('relink_fix')
  }
  item.file = file
  if (keepSizeCheck.isSelected()) {
    print('Keep size, ')
    item.width = width
    item.height = height
    item.position = position
  }
}