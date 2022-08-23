/*
<javascriptresource>
<name>Resize Images...</name>
<category>2</category>
<enableinfo>true</enableinfo>
</javascriptresource>
*/

#target Photoshop
#include "../.lib/commons.js"

var SIZE_INPUT = [180, 21]
var RESAMPLES = ["Bicubic", "Bicubic Sharper", "Bicubic Smoother", "Bilinear", "Nearest Neighbor", "None"]

var dialog = new Dialog("Resize Images", "resizing-images-canvases/#resize-images")
var widthEdit, heightEdit, resolutionEdit, resampleList

dialog.vgroup(function(main) {
  main.alignChildren = "right"
  main.hgroup(function(group) {
    group.tooltips("Images' new width")
    group.staticText(undefined, "Width:").also(JUSTIFY_RIGHT)
    widthEdit = group.editText(SIZE_INPUT, formatUnits(document.width, unitName, 2)).also(function(it) {
      it.validateUnits()
      it.activate()
    })
  })
  main.hgroup(function(group) {
    group.tooltips("Images' new height")
    group.staticText(undefined, "Height:").also(JUSTIFY_RIGHT)
    heightEdit = group.editText(SIZE_INPUT, formatUnits(document.height, unitName, 2)).also(VALIDATE_UNITS)
  })
  main.hgroup(function(group) {
    group.tooltips("Images' new resolution")
    group.staticText(undefined, "Resolution:").also(JUSTIFY_RIGHT)
    resolutionEdit = group.editText(SIZE_INPUT, document.resolution).also(VALIDATE_UNITS)
  })
  main.hgroup(function(group) {
    group.tooltips("Method to resample new images")
    group.staticText(undefined, "Resample:").also(JUSTIFY_RIGHT)
    resampleList = group.dropDownList(SIZE_INPUT, RESAMPLES).also(function(it) {
      it.selectText("Bicubic")
    })
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var width = new UnitValue(widthEdit.text)
  var height = new UnitValue(heightEdit.text)
  var resolution = parseInt(resolutionEdit.text)
  var method = getResampleMethod()

  process(document, width, height, resolution, method)
})
dialog.setYesButton("All", function() {
  var width = new UnitValue(widthEdit.text)
  var height = new UnitValue(heightEdit.text)
  var resolution = parseInt(resolutionEdit.text)
  var method = getResampleMethod()
  var progress = new ProgressPalette(app.documents.length, "Resizing")

  Collections.forEach(app.documents, function(document) {
    progress.increment()
    process(document, width, height, resolution, method)
  })
})
dialog.show()

function process(document, width, height, resolution, method) {
  app.activeDocument = document
  document.resizeImage(width, height, resolution, method)
}

function getResampleMethod() {
  switch (resampleList.selection.text) {
    case "Bicubic":
      return ResampleMethod.BICUBIC
    case "Bicubic Sharper":
      return ResampleMethod.BICUBICSHARPER
    case "Bicubic Smoother":
      return ResampleMethod.BICUBICSMOOTHER
    case "Bilinear":
      return ResampleMethod.BILINEAR
    case "Nearest Neighbor":
      return ResampleMethod.NEARESTNEIGHBOR
    default:
      return ResampleMethod.NONE
  }
}
