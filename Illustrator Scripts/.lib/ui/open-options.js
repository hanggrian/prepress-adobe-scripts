var OPEN_PDFBOXTYPES = ['Bounding', '-', 'Art', 'Crop', 'Trim', 'Bleed', 'Media']
var OPEN_DOCUMENTMODES = ['RGB', 'CMYK']
var OPEN_DOCUMENTRESOLUTIONS = ['Screen', 'Medium', 'High']
var OPEN_DOCUMENTLAYOUTS = ['Grid by Row', 'Grid by Column', 'Row', 'Column', 'RTL Grid by Row', 'RTL Grid by Column', 'RTL Row']
var OPEN_DOCUMENTPREVIEWMODES = ['Default', 'Pixel', 'Overprint']

function OpenPDFPanel(parent, textBounds, editBounds) {
    var self = this
    this.boxTypeList

    this.main = parent.vpanel('Place PDF', function(panel) {
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

function OpenDocumentGroup(parent, textBounds, editBounds) {
    var self = this
    this.pagesEdit
    this.pageWidthEdit
    this.pageHeightEdit
    this.pageBleedEdit
    this.documentModeList, this.documentResolutionList
    this.documentLayoutList, this.documentRowsOrColsText, this.documentRowsOrColsEdit
    this.documentUnitsList, this.documentSpacingEdit
    this.documentPreviewModeList

    this.main = parent.hgroup(function(mainGroup) {
        mainGroup.vpanel('Pages', function(panel) {
            mainGroup.alignChildren = 'fill'
            panel.hgroup(function(group) {
                group.staticText(textBounds, 'Total:', JUSTIFY_RIGHT)
                self.pagesEdit = group.editText(editBounds, undefined, function(it) {
                    it.validateDigits()
                    it.activate()
                })
            })
            panel.hgroup(function(group) {
                group.staticText(textBounds, 'Width:', JUSTIFY_RIGHT)
                self.pageWidthEdit = group.editText(editBounds, '210 mm', VALIDATE_UNITS)
            })
            panel.hgroup(function(group) {
                group.staticText(textBounds, 'Height:', JUSTIFY_RIGHT)
                self.pageHeightEdit = group.editText(editBounds, '297 mm', VALIDATE_UNITS)
            })
            panel.hgroup(function(group) {
                group.staticText(textBounds, 'Bleed:', JUSTIFY_RIGHT)
                self.pageBleedEdit = group.editText(editBounds, '0 mm', VALIDATE_UNITS)
            })
        })
        mainGroup.vpanel('Document Preset', function(panel) {
            panel.alignChildren = 'right'
            panel.hgroup(function(group) {
                group.staticText(textBounds, 'Color Mode:', JUSTIFY_RIGHT)
                self.documentModeList = group.dropDownList(editBounds, OPEN_DOCUMENTMODES, function(it) {
                    it.helpTip = 'The color mode for the new document.'
                    it.selection = OPEN_DOCUMENTMODES.indexOf('CMYK')
                })
                group.staticText(textBounds, 'Resolution:', JUSTIFY_RIGHT)
                self.documentResolutionList = group.dropDownList(editBounds, OPEN_DOCUMENTRESOLUTIONS, function(it) {
                    it.helpTip = 'The raster resolution for the new document.'
                    it.selection = OPEN_DOCUMENTRESOLUTIONS.indexOf('High')
                })
            })
            panel.hgroup(function(group) {
                group.staticText(textBounds, 'Layout:', JUSTIFY_RIGHT)
                self.documentLayoutList = group.dropDownList(editBounds, OPEN_DOCUMENTLAYOUTS, function(it) {
                    it.helpTip = 'Layout for artboards.'
                    it.selection = OPEN_DOCUMENTLAYOUTS.indexOf('Grid by Row')
                    it.onChange = function() {
                        self.documentRowsOrColsText.text = it.selection.text.substringAfterLast(' ') + 's:'
                    }
                })
                self.documentRowsOrColsText = group.staticText(textBounds, 'Rows:', JUSTIFY_RIGHT)
                self.documentRowsOrColsEdit = group.editText(editBounds, '2', VALIDATE_DIGITS)
            })
            panel.hgroup(function(group) {
                group.staticText(textBounds, 'Units:', JUSTIFY_RIGHT)
                self.documentUnitsList = group.dropDownList(editBounds, UNITS, function(it) {
                    it.helpTip = 'The units for the new document.'
                    it.selection = UNITS.indexOf('Millimeters')
                })
                group.staticText(textBounds, 'Spacing:', JUSTIFY_RIGHT)
                self.documentSpacingEdit = group.editText(editBounds, '10 mm', function(it) {
                    it.helpTip = 'Spacing between artboards.'
                    it.validateUnits()
                })
            })
            panel.hgroup(function(group) {
                group.staticText(undefined, 'Preview Mode:', JUSTIFY_RIGHT)
                self.documentPreviewModeList = group.dropDownList(editBounds, OPEN_DOCUMENTPREVIEWMODES, function(it) {
                    it.helpTip = 'The preview mode for the new document.'
                    it.selection = OPEN_DOCUMENTPREVIEWMODES.indexOf('Default')
                })
            })
        })
    })

    this.getPages = function() { return parseInt(self.pagesEdit.text) }
    this.getPageWidth = function() { return parseUnits(self.pageWidthEdit.text) }
    this.getPageHeight = function() { return parseUnits(self.pageHeightEdit.text) }
    this.getPageBleed = function() { return parseUnits(self.pageBleedEdit.text) }
    this.getPreset = function() {
        return new DocumentPreset().let(function(preset) {
            preset.numArtboards = self.getPages()
            preset.width = self.getPageWidth()
            preset.height = self.getPageHeight()
            self.getPageBleed().let(function(bleed) {
                bleed = parseInt(bleed)
                if (bleed > 0) {
                    preset.documentBleedLink = true
                    preset.documentBleedOffset = [bleed, bleed, bleed, bleed]
                }
            })
            switch(self.documentModeList.selection.text) {
                case 'RGB':
                    preset.colorMode = DocumentColorSpace.RGB
                    break;
                default:
                    preset.colorMode = DocumentColorSpace.CMYK
                    break;
            }
            switch(self.documentResolutionList.selection.text) {
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
            switch (self.documentLayoutList.selection.text) {
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
            preset.artboardRowsOrCols = parseInt(self.documentRowsOrColsEdit.text)
            preset.units = parseRulerUnits(self.documentUnitsList.selection.text)
            preset.spacing = parseUnits(self.documentSpacingEdit.text)
            switch(self.documentPreviewModeList.selection.text) {
                case 'Default':
                    preset.previewMode = DocumentPreviewMode.DefaultPreview
                    break;
                case 'Pixel':
                    preset.previewMode = DocumentPreviewMode.PixelPreview
                    break;
                default:
                    preset.previewMode = DocumentPreviewMode.OverprintPreview
                    break;
            }
            return preset
        })
    }
}