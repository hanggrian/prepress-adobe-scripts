var SIZE_DOCUMENT_INPUT = [120, 21]
var SIZE_DOCUMENT_INPUT2 = [70, 21]
var SIZE_DOCUMENT_INPUTMAX = [120 + 70 + 10, 21]

/**
 * @param {PDFBoxType} pdfBoxType determine how to crop newly placed PDF.
 */
var PDFCrop = new Enum({
  BOUNDING: { name: "Bounding", pdfBoxType: PDFBoxType.PDFBOUNDINGBOX },
  ART: { name: "Art", pdfBoxType: PDFBoxType.PDFARTBOX },
  CROP: { name: "Crop", pdfBoxType: PDFBoxType.PDFCROPBOX },
  TRIM: { name: "Trim", pdfBoxType: PDFBoxType.PDFTRIMBOX },
  BLEED: { name: "Bleed", pdfBoxType: PDFBoxType.PDFBLEEDBOX },
  MEDIA: { name: "Media", pdfBoxType: PDFBoxType.PDFMEDIABOX }
}, [0])

/**
 * @param {DocumentColorSpace} colorMode used to determine new document's color space.
 */
var DocumentColor = new Enum({
  RGB: { name: "RGB", colorMode: DocumentColorSpace.RGB },
  CMYK: { name: "CMYK", colorMode: DocumentColorSpace.CMYK }
})

/**
 * @param {DocumentRasterResolution} rasterResolution used to determine new document's resolution.
 */
var DocumentResolution = new Enum({
  SCREEN: { name: R.string.screen, rasterResolution: DocumentRasterResolution.ScreenResolution },
  MEDIUM: { name: R.string.medium, rasterResolution: DocumentRasterResolution.MediumResolution },
  HIGH: { name: R.string.high, rasterResolution: DocumentRasterResolution.HighResolution }
})

/**
 * @param {DocumentArtboardLayout} artboardLayout used to determine new document's artboard layout.
 */
var DocumentLayout = new Enum({
  GRID_BY_ROW: { name: R.string.grid_by_row, artboardLayout: DocumentArtboardLayout.GridByRow },
  GRID_BY_COLUMN: { name: R.string.grid_by_column, artboardLayout: DocumentArtboardLayout.GridByCol },
  ROW: { name: R.string.row, artboardLayout: DocumentArtboardLayout.Row },
  COLUMN: { name: R.string.column, artboardLayout: DocumentArtboardLayout.Column },
  RTL_GRID_BY_ROW: { name: R.string.rtl_grid_by_row, artboardLayout: DocumentArtboardLayout.RLGridByRow },
  RTL_GRID_BY_COLUMN: { name: R.string.rtl_grid_by_column, artboardLayout: DocumentArtboardLayout.RLGridByCol },
  RTL_ROW: { name: R.string.rtl_row, artboardLayout: DocumentArtboardLayout.RLRow }
})

/**
 * PDF placing option panel.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {Array} inputSize size or bounds.
 */
function OpenPDFPanel(parent, inputSize) {
  var self = parent.vpanel(R.string.pdf_box)
  self.boxTypeList

  self.alignChildren = "right"
  self.alignment = "fill"
  self.hgroup(function(group) {
    group.helpTips = R.string.tip_cropto
    group.leftStaticText(undefined, R.string.crop_to)
    self.boxTypeList = group.dropDownList(inputSize, PDFCrop.list()).also(function(it) {
      if (preferences.getPDFCrop() === PDFBoxType.PDFARTBOX) {
        it.selection = 2
      } else if (preferences.getPDFCrop() === PDFBoxType.PDFCROPBOX) {
        it.selection = 3
      } else if (preferences.getPDFCrop() === PDFBoxType.PDFTRIMBOX) {
        it.selection = 4
      } else if (preferences.getPDFCrop() === PDFBoxType.PDFBLEEDBOX) {
        it.selection = 5
      } else if (preferences.getPDFCrop() === PDFBoxType.PDFMEDIABOX) {
        it.selection = 6
      } else {
        it.selection = 0
      }
      it.onChange = function() {
        var pdfOption = PDFCrop.valueOf(self.boxTypeList.selection)
        if (pdfOption === PDFCrop.ART) {
          preferences.setPDFCrop(PDFBoxType.PDFARTBOX)
        } else if (pdfOption ===  PDFCrop.CROP) {
          preferences.setPDFCrop(PDFBoxType.PDFCROPBOX)
        } else if (pdfOption === PDFCrop.TRIM) {
          preferences.setPDFCrop(PDFBoxType.PDFTRIMBOX)
        } else if (pdfOption === PDFCrop.BLEED) {
          preferences.setPDFCrop(PDFBoxType.PDFBLEEDBOX)
        } else if (pdfOption === PDFCrop.MEDIA) {
          preferences.setPDFCrop(PDFBoxType.PDFMEDIABOX)
        } else {
          preferences.setPDFCrop(PDFBoxType.PDFBOUNDINGBOX)
        }
      }
    })
  })
  return self
}

/**
 * Impose pages option panel.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {Array} inputSize size or bounds.
 */
