#target Illustrator
#include "../.lib/commons.js"

var PREDICATE_LINKS = function(it) { return it.typename === "PlacedItem" }
var SIZE_INPUT = [120, 21]

checkHasSelection()
check(Collections.anyItem(selection, PREDICATE_LINKS), "No links found in selection")

var dialog = new Dialog(R.string.relink_multipage, "relinking-files/#relink-multipage")
var pdfPanel, rangeGroup, orderByList, recursiveCheck, keepSizeCheck
var collection
var config = configs.resolve("links/relink_multipage")

var files = FilePicker.openFile(dialog.getTitle(), [
  FILTERS_ADOBE_ILLUSTRATOR, FILTERS_ADOBE_PDF,
  FILTERS_BMP, FILTERS_GIF89a, FILTERS_JPEG, FILTERS_JPEG2000, FILTERS_PNG, FILTERS_PHOTOSHOP, FILTERS_TIFF
], true)

if (files !== null && Collections.isNotEmpty(files)) {
  collection = new FileCollection(files)

  dialog.vgroup(function(main) {
    main.alignChildren = "fill"
    if (collection.hasPDF) {
      pdfPanel = new OpenPDFPanel(main, SIZE_INPUT)
    }
    main.vpanel(R.string.pages, function(panel) {
      panel.alignChildren = "right"
      panel.hgroup(function(group) {
        group.tooltips(R.string.tip_relink_pages)
        group.leftStaticText(undefined, R.string.pages)
        rangeGroup = new RangeGroup(group, SIZE_INPUT).also(function(it) {
          it.startEdit.activate()
          it.endEdit.text = collection.length
        })
      })
    })
    orderByList = new OrderByList(main, [OrderBy.layers(), OrderBy.positions()]).also(function(it) {
      it.alignment = "right"
      it.selection = config.getInt("order")
    })
    main.hgroup(function(group) {
      group.alignment = "right"
      recursiveCheck = new RecursiveCheck(group).also(function(it) {
        it.value = config.getBoolean("recursive")
      })
      keepSizeCheck = new KeepSizeCheck(group).also(function(it) {
        it.value = config.getBoolean("keep_size")
      })
    })
  })
  dialog.setCancelButton()
  dialog.setDefaultButton(undefined, function() {
    var current = rangeGroup.getStart()
    var end = rangeGroup.getEnd()
    var source = recursiveCheck.value ? Collections.filterItem(selection, PREDICATE_LINKS) : selection
    var progress = new ProgressDialog(source.length)

    orderByList.forEach(source, function(item, i) {
      progress.increment(R.string.progress_relink, i + 1)
      print("Item %d page %d.".format(i, current))
      var file = collection.get(current)
      var relinked = false
      if (!recursiveCheck.value && item.typename === "GroupItem") {
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

    config.setInt("order", orderByList.selection.index)
    config.setBoolean("recursive", recursiveCheck.value)
    config.setBoolean("keep_size", keepSizeCheck.value)
  })
  dialog.show()
}

function relink(item, file) {
  var width = item.width
  var height = item.height
  var position = item.position
  if (file.isPdf() && Items.isLinkExists(item) && item.file.isPdf()) {
    print("Appling PDF fix, ")
    item.file = getImage("relink_fix")
  }
  item.file = file
  if (keepSizeCheck.value) {
    print("Keep size, ")
    item.width = width
    item.height = height
    item.position = position
  }
  return true
}
