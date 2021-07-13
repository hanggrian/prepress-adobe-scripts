function SelectDimensionPanel(parent, textBounds, editBounds) {
    var self = this
    this.widthEdit, this.heightEdit

    this.main = parent.vpanel('Dimension', function(panel) {
        panel.hgroup(function(group) {
            group.setTooltips("Selected object's width")
            group.staticText(textBounds, 'Width:', JUSTIFY_RIGHT)
            self.widthEdit = group.editText(editBounds, undefined, VALIDATE_UNITS)
        })
        panel.hgroup(function(group) {
            group.setTooltips("Selected object's height")
            group.staticText(textBounds, 'Height:', JUSTIFY_RIGHT)
            self.heightEdit = group.editText(editBounds, undefined, VALIDATE_UNITS)
        })
    })

    this.getWidth = function() {
        return parseUnits(self.widthEdit.text)
    }

    this.getHeight = function() {
        return parseUnits(self.heightEdit.text)
    }
}