function OpenPagesPanel(parent, inputSize) {
  var self = parent.vpanel(R.string.pages)
  self.rangeGroup, self.widthEdit, self.heightEdit, self.bleedEdit

  self.alignChildren = "right"
  self.alignment = "fill"
  self.hgroup(function(group) {
    group.helpTips = R.string.tip_openpages_pages
    group.leftStaticText(undefined, R.string.pages)
    self.rangeGroup = new RangeGroup(group, inputSize)
  })
  self.hgroup(function(group) {
    group.helpTips = R.string.tip_openpages_width
    group.leftStaticText(undefined, R.string.width)
    self.widthEdit = group.editText(inputSize, "210 mm").also(VALIDATE_UNITS)
  })
  self.hgroup(function(group) {
    group.helpTips = R.string.tip_openpages_height
    group.leftStaticText(undefined, R.string.height)
    self.heightEdit = group.editText(inputSize, "297 mm").also(VALIDATE_UNITS)
  })
  self.hgroup(function(group) {
    group.helpTips = R.string.tip_openpages_bleed
    group.leftStaticText(undefined, R.string.bleed)
    self.bleedEdit = group.editText(inputSize, "0 mm").also(VALIDATE_UNITS)
  })

  /**
   * Returns width input.
   * @return {Number}
   */
  self.getWidth = function() { return parseUnits(self.widthEdit.text) }

  /**
   * Returns height input.
   * @return {Number}
   */
  self.getHeight = function() { return parseUnits(self.heightEdit.text) }

  /**
   * Returns bleed input.
   * @return {Number}
   */
  self.getBleed = function() { return parseUnits(self.bleedEdit.text) }

  return self
}

/**
 * Impose document option panel.
 * @param {Group|Panel|Window} parent holder of this control.
 */
function OpenDocumentPanel(parent) {
  var self = parent.vpanel(R.string.document)
  self.modeList, self.resolutionList
  self.layoutList, self.rowsOrColsEdit, self.unitsList
  self.spacingEdit
  self.previewDefaultRadio, self.previewPixelRadio, self.previewOverprintRadio

  self.alignChildren = "right"
  self.alignment = "fill"
  self.hgroup(function(group) {
    group.helpTips = R.string.tip_opendocuments_colormode
    group.leftStaticText(undefined, R.string.color_mode)
    self.modeList = group.dropDownList(SIZE_DOCUMENT_INPUT, DocumentColor.list()).also(function(it) {
      it.selection = 1
    })
    self.resolutionList = group.dropDownList(SIZE_DOCUMENT_INPUT2, DocumentResolution.list()).also(function(it) {
      it.selection = 2
    })
  })
  self.hgroup(function(group) {
    group.helpTips = R.string.tip_opendocuments_layout
    group.leftStaticText(undefined, R.string.layout)
    self.layoutList = group.dropDownList(SIZE_DOCUMENT_INPUT, DocumentLayout.list()).also(function(it) {
      it.selection = 0
    })
    self.rowsOrColsEdit = group.editText(SIZE_DOCUMENT_INPUT2, "2").also(VALIDATE_DIGITS)
  })
  self.hgroup(function(group) {
    group.helpTips = R.string.tip_opendocuments_units
    group.leftStaticText(undefined, R.string.units)
    self.unitsList = group.dropDownList(SIZE_DOCUMENT_INPUTMAX, UnitType.list()).also(function(it) {
      it.selection = 3
    })
  })
  self.hgroup(function(group) {
    group.helpTips = R.string.tip_opendocuments_spacing
    group.leftStaticText(undefined, R.string.spacing)
    self.spacingEdit = group.editText(SIZE_DOCUMENT_INPUTMAX, "10 mm").also(VALIDATE_UNITS)
  })
  self.hgroup(function(group) {
    group.alignChildren = "bottom"
    group.helpTips = R.string.tip_opendocuments_previewmode
    group.leftStaticText(undefined, R.string.preview_mode)
    self.previewDefaultRadio = group.radioButton(undefined, "Default").also(SELECTED)
    self.previewPixelRadio = group.radioButton(undefined, "Pixel")
    self.previewOverprintRadio = group.radioButton(undefined, "Overprint")
  })

  /**
   * Create a new document with specific preset.
   * @param {String} title document's name.
   * @param {Number} pages number of artboards.
   * @param {Number} width each artboard's width.
   * @param {Number} height each artboard's height.
   * @param {Number} bleed document's bleed.
   * @return {Document}
   */
  self.open = function(title, pages, width, height, bleed) {
    return app.documents.addDocument(DocumentPresetType.Print, new DocumentPreset().also(function(preset) {
      preset.title = title
      preset.numArtboards = pages
      preset.width = width
      preset.height = height
      if (bleed > 0) {
        preset.documentBleedLink = true
        preset.documentBleedOffset = [bleed, bleed, bleed, bleed]
      }
      preset.colorMode = DocumentColor.valueOf(self.modeList.selection).colorMode
      preset.rasterResolution = DocumentResolution.valueOf(self.resolutionList.selection).rasterResolution
      preset.artboardLayout = DocumentLayout.valueOf(self.layoutList.selection).artboardLayout
      preset.artboardRowsOrCols = parseInt(self.rowsOrColsEdit.text)
      preset.units = UnitType.valueOf(self.unitsList.selection).rulerUnits
      preset.artboardSpacing = parseUnits(self.spacingEdit.text)
      if (self.previewDefaultRadio.value) {
        preset.previewMode = DocumentPreviewMode.DefaultPreview
      } else if (self.previewPixelRadio.value) {
        preset.previewMode = DocumentPreviewMode.PixelPreview
      } else {
        preset.previewMode = DocumentPreviewMode.OverprintPreview
      }
    }))
  }

  return self
}
