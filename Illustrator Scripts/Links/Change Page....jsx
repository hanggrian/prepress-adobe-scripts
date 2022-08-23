#target Illustrator
#include "../.lib/commons.js"

var PREDICATE_LINKS = function(it) { return it.typename === "PlacedItem" && Items.isLinkExists(it) && it.file.isPdf() }
var SIZE_INPUT = [120, 21]

checkHasSelection()
check(Collections.anyItem(selection, PREDICATE_LINKS), "No PDF links found in selection")

var dialog = new Dialog("Change Page", "relinking-files/#change-page")
var pdfPanel, rangeGroup, orderByGroup, recursiveCheck, keepSizeCheck
var config = configs.resolve("links/change_page")

dialog.vgroup(function(main) {
  main.alignChildren = "fill"
  pdfPanel = new OpenPDFPanel(main, SIZE_INPUT).also(function(panel) {
    panel.main.hgroup(function(group) {
      group.tooltips("Which pages should be used when opening a multipage document")
      group.staticText(undefined, "Pages:").also(JUSTIFY_RIGHT)
      rangeGroup = new RangeGroup(group, SIZE_INPUT).also(function(it) {
        it.startEdit.activate()
      })
    })
  })
  orderByGroup = new OrderByGroup(main, [ORDER_LAYERS, ORDER_POSITIONS]).also(function(group) {
    group.main.alignment = "right"
    group.list.selectText(config.getString("order", "Reversed"))
  })
  main.hgroup(function(group) {
    group.alignment = "right"
    recursiveCheck = new RecursiveCheck(group).also(function(it) {
      it.main.value = config.getBoolean("recursive")
    })
    keepSizeCheck = new KeepSizeCheck(group).also(function(it) {
      it.main.value = config.getBoolean("keep_size")
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
    preferences.setPDFPage(current)
    var relinked = false
    if (!isRecursive && item.typename === "GroupItem") {
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

  config.setString("order", orderByGroup.list.selection.text)
  config.setBoolean("recursive", isRecursive)
  config.setBoolean("keep_size", keepSizeCheck.isSelected())
})
dialog.show()

function relink(item) {
  var width = item.width
  var height = item.height
  var position = item.position
  var file = item.file
  item.file = Resources.getImage("relink_fix") // Apply PDF fix
  item.file = file
  if (keepSizeCheck.isSelected()) {
    print("Keep size, ")
    item.width = width
    item.height = height
    item.position = position
  }
  return true
}
