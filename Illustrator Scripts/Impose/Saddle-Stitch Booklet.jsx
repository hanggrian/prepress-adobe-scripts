// Work in progress

#target Illustrator
#include '../.lib/sui.js'

var dialog = new Dialog('Impose Saddle-Stich Booklet')
var file

var textBounds = [0, 0, 60, 21]

dialog.file = dialog.main.addHGroup()
dialog.file.addText(textBounds, 'File:', 'right')
dialog.file.alignChildren = 'top'
dialog.file1 = dialog.file.addVGroup()
dialog.file1.alignChildren = 'left'
dialog.fileText = dialog.file1.addText([0, 0, 200, 21], '-')
dialog.file2 = dialog.file1.addHGroup()
dialog.file2.addButton(undefined, 'Browse File', function() { browse(false) })
dialog.file2.addButton(undefined, 'Browse Folder', function() { browse(true) })

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    
})
dialog.show()

function browse(isFolder) {
    file = isFolder
        ? Folder.selectDialog(dialog.title)
        : File.openDialog(dialog.title)
    if (file != null) {
        dialog.fileText.text = unescape(file.name)
        dialog.fileText.helpTip = unescape(file.fullName)
        dialog.file.setTooltip(unescape(file.fullName))
    }
}