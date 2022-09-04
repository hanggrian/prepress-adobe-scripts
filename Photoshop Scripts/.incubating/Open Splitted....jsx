/*
<javascriptresource>
<category>1</category>
</javascriptresource>
*/

#target Photoshop
#include "../.lib/core.js"

var SIZE_TEXT = [60, 21]
var SIZE_EDIT = [100, 21]

var dialog = new Dialog("Open Splitted")
var documentPanel

var files = FilePicker.openFile(dialog.getTitle(), [
  ["Adobe Illustrator", "AI"],
  ["Adobe PDF", "PDF"],
  ["BMP", "BMP"],
  ["GIF89a", "GIF"],
  ["JPEG", "JPG", "JPE", "JPEG"],
  ["JPEG2000", "JPF", "JPX", "JP2", "J2K", "J2C", "JPC"],
  ["PNG", "PNG", "PNS"],
  ["Photoshop", "PSD", "PSB", "PDD"],
  ["TIFF", "TIF", "TIFF"]
], true)

if (files !== null && Collections.isNotEmpty(files)) {
  if (Collections.isNotEmpty(Collections.filter(files, function(it) { return it.isPdf() }))) {
    check(files.length === 1, "Only supports single PDF file")
  }

  /* dialog.main.vpanel("Split Options", function(panel) {
      panel.hgroup(function(group) {
          group.helpTips = "Divide image horizontally/vertically"
          group.staticText(SIZE_TEXT, "Direction:").also(JUSTIFY_RIGHT)
          group.vgroup(function(group2) {
              group2.alignChildren = "left"
              horizontalRadio = group2.radioButton(undefined, "Horizontal").also(SELECTED)
              verticalRadio = group2.radioButton(undefined, "Vertical")
          })
      })
      panel.hgroup(function(group) {
          group.helpTips = "Total number of divison"
          group.staticText(SIZE_TEXT, "Parts:").also(JUSTIFY_RIGHT)
          partsEdit = group.editText(SIZE_EDIT, "2").also(function(it) {
              it.validateDigits()
              it.activate()
          })
      })
  }) */
  documentPanel = new OpenDocumentPanel(dialog.main, SIZE_TEXT, SIZE_EDIT)

  dialog.setCancelButton()
  dialog.setDefaultButton(undefined, function() {
    var parts = parseInt(partsEdit.text) || 2
    Collections.forEach(files, function(file) {
      repeat(parts, function(i) {
        app.load(file)
      })
    })
  })
  dialog.show()
}
