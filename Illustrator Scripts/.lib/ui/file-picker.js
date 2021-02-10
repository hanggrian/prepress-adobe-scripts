function FilePicker(parent, textBounds, title, fileFilters, allowFolder) {
    var self = this
    var main = parent.addHGroup()
    
    main.addText(textBounds, 'Source:', 'right')
    main.alignChildren = 'top'
    main.column = main.addVGroup()
    main.column.alignChildren = 'left'
    this.fileText = main.column.addText([0, 0, 200, 21], '-')
    main.row2 = main.column.addHGroup()
    if (fileFilters != null) {
        main.row2.addButton(undefined, 'Open File', function() {
            var result = openFile(title, fileFilters)
            if (result != null) {
                self.file = result
                self.isFolder = false
                updateText()
            }
        })
    }
    if (allowFolder !== undefined && allowFolder) {
        main.row2.addButton(undefined, 'Open Folder', function() {
            var result = openFolder(title)
            if (result != null) {
                self.file = result
                self.isFolder = true
                updateText()
            }
        })
    }
    main.setTooltip('Source can be PDF file or directory of images.')

    function updateText() {
        self.fileText.text = unescape(self.file.name)
        self.fileText.helpTip = unescape(self.file.fullName)
    }
}