function ImposePanel(parent, textBounds, editBounds) {
    var self = this
    this.unitsList, this.pagesEdit, this.widthEdit, this.heightEdit
    
    this.main = parent.vpanel('Impose Options', function(panel) {
        panel.hgroup(function(group) {
            group.staticText(textBounds, 'Units:', JUSTIFY_RIGHT)
            self.unitsList = group.dropDownList(editBounds, UNITS, function(it) {
                it.selection = UNITS.indexOf('Millimeters')
            })
            group.setTooltip('Ruler units for the new document.')
        })
    
        panel.hgroup(function(group) {
            group.staticText(textBounds, 'Pages:', JUSTIFY_RIGHT)
            self.pagesEdit = group.editText(editBounds, '4', function(it) {
                it.validateDigits()
                it.active = true
            })
            group.setTooltip('Number of pages.')
        })
    
        panel.hgroup(function(group) {
            group.staticText(textBounds, 'Width:', JUSTIFY_RIGHT)
            self.widthEdit = group.editText(editBounds, '210 mm', VALIDATE_UNITS)
        })
    
        panel.hgroup(function(group) {
            group.staticText(textBounds, 'Height:', JUSTIFY_RIGHT)
            self.heightEdit = group.editText(editBounds, '297 mm', VALIDATE_UNITS)
        })
    })

    this.getUnits = function() {
        return parseRulerUnits(self.unitsList.selection.text)
    }

    this.getPages = function() {
        return parseUnits(self.pagesEdit.text)
    }

    this.getWidth = function() {
        return parseUnits(self.widthEdit.text)
    }

    this.getHeight = function() {
        return parseUnits(self.heightEdit.text)
    }

    /**
     * @param {String} title default new document name, may be null.
     * @param {Number} bleed area around artboard, may be null.
     * @returns 
     */
    this.getDocumentPreset = function(title, bleed) {
        var preset = new DocumentPreset()
        if (title !== undefined) {
            preset.title = title
        }
        preset.units = self.getUnits()
        preset.width = self.getWidth() * 2
        preset.height = self.getHeight()
        preset.numArtboards = self.getPages() / 2
        preset.rasterResolution = DocumentRasterResolution.HighResolution
        if (bleed !== undefined && bleed > 0) {
            preset.documentBleedLink = true
            preset.documentBleedOffset = [bleed, bleed, bleed, bleed]
        }
        return preset
    }
}