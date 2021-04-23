function OpenDocumentOptionsPanel(parent, textBounds, editBounds) {
    var self = this
    this.widthEdit, this.heightEdit
    
    this.main = parent.vpanel('Document Options', function(panel) {
        panel.hgroup(function(group) {
            group.staticText(textBounds, 'Width:', JUSTIFY_RIGHT)
            self.widthEdit = group.editText(editBounds, '210 mm', function(it) {
                it.validateDigits()
                it.activate()
            })
        })
    
        panel.hgroup(function(group) {
            group.staticText(textBounds, 'Height:', JUSTIFY_RIGHT)
            self.heightEdit = group.editText(editBounds, '297 mm', VALIDATE_UNITS)
        })
    })

    this.getWidth = function() {
        return parseUnits(self.widthEdit.text)
    }

    this.getHeight = function() {
        return parseUnits(self.heightEdit.text)
    }

    this.open = function(title) {
        return app.documents.add(self.getWidth(), self.getHeight(), 300, title, NewDocumentMode.CMYK)
    }
}