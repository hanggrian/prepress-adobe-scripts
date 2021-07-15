function SaveFilePanel(parent, textBounds, extension) {
    var self = this
    this.artboardsAllRadio, this.artboardsRangeRadio, this.rangeGroup
    this.fileTimestampCheck, this.fileExtensionCheck

    this.main = parent.vpanel('File', function(panel) {
        panel.alignChildren = 'fill'
        panel.hgroup(function(group) {
            group.tips('Which artboards to export')
            group.staticText(textBounds, 'Artboards:').also(JUSTIFY_RIGHT)
            self.artboardsAllRadio = group.radioButton(undefined, 'All').also(function(it) {
                it.select()
                it.onClick = function() {
                    self.rangeGroup.main.enabled = false
                }
            })
            self.artboardsRangeRadio = group.radioButton(undefined, 'Range').also(function(it) {
                it.onClick = function() {
                    self.rangeGroup.main.enabled = true
                    self.rangeGroup.startEdit.activate()
                }
            })
            self.rangeGroup = new RangeGroup(group, [100, 21]).also(function(it) {
                it.main.enabled = false
                it.maxRange = document.artboards.length
                it.endEdit.text = document.artboards.length
            })
        })
        panel.hgroup(function(group) {
            group.tips('Optional properties that will determine output file name')
            group.staticText(textBounds, 'File Name:').also(JUSTIFY_RIGHT)
            self.fileTimestampCheck = group.checkBox(undefined, 'Timestamp')
            self.fileExtensionCheck = group.checkBox(undefined, 'Extension').also(SELECTED)
        })
    })

    this.isAllArtboards = function() {
        return self.artboardsAllRadio.value
    }

    this.getFileName = function(name) {
        return buildString(function(it) {
            if (self.fileTimestampCheck.value) {
                it.append('000000 ')
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
        group.image([21, 21], getResource('round_folder_white_18dp.png'))
        self.directoryEdit = group.editText(editBounds, '~/Desktop')
        self.directoryButton = group.button([30, 21], '...').also(function(it) {
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