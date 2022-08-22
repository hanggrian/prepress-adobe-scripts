#target Illustrator
#include "../.lib/commons.js"

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [120, 21]
var PREDICATE_LINKS = function(it) { return it.typename === "PlacedItem" }

checkHasSelection()
check(Collections.anyItem(selection, PREDICATE_LINKS), "No links found in selection")

var dialog = new Dialog("Relink Multipage", "relinking-files/#relink-multipage")
var pdfPanel, rangeGroup, orderByGroup, recursiveCheck, keepSizeCheck
var collection
var prefs = preferences2.resolve("links/relink_multipage")

var files = FilePicker.openFile(dialog.getTitle(), [
  FILTERS_ADOBE_ILLUSTRATOR, FILTERS_ADOBE_PDF,
  FILTERS_BMP, FILTERS_GIF89a, FILTERS_JPEG, FILTERS_JPEG2000, FILTERS_PNG, FILTERS_PHOTOSHOP, FILTERS_TIFF
], true)

if (files !== null && Collections.isNotEmpty(files)) {
  collection = new FileCollection(files)

  dialog.vgroup(function(main) {
    main.alignChildren = "right"
    if (collection.hasPDF) {
      pdfPanel = new OpenPDFPanel(main, BOUNDS_TEXT, BOUNDS_EDIT)
    }
    main.vpanel("Pages", function(panel) {
      panel.hgroup(function(group) {
        group.tooltips("Which pages should be used when opening a multipage document")
        group.staticText(BOUNDS_TEXT, "Pages:").also(JUSTIFY_RIGHT)
        rangeGroup = new RangeGroup(group, BOUNDS_EDIT).also(function(it) {
          it.startEdit.activate()
          it.endEdit.text = collection.length
        })
      })
    })
    orderByGroup = new OrderByGroup(main, [ORDER_LAYERS, ORDER_POSITIONS]).also(function(group) {
      group.list.selectText(prefs.getString("order", "Reversed"))
    })
    main.hgroup(function(group) {
      recursiveCheck = new RecursiveCheck(group).also(function(it) {
        it.main.value = prefs.getBoolean("recursive")
      })
      keepSizeCheck = new KeepSizeCheck(group).also(function(it) {
        it.main.value = prefs.getBoolean("keep_size")
      })
    })
  })
  dialog.setCancelButton()
  dialog.setDefaultButton(undefined, function() {
    var current = rangeGroup.getStart()
    var end = rangeGroup.getEnd()
    var isRecursive = recursiveCheck.isSelected()
    var source = isRecursive ? Collections.filterItem(selection, PREDICATE_LINKS) : selection
    var progress = new ProgressPalette(source.length)

    orderByGroup.forEach(source, function(item, i) {
      progress.increment("Linking item %d", i + 1)
      print("Item %d page %d.".format(i, current))
      var file = collection.get(current)
      var relinked = false
      if (!isRecursive && item.typename === "GroupItem") {
        Collections.forEachItem([item], function(innerItem) {
          if (PREDICATE_LINKS(innerItem)) {
            relinked = relink(innerItem, file)
          }
        })
      } else {
        relinked = relink(item, file)
      }
      if (relinked && ++current > end) {
        current--
      }
      println("Done.")
    })
    selection = source

    prefs.setString("order", orderByGroup.list.selection.text)
    prefs.setBoolean("recursive", isRecursive)
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
  return true
}
