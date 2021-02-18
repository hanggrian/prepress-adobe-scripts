function FilePickerPanel(dialog, parent, title, fileFilters, allowFolder) {
    var self = this
    this.main = parent.addVPanel('Source', 'right')

    this.file = null
    
    this.fileText = this.main.addText([0, 0, 200, 21], '-')
    this.buttons = this.main.addHGroup()
    if (fileFilters != null) {
        this.buttons.addButton(undefined, 'Open File', function() {
            var result = openFile(title, fileFilters)
            if (result != null) {
                dialog.positiveButton.enabled = true
                self.file = result
                self.isFolder = false
                updateText()
            }
        })
    }
    if (allowFolder !== undefined && allowFolder) {
        this.buttons.addButton(undefined, 'Open Folder', function() {
            var result = openFolder(title)
            if (result != null) {
                dialog.positiveButton.enabled = true
                self.file = result
                self.isFolder = true
                updateText()
            }
        })
    }
    this.main.setTooltip('Source can be PDF file or directory of images.')

    function updateText() {
        self.fileText.text = unescape(self.file.name)
        self.fileText.setTooltip(unescape(self.file.fullName))
    }
}