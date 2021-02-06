// Work in progress

#target Illustrator
#include '../.lib/core.js'
#include '../.lib/picker.js'

var dialog = new Dialog('Impose Saddle-Stich Booklet')
var picker = new Picker(dialog.title, [
    ['Adobe Illustrator', 'ai'],
    ['Adobe PDF', 'pdf']
], true)

var textBounds = [0, 0, 45, 21]
var editBounds = [0, 0, 100, 21]

dialog.source = picker.getGroup(dialog.main, textBounds)

dialog.bleed = dialog.main.addHGroup()
dialog.bleed.addText(textBounds, 'Bleed:', 'right')
dialog.bleedText = dialog.bleed.addEditText(editBounds, '0 mm')
dialog.bleedText.validateUnits()

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    app.documents.add(DocumentColorSpace.CMYK,
        imposer.getPageWidth() * 2,
        imposer.getPageHeight() * 2)
})
dialog.show()