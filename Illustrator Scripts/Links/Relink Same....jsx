#target Illustrator
#include "../.lib/commons.js"

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [120, 21]
var PREDICATE_LINKS = function(it) { return it.typename === "PlacedItem" }

checkHasSelection()
var items = Collections.filterItem(selection, PREDICATE_LINKS)
check(Collections.isNotEmpty(items), "No links found in selection")

var dialog = new Dialog("Relink Same", "relinking-files/#relink-same")
var pdfPanel, pageEdit, keepSizeCheck
var prefs = preferences2.resolve("links/relink_same")

var file = FilePicker.openFile(dialog.getTitle(), [
  FILTERS_ADOBE_ILLUSTRATOR, FILTERS_ADOBE_PDF,
  FILTERS_BMP, FILTERS_GIF89a, FILTERS_JPEG, FILTERS_JPEG2000, FILTERS_PNG, FILTERS_PHOTOSHOP, FILTERS_TIFF
])

if (file !== null) {
  dialog.vgroup(function(main) {
    if (file.isPdf()) {
      pdfPanel = new OpenPDFPanel(main, BOUNDS_TEXT, BOUNDS_EDIT).also(function(panel) {
        panel.main.hgroup(function(group) {
          group.tooltips("Which page should be used when opening a multipage document")
          group.staticText(BOUNDS_TEXT, "Page:").also(JUSTIFY_RIGHT)
          pageEdit = group.editText(BOUNDS_EDIT, "1").also(function(it) {
            it.validateDigits()
            it.activate()
          })
        })
      })
    }
    main.hgroup(function(group) {
      group.alignment = "right"
      keepSizeCheck = new KeepSizeCheck(group).also(function(it) {
        it.main.value = prefs.getBoolean("keep_size")
      })
    })
  })
  dialog.setCancelButton()
  dialog.setDefaultButton(undefined, function() {
    if (file.isPdf()) {
      var page = parseInt(pageEdit.text) - 1
      println("PDF page = " + page + ".")
      preferences.setPDFPage(page)
    }

    var progress = new ProgressPalette(items.length)
    Collections.forEach(items, function(item, i) {
      progress.increment("Linking item %d", i + 1)
      print(i + ". ")
      relink(item, file)
      println("Done.")
    })
    selection = items

    prefs.setBoolean("keep_size", keepSizeCheck.isSelected())
  })
  dialog.show()
}

function relink(item, file) {
  var width = item.width
  var height = item.height
  var position = item.position
  if (file.isPdf() && Items.isLinkExists(item) && item.file.isPdf()) {
    print("Appling PDF fix, ")
    item.file = Resources.getImage("relink_fix")
  }
  item.file = file
  if (keepSizeCheck.isSelected()) {
    print("Keep size, ")
    item.width = width
    item.height = height
    item.position = position
  }
}
