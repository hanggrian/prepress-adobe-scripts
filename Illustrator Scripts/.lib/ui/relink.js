var PDF_BOX_TYPES = ['Bounding', '-', 'Art', 'Crop', 'Trim', 'Bleed', 'Media']

function RelinkPDFPanel(parent, textBounds, editBounds) {
    var self = this
    this.boxTypeList

    this.main = parent.vpanel('PDF Options', function(panel) {
        panel.alignChildren = 'fill'
        panel.hgroup(function(group) {
            group.staticText(textBounds, 'Crop to:', JUSTIFY_RIGHT)
            self.boxTypeList = group.dropDownList(editBounds, PDF_BOX_TYPES, function(it) {
                it.selection = PDF_BOX_TYPES.indexOf('Bounding')
            })
            group.setTooltip('Which box should be used when placing a pdf document.')
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

function RelinkDimensionPanel(parent) {
    var self = this
    this.dimensionCheck

    this.main = parent.vpanel('Dimension', function(group) {
        group.alignChildren = 'fill'
        self.dimensionCheck = group.checkBox(undefined, 'Maintain size & position')
        group.setTooltip('Keep current dimension after relinking.')
    })

    this.isMaintain = function() {
        return self.dimensionCheck.value
    }
}