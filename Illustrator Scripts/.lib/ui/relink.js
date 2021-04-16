var PDF_BOX_TYPES = ['Bounding', '-', 'Art', 'Crop', 'Trim', 'Bleed', 'Media']

function RelinkPDFPanel(parent, textBounds, editBounds) {
    var self = this
    this.main = parent.addVPanel('PDF Options', 'fill')

    this.boxType = this.main.addHGroup()
    this.boxType.addText(textBounds, 'Crop to:', 'right')
    this.boxTypeList = this.boxType.addDropDown(editBounds, PDF_BOX_TYPES)
    this.boxTypeList.selection = PDF_BOX_TYPES.indexOf('Bounding')
    this.boxType.setTooltip('Which box should be used when placing a pdf document.')

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
    this.main = parent.addVPanel('Dimension', 'fill')

    this.dimensionCheck = this.main.addCheckBox(undefined, 'Maintain size & position')
    this.main.setTooltip('Keep current dimension after relinking.')

    this.isMaintain = function() {
        return self.dimensionCheck.value
    }
}