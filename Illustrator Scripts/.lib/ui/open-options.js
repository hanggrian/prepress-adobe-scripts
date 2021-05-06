var OPEN_PDFBOXTYPES = ['Bounding', '-', 'Art', 'Crop', 'Trim', 'Bleed', 'Media']
var OPEN_DOCUMENTMODES = ['RGB', 'CMYK']
var OPEN_DOCUMENTRESOLUTIONS = ['Screen', 'Medium', 'High']
var OPEN_DOCUMENTLAYOUTS = ['Grid by Row', 'Grid by Column', 'Row', 'Column', 'RTL Grid by Row', 'RTL Grid by Column', 'RTL Row']
var OPEN_DOCUMENTPREVIEWMODES = ['Default', 'Pixel', 'Overprint']

var BOUNDS_DOCUMENT_TEXT = [85, 21]
var BOUNDS_DOCUMENT_EDIT = [125, 21]
var BOUNDS_DOCUMENT_EDIT2 = [75, 21]
var BOUNDS_DOCUMENT_EDITMAX = [125 + 75 + 10, 21]

function OpenPDFPanel(parent, textBounds, editBounds) {
    var self = this
    this.boxTypeList

    this.main = parent.vpanel('Place PDF', function(panel) {
        panel.alignChildren = 'fill'
        panel.hgroup(function(group) {
            group.setHelpTips('Which box should be used when placing a pdf document.')
            group.staticText(textBounds, 'Crop to:', JUSTIFY_RIGHT)
            self.boxTypeList = group.dropDownList(editBounds, OPEN_PDFBOXTYPES, function(it) {
                var prefill
                if (preferences.getPDFCrop() === PDFBoxType.PDFARTBOX) {
                    prefill = 'Art'
                } else if (preferences.getPDFCrop() === PDFBoxType.PDFCROPBOX) {
                    prefill = 'Crop'
                } else if (preferences.getPDFCrop() === PDFBoxType.PDFTRIMBOX) {
                    prefill = 'Trim'
                } else if (preferences.getPDFCrop() === PDFBoxType.PDFBLEEDBOX) {
                    prefill = 'Bleed'
                } else if (preferences.getPDFCrop() === PDFBoxType.PDFMEDIABOX) {
                    prefill = 'Media'
                } else {
                    prefill = 'Bounding'
                }
                it.selection = OPEN_PDFBOXTYPES.indexOf(prefill)
                it.onChange = function() {
                    if (self.boxTypeList.selection.text === 'Art') {
                        preferences.setPDFCrop(PDFBoxType.PDFARTBOX)
                    } else if (self.boxTypeList.selection.text === 'Crop') {
                        preferences.setPDFCrop(PDFBoxType.PDFCROPBOX)
                    } else if (self.boxTypeList.selection.text === 'Trim') {
                        preferences.setPDFCrop(PDFBoxType.PDFTRIMBOX)
                    } else if (self.boxTypeList.selection.text === 'Bleed') {
                        preferences.setPDFCrop(PDFBoxType.PDFBLEEDBOX)
                    } else if (self.boxTypeList.selection.text === 'Media') {
                        preferences.setPDFCrop(PDFBoxType.PDFMEDIABOX)
                    } else {
                        preferences.setPDFCrop(PDFBoxType.PDFBOUNDINGBOX)
                    }
                }
            })
        })
    })
}

function OpenPagesPanel(parent, textBounds, editBounds) {
    var self = this
    this.rangeGroup, this.widthEdit, this.heightEdit, this.bleedEdit

    this.main = parent.vpanel('Pages', function(panel) {
        panel.alignChildren = 'fill'
        self.rangeGroup = new RangeGroup(panel, textBounds, editBounds)
        panel.hgroup(function(group) {
            group.staticText(textBounds, 'Width:', JUSTIFY_RIGHT)
            self.widthEdit = group.editText(editBounds, '210 mm', VALIDATE_UNITS)
        })
        panel.hgroup(function(group) {
            group.staticText(textBounds, 'Height:', JUSTIFY_RIGHT)
            self.heightEdit = group.editText(editBounds, '297 mm', VALIDATE_UNITS)
        })
        panel.hgroup(function(group) {
            group.staticText(textBounds, 'Bleed:', JUSTIFY_RIGHT)
            self.bleedEdit = group.editText(editBounds, '0 mm', VALIDATE_UNITS)
        })
    })
    
    this.getPages = function() { return parseInt(self.pagesEdit.text) }
    this.getWidth = function() { return parseUnits(self.widthEdit.text) }
    this.getHeight = function() { return parseUnits(self.heightEdit.text) }
    this.getBleed = function() { return parseUnits(self.bleedEdit.text) }
}

