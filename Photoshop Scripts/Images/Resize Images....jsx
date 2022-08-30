/*
<javascriptresource>
<name>Resize Images...</name>
<category>2</category>
<enableinfo>true</enableinfo>
</javascriptresource>
*/

#target Photoshop
#include "../.lib/commons.js"

function listResamples() {
  return [
    R.string.bicubic, R.string.bicubic_sharper, R.string.bicubic_smoother,
    R.string.bilinear, R.string.nearest_neighbor, R.string.none
  ]
}

var SIZE_INPUT = [180, 21]

var dialog = new Dialog(R.string.resize_images, "resizing-images-canvases/#resize-images")
var widthEdit, heightEdit, resolutionEdit, resampleList

dialog.vgroup(function(main) {
  main.alignChildren = "right"
  main.hgroup(function(group) {
    group.tooltips(R.string.tip_resizeimages_width)
    group.leftStaticText(undefined, R.string.width)
    widthEdit = group.editText(SIZE_INPUT, formatUnits(document.width, unitName, 2)).also(function(it) {
      it.validateUnits()
      it.activate()
    })
  })
  main.hgroup(function(group) {
    group.tooltips(R.string.tip_resizeimages_height)
    group.leftStaticText(undefined, R.string.height)
    heightEdit = group.editText(SIZE_INPUT, formatUnits(document.height, unitName, 2)).also(VALIDATE_UNITS)
  })
  main.hgroup(function(group) {
    group.tooltips(R.string.tip_resizeimages_resolution)
    group.leftStaticText(undefined, R.string.resolution)
    resolutionEdit = group.editText(SIZE_INPUT, document.resolution.toString()).also(VALIDATE_UNITS)
  })
  main.hgroup(function(group) {
    group.tooltips(R.string.tip_resizeimages_resample)
    group.leftStaticText(undefined, R.string.resample)
    resampleList = group.dropDownList(SIZE_INPUT, listResamples()).also(function(it) {
      it.selection = 0
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
dialog.setYesButton(R.string.all, function() {
  var width = new UnitValue(widthEdit.text)
  var height = new UnitValue(heightEdit.text)
  var resolution = parseInt(resolutionEdit.text)
  var method = getResampleMethod()
  var progress = new ProgressDialog(app.documents.length, R.string.resizing)

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
  switch (resampleList.selection.index) {
    case 0:
      return ResampleMethod.BICUBIC
    case 1:
      return ResampleMethod.BICUBICSHARPER
    case 2:
      return ResampleMethod.BICUBICSMOOTHER
    case 3:
      return ResampleMethod.BILINEAR
    case 4:
      return ResampleMethod.NEARESTNEIGHBOR
    default:
      return ResampleMethod.NONE
  }
}
