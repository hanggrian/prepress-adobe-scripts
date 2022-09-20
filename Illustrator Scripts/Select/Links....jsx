// Select all PlacedItem with attributes matching user input.
// When there are active selection, will only select items within those selection.
//
// The file type options are similar with Illustrator native `Relink...` dialog.

#target Illustrator
#include "../.lib/commons.js"

var SIZE_INPUT = [150, 21]

check(Collections.isNotEmpty(document.placedItems), getString(R.string.error_notypes_document, R.plurals.link.plural))
var isFilterMode = Collections.isNotEmpty(selection)

var dialog = new Dialog(R.string.select_links, "selecting-items/#select-links")
var dimensionPanel
var aiCheck, pdfCheck, bmpCheck, gifCheck, jpegCheck, jpeg2000Check, pngCheck, psdCheck, tiffCheck
var recursiveCheck
var config = configs.resolve("select/links")

dialog.vgroup(function(main) {
  main.alignChildren = "fill"
  dimensionPanel = new SelectDimensionPanel(main, SIZE_INPUT)
  main.vpanel(R.string.file_types, function(panel) {
    panel.helpTips = R.string.tip_selectlinks_filetypes
    panel.alignChildren = "fill"
    aiCheck = panel.checkBox(undefined, getTypeString("Adobe Illustrator", FileType.ADOBE_ILLUSTRATOR))
    pdfCheck = panel.checkBox(undefined, getTypeString("Adobe PDF", FileType.ADOBE_PDF))
    bmpCheck = panel.checkBox(undefined, getTypeString("BMP", FileType.BMP))
    gifCheck = panel.checkBox(undefined, getTypeString("GIF89a", FileType.GIF89a))
    jpegCheck = panel.checkBox(undefined, getTypeString("JPEG", FileType.JPEG))
    jpeg2000Check = panel.checkBox(undefined, getTypeString("JPEG2000", FileType.JPEG2000))
    pngCheck = panel.checkBox(undefined, getTypeString("PNG", FileType.PNG))
    psdCheck = panel.checkBox(undefined, getTypeString("Photoshop", FileType.PHOTOSHOP))
    tiffCheck = panel.checkBox(undefined, getTypeString("TIFF", FileType.TIFF))
  })
  if (isFilterMode) {
    recursiveCheck = new RecursiveCheck(main).also(function(it) {
      it.alignment = "right"
      it.value = config.getBoolean("recursive")
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
    if (aiCheck.value && !Collections.contains(FileType.ADOBE_ILLUSTRATOR.extensions, extension)) return false
    if (pdfCheck.value && !Collections.contains(FileType.ADOBE_PDF.extensions, extension)) return false
    if (bmpCheck.value && !Collections.contains(FileType.BMP.extensions, extension)) return false
    if (gifCheck.value && !Collections.contains(FileType.GIF89a.extensions, extension)) return false
    if (jpegCheck.value && !Collections.contains(FileType.JPEG.extensions, extension)) return false
    if (jpeg2000Check.value && !Collections.contains(FileType.JPEG2000.extensions, extension)) return false
    if (pngCheck.value && !Collections.contains(FileType.PNG.extensions, extension)) return false
    if (psdCheck.value && !Collections.contains(FileType.PHOTOSHOP.extensions, extension)) return false
    if (tiffCheck.value && !Collections.contains(FileType.TIFF.extensions, extension)) return false
    return true
  }, isFilterMode && recursiveCheck.value)

  if (isFilterMode) config.setBoolean("recursive", recursiveCheck.value)
})
dialog.show()

function getTypeString(prefix, fileType) {
  var s = ""
  Collections.forEach(fileType.extensions, function(it, i) {
    s += it
    if (i != Collections.lastIndex(fileType.extensions)) {
      s += ", "
    }
  })
  return "%s (%s)".format(prefix, s)
}
