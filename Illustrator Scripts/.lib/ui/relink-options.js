var PDF_BOX_TYPES = ['Bounding', '-', 'Art', 'Crop', 'Trim', 'Bleed', 'Media']

function PdfOptionsPanel(parent, textBounds, editBounds, showPage) {
    var self = this
    this.main = parent.addVPanel('PDF Options', 'fill')

    this.boxType = this.main.addHGroup()
    this.boxType.addText(textBounds, 'Crop to:', 'right')
    this.boxTypeList = this.boxType.addDropDown(editBounds, PDF_BOX_TYPES)
    this.boxTypeList.selection = 0
    this.boxType.setTooltip('Which box should be used when placing a multipage document.')

    if (showPage) {
        this.page = this.main.addHGroup()
        this.page.addText(textBounds, 'Page:', 'right')
        this.pageEdit = this.page.addEditText(editBounds, '1')
        this.pageEdit.validateDigits()
        this.page.setTooltip('What page should be used when opening a multipage document.')
    }

    this.getBoxType = function() {
        switch (self.boxTypeList.selection.text) {
            case 'Bounding Box':
                return PDFBoxType.PDFBOUNDINGBOX
            case 'Art':
                return PDFBoxType.PDFARTBOX
            case 'Crop':
                return PDFBoxType.PDFCROPBOX
            case 'Trim':
                return PDFBoxType.PDFTRIMBOX
            case 'Bleed':
                return PDFBoxType.PDFBLEEDBOX
            default:
                return PDFBoxType.PDFMEDIABOX
        }
    }

    this.getPage = function() {
        return parseInt(self.pageEdit.text) || 1
    }
}

function MultipageOptionsPanel(parent, textBounds, editBounds) {
    var self = this
    this.main = parent.addVPanel('Multipage Options', 'fill')

    this.startPage = this.main.addHGroup()
    this.startPage.addText(textBounds, 'Start page:', 'right')
    this.startPageEdit = this.startPage.addEditText(editBounds, '1')
    this.startPageEdit.validateDigits()
    this.startPage.setTooltip('Starting page of PDF file or folder of images.')

    this.endPage = this.main.addHGroup()
    this.endPage.addText(textBounds, 'End page:', 'right')
    this.endPageEdit = this.endPage.addEditText(editBounds)
    this.endPageEdit.validateDigits()
    this.endPageEdit.active = true
    this.endPage.setTooltip('Starting page of PDF file or folder of images.')

    this.getStartPage = function() {
        return parseInt(self.startPageEdit.text) || 1
    }

    this.getEndPage = function() {
        return parseInt(self.endPageEdit.text) || 1
    }
}