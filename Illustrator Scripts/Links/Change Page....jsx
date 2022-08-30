#target Illustrator
#include "../.lib/commons.js"

var PREDICATE_LINKS = function(it) { return it.typename === "PlacedItem" && Items.isLinkExists(it) && it.file.isPdf() }
var SIZE_INPUT = [120, 21]

checkHasSelection()
check(Collections.anyItem(selection, PREDICATE_LINKS), "No PDF links found in selection")

var dialog = new Dialog(R.string.change_page, "relinking-files/#change-page")
var pdfPanel, rangeGroup, orderByList, recursiveCheck, keepSizeCheck
var config = configs.resolve("links/change_page")

dialog.vgroup(function(main) {
  main.alignChildren = "fill"
  pdfPanel = new OpenPDFPanel(main, SIZE_INPUT).also(function(panel) {
    panel.hgroup(function(group) {
      group.tooltips(R.string.tip_relink_pages)
      group.leftStaticText(undefined, R.string.pages)
      rangeGroup = new RangeGroup(group, SIZE_INPUT).also(function(it) {
        it.startEdit.activate()
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
    preferences.setPDFPage(current)
    var relinked = false
    if (!recursiveCheck.value && item.typename === "GroupItem") {
      Collections.forEachItem([item], function(innerItem) {
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
    println("Done.")
  })
  selection = source

  config.setInt("order", orderByList.selection.index)
  config.setBoolean("recursive", recursiveCheck.value)
  config.setBoolean("keep_size", keepSizeCheck.value)
})
dialog.show()

function relink(item) {
  var width = item.width
  var height = item.height
  var position = item.position
  var file = item.file
  item.file = getImage("relink_fix") // Apply PDF fix
  item.file = file
  if (keepSizeCheck.value) {
    print("Keep size, ")
    item.width = width
    item.height = height
    item.position = position
  }
  return true
}
