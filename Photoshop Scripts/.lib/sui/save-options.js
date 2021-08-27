/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

function SaveFilePanel(parent, textBounds, extension) {
    var self = this
    this.fileTimestampCheck, this.fileExtensionCheck

    this.main = parent.vpanel('File', function(panel) {
        panel.alignChildren = 'fill'
        panel.hgroup(function(group) {
            group.tips('Optional properties that will determine output file name')
            group.staticText(textBounds, 'File Name:').also(JUSTIFY_RIGHT)
            self.fileTimestampCheck = group.checkBox(undefined, 'Timestamp')
            self.fileExtensionCheck = group.checkBox(undefined, 'Extension').also(SELECTED)
        })
    })

    this.getFileName = function(name) {
        return buildString(function(it) {
            if (self.fileTimestampCheck.value) {
                it.append(new Date().toISOString() + ' ')
            }
            it.append(name)
            if (self.fileExtensionCheck.value) {
                it.append('.' + extension)
            }
        })
    }
}

function SaveDirectoryGroup(parent, editBounds) {
    var self = this
    this.directoryEdit, this.directoryButton

    this.main = parent.hgroup(function(group) {
        group.tips('Where to save files?')
        group.staticText(undefined, 'Export to:')
        self.directoryEdit = group.editText(editBounds, '~/Desktop')
        self.directoryButton = group.iconButton([21, 21], 'ic_folder.png', { style: 'toolbutton' }).also(function(it) {
            it.onClick = function() {
                self.directoryEdit.text = openFolder().fullName
            }
        })
    })

    this.getDirectoryName = function() { return self.directoryEdit.text }

    this.browse = function() { new File(self.getDirectoryName()).execute() }
}