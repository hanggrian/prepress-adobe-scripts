var OPEN_PDFBOXTYPES = ['Bounding', '-', 'Art', 'Crop', 'Trim', 'Bleed', 'Media']

function OpenPDFOptionsPanel(parent, textBounds, editBounds) {
    var self = this
    this.boxTypeList

    this.main = parent.vpanel('PDF Options', function(panel) {
        panel.alignChildren = 'fill'
        panel.hgroup(function(group) {
            group.setHelpTips('Which box should be used when placing a pdf document.')
            group.staticText(textBounds, 'Crop to:', JUSTIFY_RIGHT)
            self.boxTypeList = group.dropDownList(editBounds, OPEN_PDFBOXTYPES, function(it) {
                it.selection = OPEN_PDFBOXTYPES.indexOf('Bounding')
            })
        })
    })

    this.getBoxType = function() {
        switch (self.boxTypeList.selection.text) {
            case 'Art':
                return PDFBoxType.PDFARTBOX
            case 'Crop':
                return PDFBoxType.PDFCROPBOX
            case 'Trim':
                return PDFBoxType.PDFTRIMBOX
            case 'Bleed':
                return PDFBoxType.PDFBLEEDBOX
            case 'Media':
                return PDFBoxType.PDFMEDIABOX
            default:
                return PDFBoxType.PDFBOUNDINGBOX
        }
    }
}

function OpenDocumentOptionsPanel(parent, textBounds, editBounds) {
    var self = this
    this.unitsList, this.pagesEdit, this.widthEdit, this.heightEdit
    
    this.main = parent.vpanel('Document Options', function(panel) {
        panel.hgroup(function(group) {
            group.setHelpTips('Ruler units for the new document.')
            group.staticText(textBounds, 'Units:', JUSTIFY_RIGHT)
            self.unitsList = group.dropDownList(editBounds, UNITS, function(it) {
                it.selection = UNITS.indexOf('Millimeters')
            })
        })
    
        panel.hgroup(function(group) {
            group.setHelpTips('Number of pages.')
            group.staticText(textBounds, 'Pages:', JUSTIFY_RIGHT)
            self.pagesEdit = group.editText(editBounds, '4', function(it) {
                it.validateDigits()
                it.activate()
            })
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
     * @return {Document}
     */
    this.impose = function(title, bleed) {
        return app.documents.addDocument(DocumentPresetType.Print, new DocumentPreset().let(function(it) {
            if (title !== undefined) {
                it.title = title
            }
            it.units = self.getUnits()
            it.width = self.getWidth() * 2
            it.height = self.getHeight()
            it.numArtboards = self.getPages() / 2
            it.rasterResolution = DocumentRasterResolution.HighResolution
            if (bleed !== undefined && bleed > 0) {
                preset.documentBleedLink = true
                preset.documentBleedOffset = [bleed, bleed, bleed, bleed]
            }
            return it
        }))
    }
}