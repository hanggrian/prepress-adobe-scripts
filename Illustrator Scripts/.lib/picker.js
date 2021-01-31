function Picker(title, fileFilters, allowFolder) {
    var self = this

    this.file = null
    this.isFolder = null
    this.fileText = null

    this.getGroup = function(parent, textBounds) {
        var picker = parent.addHGroup()
        picker.addText(textBounds, 'Source:', 'right')
        picker.alignChildren = 'top'
        picker.column = picker.addVGroup()
        picker.column.alignChildren = 'left'
        self.fileText = picker.column.addText([0, 0, 200, 21], '-')
        picker.row2 = picker.column.addHGroup()
        picker.row2.addButton(undefined, 'Open File', function() {
            var result = openFile(title, fileFilters)
            if (result != null) {
                self.file = result
                self.isFolder = false
                updateText()
            }
        })
        if (allowFolder !== undefined && allowFolder) {
            picker.row2.addButton(undefined, 'Open Folder', function() {
                var result = openFolder(title)
                if (result != null) {
                    self.file = result
                    self.isFolder = true
                    updateText()
                }
            })
        }
        picker.setTooltip('Source can be PDF file or directory of images.')
        return picker
    }

    function updateText() {
        self.fileText.text = unescape(self.file.name)
        self.fileText.helpTip = unescape(self.file.fullName)
    }
}