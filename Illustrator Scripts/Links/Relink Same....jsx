#target Illustrator
#include "../.lib/commons.js"

var PREDICATE_LINKS = function(it) { return it.typename === "PlacedItem" }
var SIZE_INPUT = [120, 21]

checkHasSelection()
var items = Collections.filterItem(selection, PREDICATE_LINKS)
check(Collections.isNotEmpty(items), getString(R.string.error_notypes_document, R.plurals.link.plural))

var dialog = new Dialog(R.string.relink_same, "relinking-files/#relink-same")
var pdfPanel, pageEdit, keepSizeCheck
var config = configs.resolve("links/relink_same")

var file = FilePicker.openFile(dialog.getTitle(), FileType.values())

if (file !== null) {
  dialog.vgroup(function(main) {
    main.alignChildren = "fill"
    if (file.isPdf()) {
      pdfPanel = new OpenPDFPanel(main, SIZE_INPUT).also(function(panel) {
        panel.hgroup(function(group) {
          group.helpTips = R.string.tip_relink_pages
          group.leftStaticText(undefined, R.string.pages)
          pageEdit = group.editText(SIZE_INPUT, "1").also(function(it) {
            it.validateDigits()
            it.activate()
          })
        })
      })
    }
    main.hgroup(function(group) {
      group.alignment = "right"
      keepSizeCheck = new KeepSizeCheck(group).also(function(it) {
        it.value = config.getBoolean("keep_size")
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

    var progress = new ProgressDialog(items.length)
    Collections.forEach(items, function(item, i) {
      progress.increment(R.string.progress_relink, i + 1)
      print(i + ". ")
      relink(item, file)
      println("Done.")
    })
    selection = items

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
}
