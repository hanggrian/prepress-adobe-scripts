// Select all PlacedItem with attributes matching user input.
// When there are active selection, will only select items within those selection.
//
// The file type options are similar with Illustrator native `Relink...` dialog.

#target Illustrator
#include "../.lib/commons.js"

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [150, 21]

var FILE_AI = ["ai"]
var FILE_PDF = ["pdf"]
var FILE_BMP = ["bmp"]
var FILE_GIF = ["gif"]
var FILE_JPEG = ["jpg", "jpe", "jpeg"]
var FILE_JPEG2000 = ["jpf", "jpx", "jp2", "j2k", "j2c", "jpc"]
var FILE_PNG = ["png", "pns"]
var FILE_PSD = ["psd", "psb", "pdd"]
var FILE_TIFF = ["tif", "tiff"]

check(Collections.isNotEmpty(document.placedItems), "No links in this document")
var isFilterMode = Collections.isNotEmpty(selection)

var dialog = new Dialog("Select Links", "selecting-items/#select-links")
var dimensionPanel
var aiCheck, pdfCheck, bmpCheck, gifCheck, jpegCheck, jpeg2000Check, pngCheck, psdCheck, tiffCheck
var recursiveCheck
var prefs = preferences2.resolve("select/links")

dialog.vgroup(function(main) {
  main.alignChildren = "fill"
  dimensionPanel = new SelectDimensionPanel(main, BOUNDS_TEXT, BOUNDS_EDIT)
  main.vpanel("File Types", function(panel) {
    panel.tooltips("File extension of selected links")
    panel.alignChildren = "fill"
    aiCheck = panel.checkBox(undefined, getTypeString("Adobe Illustrator", FILE_AI))
    pdfCheck = panel.checkBox(undefined, getTypeString("Adobe PDF", FILE_PDF))
    bmpCheck = panel.checkBox(undefined, getTypeString("BMP", FILE_BMP))
    gifCheck = panel.checkBox(undefined, getTypeString("GIF89a", FILE_GIF))
    jpegCheck = panel.checkBox(undefined, getTypeString("JPEG", FILE_JPEG))
    jpeg2000Check = panel.checkBox(undefined, getTypeString("JPEG2000", FILE_JPEG2000))
    pngCheck = panel.checkBox(undefined, getTypeString("PNG", FILE_PNG))
    psdCheck = panel.checkBox(undefined, getTypeString("Photoshop", FILE_PSD))
    tiffCheck = panel.checkBox(undefined, getTypeString("TIFF", FILE_TIFF))
  })
  if (isFilterMode) {
    recursiveCheck = new RecursiveCheck(main).also(function(it) {
      it.main.alignment = "right"
      it.main.value = prefs.getBoolean("recursive")
    })
  }
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var width = dimensionPanel.getWidth()
  var height = dimensionPanel.getHeight()
  selectAll(["PlacedItem"], function(item) {
    if (width !== undefined && parseInt(width) !== parseInt(item.width)) return false
    if (height !== undefined && parseInt(height) !== parseInt(item.height)) return false
    var extension = Items.isLinkExists(item) && item.file.name.split(".").pop()
    if (aiCheck.value && !Collections.contains(FILE_AI, extension)) return false
    if (pdfCheck.value && !Collections.contains(FILE_PDF, extension)) return false
    if (bmpCheck.value && !Collections.contains(FILE_BMP, extension)) return false
    if (gifCheck.value && !Collections.contains(FILE_GIF, extension)) return false
    if (jpegCheck.value && !Collections.contains(FILE_JPEG, extension)) return false
    if (jpeg2000Check.value && !Collections.contains(FILE_JPEG2000, extension)) return false
    if (pngCheck.value && !Collections.contains(FILE_PNG, extension)) return false
    if (psdCheck.value && !Collections.contains(FILE_PSD, extension)) return false
    if (tiffCheck.value && !Collections.contains(FILE_TIFF, extension)) return false
    return true
  }, isFilterMode && recursiveCheck.isSelected())

  prefs.setBoolean("recursive", recursiveCheck.isSelected())
})
dialog.show()

function getTypeString(prefix, suffix) {
  var s = ""
  Collections.forEach(suffix, function(it, i) {
    s += it
    if (i != Collections.lastIndex(suffix)) {
      s += ", "
    }
  })
  return "{0} ({1})".format(prefix, s)
}
