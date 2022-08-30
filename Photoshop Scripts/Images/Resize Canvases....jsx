/*
<javascriptresource>
<name>Resize Canvases...</name>
<category>2</category>
<enableinfo>true</enableinfo>
</javascriptresource>
*/

#target Photoshop
#include "../.lib/commons.js"

var SIZE_INPUT = [100, 21]

var dialog = new Dialog(R.string.resize_canvases, "resizing-images-canvases/#resize-canvases")
var widthEdit, heightEdit, anchorGroup

dialog.hgroup(function(main) {
  main.alignChildren = "fill"
  main.vpanel(R.string.canvas, function(panel) {
    panel.alignChildren = "right"
    panel.hgroup(function(group) {
      group.tooltips(R.string.tip_resizecanvases_width)
      group.leftStaticText(undefined, R.string.width)
      widthEdit = group.editText(SIZE_INPUT, formatUnits(document.width, unitName, 2)).also(function(it) {
        it.validateUnits()
        it.activate()
      })
    })
    panel.hgroup(function(group) {
      group.tooltips(R.string.tip_resizecanvases_height)
      group.leftStaticText(undefined, R.string.height)
      heightEdit = group.editText(SIZE_INPUT, formatUnits(document.height, unitName, 2)).also(VALIDATE_UNITS)
    })
  })
  main.vpanel(R.string.anchor, function(panel) {
    anchorGroup = new AnchorGroup(panel, true)
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var width = new UnitValue(widthEdit.text)
  var height = new UnitValue(heightEdit.text)
  var anchor = anchorGroup.getAnchorPosition()

  process(document, width, height, anchor)
})
dialog.setYesButton(R.string.all, function() {
  var width = new UnitValue(widthEdit.text)
  var height = new UnitValue(heightEdit.text)
  var anchor = anchorGroup.getAnchorPosition()
  var progress = new ProgressDialog(app.documents.length, R.string.resizing)

  Collections.forEach(app.documents, function(document) {
    progress.increment()
    process(document, width, height, anchor)
  })
})
dialog.show()

function process(document, width, height, anchor) {
  app.activeDocument = document
  document.resizeCanvas(width, height, anchor)
}
