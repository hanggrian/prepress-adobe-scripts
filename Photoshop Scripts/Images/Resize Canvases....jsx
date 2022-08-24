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

var dialog = new Dialog("Resize Canvases", "resizing-images-canvases/#resize-canvases")
var widthEdit, heightEdit, anchorGroup

dialog.hgroup(function(main) {
  main.alignChildren = "fill"
  main.vpanel("Canvas", function(panel) {
    panel.alignChildren = "right"
    panel.hgroup(function(group) {
      group.tooltips("Canvases' new width")
      group.staticText(undefined, "Width:").also(JUSTIFY_RIGHT)
      widthEdit = group.editText(SIZE_INPUT, formatUnits(document.width, unitName, 2)).also(function(it) {
        it.validateUnits()
        it.activate()
      })
    })
    panel.hgroup(function(group) {
      group.tooltips("Canvases' new height")
      group.staticText(undefined, "Height:").also(JUSTIFY_RIGHT)
      heightEdit = group.editText(SIZE_INPUT, formatUnits(document.height, unitName, 2)).also(VALIDATE_UNITS)
    })
  })
  main.vpanel("Anchor", function(panel) {
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
dialog.setYesButton("All", function() {
  var width = new UnitValue(widthEdit.text)
  var height = new UnitValue(heightEdit.text)
  var anchor = anchorGroup.getAnchorPosition()
  var progress = new ProgressDialog(app.documents.length, "Resizing")

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
