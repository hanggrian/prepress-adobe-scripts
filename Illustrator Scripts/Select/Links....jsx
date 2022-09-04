// Select all PlacedItem with attributes matching user input.
// When there are active selection, will only select items within those selection.
//
// The file type options are similar with Illustrator native `Relink...` dialog.

#target Illustrator
#include "../.lib/commons.js"

var FILE_AI = ["ai"]
var FILE_PDF = ["pdf"]
var FILE_BMP = ["bmp"]
var FILE_GIF = ["gif"]
var FILE_JPEG = ["jpg", "jpe", "jpeg"]
var FILE_JPEG2000 = ["jpf", "jpx", "jp2", "j2k", "j2c", "jpc"]
var FILE_PNG = ["png", "pns"]
var FILE_PSD = ["psd", "psb", "pdd"]
var FILE_TIFF = ["tif", "tiff"]
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
