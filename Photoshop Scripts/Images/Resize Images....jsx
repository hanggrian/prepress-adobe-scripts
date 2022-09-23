/*
<javascriptresource>
<name>Resize Images...</name>
<category>2</category>
<enableinfo>true</enableinfo>
</javascriptresource>
*/

#target Photoshop
#include "../.lib/commons.js"

var Resample = new Enum({
  BICUBIC: { name: R.string.bicubic, value: ResampleMethod.BICUBIC },
  BICUBIC_SHARPER: { name: R.string.bicubic_sharper, value: ResampleMethod.BICUBICSHARPER },
  BICUBIC_SMOOTHER: { name: R.string.bicubic_smoother, value: ResampleMethod.BICUBICSMOOTHER },
  BILINEAR: { name: R.string.bilinear, value: ResampleMethod.BILINEAR },
  NEAREST_NEIGHBOR: { name: R.string.nearest_neighbor, value: ResampleMethod.NEARESTNEIGHBOR },
  NONE: { name: R.string.string, value: ResampleMethod.NONE }
})

var SIZE_INPUT = [180, 21]

var dialog = new Dialog(R.string.resize_images, "resizing-images-canvases/#resize-images")
var widthEdit, heightEdit, resolutionEdit, resampleList

dialog.vgroup(function(main) {
  main.alignChildren = "right"
  main.hgroup(function(group) {
    group.leftStaticText(undefined, R.string.width)
    widthEdit = group.editText(SIZE_INPUT, formatUnits(document.width, unitName, 2)).also(function(it) {
      it.validateUnits()
      it.activate()
    })
  })
  main.hgroup(function(group) {
    group.leftStaticText(undefined, R.string.height)
    heightEdit = group.editText(SIZE_INPUT, formatUnits(document.height, unitName, 2)).also(VALIDATE_UNITS)
  })
  main.hgroup(function(group) {
    group.helpTips = R.string.tip_resizeimages_resolution
    group.leftStaticText(undefined, R.string.resolution)
    resolutionEdit = group.editText(SIZE_INPUT, document.resolution.toString()).also(VALIDATE_UNITS)
  })
  main.hgroup(function(group) {
    group.helpTips = R.string.tip_resizeimages_resample
    group.leftStaticText(undefined, R.string.resample)
    resampleList = group.dropDownList(SIZE_INPUT, Resample.list()).also(function(it) {
      it.selection = 0
    })
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var width = new UnitValue(widthEdit.text)
  var height = new UnitValue(heightEdit.text)
  var resolution = parseInt(resolutionEdit.text)
  var method = Resample.valueOf(resampleList.selection)

  process(document, width, height, resolution, method)
})
dialog.setYesButton(R.string.all, function() {
  var width = new UnitValue(widthEdit.text)
  var height = new UnitValue(heightEdit.text)
  var resolution = parseInt(resolutionEdit.text)
  var method = Resample.valueOf(resampleList.selection)
  var progress = new ProgressPalette(app.documents.length, R.string.resizing)

  Collections.forEach(app.documents, function(document) {
    progress.increment()
    process(document, width, height, resolution, method)
  })
})
dialog.show()

function process(document, width, height, resolution, method) {
  app.activeDocument = document
  document.resizeImage(width, height, resolution, method.value)
}
