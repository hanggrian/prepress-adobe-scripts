function SelectDimensionPanel(parent, textBounds, editBounds) {
    var self = this
    this.widthEdit, this.heightEdit

    this.main = parent.vpanel('Dimension', function(panel) {
        panel.hgroup(function(group) {
            group.tips("Selected object's width")
            group.staticText(textBounds, 'Width:').also(JUSTIFY_RIGHT)
            self.widthEdit = group.editText(editBounds).also(VALIDATE_UNITS)
        })
        panel.hgroup(function(group) {
            group.tips("Selected object's height")
            group.staticText(textBounds, 'Height:').also(JUSTIFY_RIGHT)
            self.heightEdit = group.editText(editBounds).also(VALIDATE_UNITS)
        })
    })

    this.getWidth = function() { return parseUnits(self.widthEdit.text) }

    this.getHeight = function() { return parseUnits(self.heightEdit.text) }
}

function showSelectHelp() {
    var dialog = new Dialog('Help')
    dialog.vgroup(function(main) {
        main.staticText(undefined,
            'When nothing is selected, this script will select all items with requested types.\n\n' +
            'When there are selection, it will instead filter the selection to only match requested types.',
            { multiline: true })
    })
    dialog.setCancelButton('Close')
    dialog.show()
    return true
}