function OpenDocumentPanel(parent) {
    var self = this
    this.modeList, this.resolutionList
    this.layoutList, this.rowsOrColsEdit,
    this.unitsList
    this.spacingEdit
    this.previewDefaultRadio, this.previewPixelRadio, this.previewOverprintRadio

    this.main = parent.vpanel('Document Preset', function(panel) {
        panel.alignChildren = 'fill'
        panel.hgroup(function(group) {
            group.setHelpTips('The color mode and resolution for the new document.')
            group.staticText(BOUNDS_DOCUMENT_TEXT, 'Color Mode:', JUSTIFY_RIGHT)
            self.modeList = group.dropDownList(BOUNDS_DOCUMENT_EDIT, OPEN_DOCUMENTMODES, function(it) {
                it.selection = OPEN_DOCUMENTMODES.indexOf('CMYK')
            })
            self.resolutionList = group.dropDownList(BOUNDS_DOCUMENT_EDIT2, OPEN_DOCUMENTRESOLUTIONS, function(it) {
                it.selection = OPEN_DOCUMENTRESOLUTIONS.indexOf('High')
            })
        })
        panel.hgroup(function(group) {
            group.setHelpTips('Layout for artboards.')
            group.staticText(BOUNDS_DOCUMENT_TEXT, 'Layout:', JUSTIFY_RIGHT)
            self.layoutList = group.dropDownList(BOUNDS_DOCUMENT_EDIT, OPEN_DOCUMENTLAYOUTS, function(it) {
                it.selection = OPEN_DOCUMENTLAYOUTS.indexOf('Grid by Row')
            })
            self.rowsOrColsEdit = group.editText(BOUNDS_DOCUMENT_EDIT2, '2', VALIDATE_DIGITS)
        })
        panel.hgroup(function(group) {
            group.setHelpTips('The units for the new document.')
            group.staticText(BOUNDS_DOCUMENT_TEXT, 'Units:', JUSTIFY_RIGHT)
            self.unitsList = group.dropDownList(BOUNDS_DOCUMENT_EDITMAX, UNITS, function(it) {
                it.selection = UNITS.indexOf('Millimeters')
            })
        })
        panel.hgroup(function(group) {
            group.setHelpTips('Spacing between artboards.')
            group.staticText(BOUNDS_DOCUMENT_TEXT, 'Spacing:', JUSTIFY_RIGHT)
            self.spacingEdit = group.editText(BOUNDS_DOCUMENT_EDITMAX, '10 mm', function(it) {
                it.validateUnits()
            })
        })
        panel.hgroup(function(group) {
            group.setHelpTips('The preview mode for the new document.')
            group.staticText(BOUNDS_DOCUMENT_TEXT, 'Preview Mode:', JUSTIFY_RIGHT)
            self.previewDefaultRadio = group.radioButton(undefined, 'Default', SELECTED)
            self.previewPixelRadio = group.radioButton(undefined, 'Pixel')
            self.previewOverprintRadio = group.radioButton(undefined, 'Overprint')
        })
    })
    
    this.open = function(title, pages, width, height, bleed) {
        return app.documents.addDocument(DocumentPresetType.Print, new DocumentPreset().let(function(preset) {
            preset.title = title
            preset.numArtboards = pages
            preset.width = width
            preset.height = height
            if (bleed > 0) {
                preset.documentBleedLink = true
                preset.documentBleedOffset = [bleed, bleed, bleed, bleed]
            }
            switch(self.modeList.selection.text) {
                case 'RGB':
                    preset.colorMode = DocumentColorSpace.RGB
                    break;
                default:
                    preset.colorMode = DocumentColorSpace.CMYK
                    break;
            }
            switch(self.resolutionList.selection.text) {
                case 'Screen':
                    preset.rasterResolution = DocumentRasterResolution.ScreenResolution
                    break;
                case 'Medium':
                    preset.rasterResolution = DocumentRasterResolution.MediumResolution
                    break;
                default:
                    preset.rasterResolution = DocumentRasterResolution.HighResolution
                    break;
            }
            switch (self.layoutList.selection.text) {
                case 'Grid by Row':
                    preset.artboardLayout = DocumentArtboardLayout.GridByRow
                    break;
                case 'Grid by Column':
                    preset.artboardLayout = DocumentArtboardLayout.GridByCol
                    break;
                case 'Row':
                    preset.artboardLayout = DocumentArtboardLayout.Row
                    break;
                case 'Column':
                    preset.artboardLayout = DocumentArtboardLayout.Column
                    break;
                case 'RTL Grid by Row':
                    preset.artboardLayout = DocumentArtboardLayout.RLGridByRow
                    break;
                case 'RTL Grid by Column':
                    preset.artboardLayout = DocumentArtboardLayout.RLGridByCol
                    break;
                default:
                    preset.artboardLayout = DocumentArtboardLayout.RLRow
                    break;
            }
            preset.artboardRowsOrCols = parseInt(self.rowsOrColsEdit.text)
            preset.units = parseRulerUnits(self.unitsList.selection.text)
            preset.artboardSpacing = parseUnits(self.spacingEdit.text)
            if (self.previewDefaultRadio.value) {
                preset.previewMode = DocumentPreviewMode.DefaultPreview
            } else if (self.previewPixelRadio.value) {
                preset.previewMode = DocumentPreviewMode.PixelPreview
            } else {
                preset.previewMode = DocumentPreviewMode.OverprintPreview
            }
            return preset
        }))
    }
}