// Select all PathItem with attributes matching user input.
// When there are active selection, will only select items within those selection.

#target Illustrator
#include "../.lib/commons.js"

var YES_OR_NO = ["Yes", "No"]
var COLOR_SPACES = ["Grayscale", "RGB", "CMYK", "LAB", "Separations", "DeviceN", "Indexed"]
var STATUSES = ["No Data", "Data from File", "Data Modified"]
var SIZE_INPUT = [100, 21]

check(Collections.isNotEmpty(document.rasterItems), "No images in this document")
var isFilterMode = Collections.isNotEmpty(selection)

var dialog = new Dialog("Select Images", "selecting-items/#select-images")
var dimensionPanel
var colorSpaceList, bitsEdit, transparentList
var embeddedList, overprintList, statusList
var recursiveCheck
var config = configs.resolve("select/images")

dialog.hgroup(function(main) {
  main.alignChildren = "fill"
  main.vgroup(function(topGroup) {
    topGroup.alignChildren = "fill"
    dimensionPanel = new SelectDimensionPanel(topGroup, SIZE_INPUT)
    topGroup.vpanel("Image", function(panel) {
      panel.alignChildren = "right"
      panel.hgroup(function(group) {
        group.tooltips("The color space of the raster image")
        group.staticText(undefined, "Color Space:").also(JUSTIFY_RIGHT)
        colorSpaceList = group.dropDownList(SIZE_INPUT, COLOR_SPACES)
      })
      panel.hgroup(function(group) {
        group.tooltips("The number of bits per channel")
        group.staticText(undefined, "Bits/Channel:").also(JUSTIFY_RIGHT)
        bitsEdit = group.editText(SIZE_INPUT).also(VALIDATE_DIGITS)
      })
      panel.hgroup(function(group) {
        group.tooltips("Is the raster art transparent?")
        group.staticText(undefined, "Transparent:").also(JUSTIFY_RIGHT)
        transparentList = group.dropDownList(SIZE_INPUT, YES_OR_NO)
      })
    })
  })
  main.vgroup(function(topGroup) {
    topGroup.alignChildren = "fill"
    topGroup.vpanel("Others", function(panel) {
      panel.alignChildren = "right"
      panel.hgroup(function(group) {
        group.tooltips("Is the raster art embedded within the illustration?")
        group.staticText(undefined, "Embedded:").also(JUSTIFY_RIGHT)
        embeddedList = group.dropDownList(SIZE_INPUT, YES_OR_NO)
      })
      panel.hgroup(function(group) {
        group.tooltips("Is the raster art overprinting?")
        group.staticText(undefined, "Overprint:").also(JUSTIFY_RIGHT)
        overprintList = group.dropDownList(SIZE_INPUT, YES_OR_NO)
      })
      panel.hgroup(function(group) {
        group.tooltips("Status of the linked image")
        group.staticText(undefined, "Status:").also(JUSTIFY_RIGHT)
        statusList = group.dropDownList(SIZE_INPUT, STATUSES)
      })
    })
    if (isFilterMode) {
      recursiveCheck = new RecursiveCheck(topGroup).also(function(it) {
        it.alignment = "right"
        it.value = config.getBoolean("recursive")
      })
    }
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var width = dimensionPanel.getWidth()
  var height = dimensionPanel.getHeight()
  var colorSpace
  if (colorSpaceList.hasSelection()) {
    if (colorSpaceList.selection.text === "Grayscale") {
      colorSpace = ImageColorSpace.GrayScale
    } else if (colorSpaceList.selection.text === "RGB") {
      colorSpace = ImageColorSpace.RGB
    } else if (colorSpaceList.selection.text === "CMYK") {
      colorSpace = ImageColorSpace.CMYK
    } else if (colorSpaceList.selection.text === "LAB") {
      colorSpace = ImageColorSpace.LAB
    } else if (colorSpaceList.selection.text === "Separations") {
      colorSpace = ImageColorSpace.Separation
    } else if (colorSpaceList.selection.text === "DeviceN") {
      colorSpace = ImageColorSpace.DeviceN
    } else {
      colorSpace = ImageColorSpace.Indexed
    }
  }
  var bits = parseInt(bitsEdit.text) || 0
  var transparent = transparentList.hasSelection() ? transparentList.selection.text === "Yes" : undefined
  var embedded = embeddedList.hasSelection() ? embeddedList.selection.text === "Yes" : undefined
  var overprint = overprintList.hasSelection() ? overprintList.selection.text === "Yes" : undefined
  var status
  if (statusList.hasSelection()) {
    if (statusList.selection.text === "No Data") {
      status = RasterLinkState.NODATA
    } else if (statusList.selection.text === "Data from File") {
      status = RasterLinkState.DATAFROMFILE
    } else {
      status = RasterLinkState.DATAMODIFIED
    }
  }
  selectAll(["RasterItem"], function(item) {
    if (width !== undefined && parseInt(width) !== parseInt(item.width)) return false
    if (height !== undefined && parseInt(height) !== parseInt(item.height)) return false
    if (colorSpace !== undefined && colorSpace !== item.imageColorSpace) return false
    if (bits !== 0 && parseInt(bits) !== parseInt(item.bitsPerChannel)) return false
    if (transparent !== undefined && transparent !== item.transparent) return false
    if (embedded !== undefined && embedded !== item.embedded) return false
    if (overprint !== undefined && overprint !== item.overprint) return false
    if (status !== undefined && status !== item.status) return false
    return true
  }, isFilterMode && recursiveCheck.value)

  if (isFilterMode) config.setBoolean("recursive", recursiveCheck.value)
})
dialog.show()
