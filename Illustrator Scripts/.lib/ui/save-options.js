var BOUNDS_SAVE_FILE = [40, 21]

function SaveFilePanel(parent, extension) {
    var self = this
    this.rangeGroup, this.fileEdit, this.extensionCheck

    parent.vpanel('File', function(panel) {
        panel.alignChildren = 'fill'
        self.rangeGroup = new RangeGroup(panel, BOUNDS_SAVE_FILE, [100, 21]).also(function(it) {
            it.startEdit.activate()
            it.maxRange = document.artboards.length
            it.endEdit.text = document.artboards.length
        })
        panel.hgroup(function(group) {
            group.setTooltips('File name')
            group.staticText(BOUNDS_SAVE_FILE, 'Name:', JUSTIFY_RIGHT)
            self.fileEdit = group.editText([200, 21], document.name.substringBeforeLast('.'))
        })
        self.extensionCheck = panel.checkBox(undefined, 'Use extension', SELECTED)
    })

    this.getFileName = function() {
        var fileName = self.fileEdit.text
        if (self.extensionCheck.value) {
            fileName += '.' + extension
        }
        return fileName
    }
}

function SaveDirectoryGroup(parent, editBounds) {
    var self = this
    this.directoryEdit, this.directoryButton

    this.main = parent.hgroup(function(group) {
        group.setTooltips('Where to save files?')
        group.image([21, 21], getResource('round_folder_white_18dp.png'))
        self.directoryEdit = group.editText(editBounds, '~/Desktop')
        self.directoryButton = group.button([30, 21], '...', function(it) {
            it.onClick = function() {
                self.directoryEdit.text = openFolder().fullName
            }
        })
    })

    this.getDirectoryName = function() {
        return self.directoryEdit.text
    }

    this.browse = function() {
        new File(self.getDirectoryName()).execute()
    }
}