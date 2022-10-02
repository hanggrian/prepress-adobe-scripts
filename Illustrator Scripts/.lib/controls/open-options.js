var SIZE_DOCUMENT_INPUT = [120, 21]
var SIZE_DOCUMENT_INPUT2 = [80, 21]
var SIZE_DOCUMENT_CHECK = [70, 14]

var PDFCrop = new Enum({
  BOUNDING: { name: "Bounding", value: PDFBoxType.PDFBOUNDINGBOX },
  ART: { name: "Art", value: PDFBoxType.PDFARTBOX },
  CROP: { name: "Crop", value: PDFBoxType.PDFCROPBOX },
  TRIM: { name: "Trim", value: PDFBoxType.PDFTRIMBOX },
  BLEED: { name: "Bleed", value: PDFBoxType.PDFBLEEDBOX },
  MEDIA: { name: "Media", value: PDFBoxType.PDFMEDIABOX }
}, [0])

var DocumentPreset2 = new Enum({
  MOBILE: { name: "Mobile", value: DocumentPresetType.Mobile },
  WEB: { name: "Web", value: DocumentPresetType.Web },
  PRINT: { name: "Print", value: DocumentPresetType.Print },
  VIDEO: { name: "Video", value: DocumentPresetType.Video }
})

var DocumentColor = new Enum({
  RGB: { name: "RGB", value: DocumentColorSpace.RGB },
  CMYK: { name: "CMYK", value: DocumentColorSpace.CMYK }
})

var DocumentResolution = new Enum({
  SCREEN: { name: R.string.screen, value: DocumentRasterResolution.ScreenResolution },
  MEDIUM: { name: R.string.medium, value: DocumentRasterResolution.MediumResolution },
  HIGH: { name: R.string.high, value: DocumentRasterResolution.HighResolution }
})

var DocumentLayout = new Enum({
  GRID_BY_ROW: { name: R.string.grid_by_row, value: DocumentArtboardLayout.GridByRow },
  GRID_BY_COLUMN: { name: R.string.grid_by_column, value: DocumentArtboardLayout.GridByCol },
  ROW: { name: R.string.row, value: DocumentArtboardLayout.Row },
  COLUMN: { name: R.string.column, value: DocumentArtboardLayout.Column },
  RTL_GRID_BY_ROW: { name: R.string.rtl_grid_by_row, value: DocumentArtboardLayout.RLGridByRow },
  RTL_GRID_BY_COLUMN: { name: R.string.rtl_grid_by_column, value: DocumentArtboardLayout.RLGridByCol },
  RTL_ROW: { name: R.string.rtl_row, value: DocumentArtboardLayout.RLRow }
})

var DocumentPreview = new Enum({
  DEFAULT: { name: "Default", value: DocumentPreviewMode.DefaultPreview },
  PIXEL: { name: "Pixel", value: DocumentPreviewMode.PixelPreview },
  OVERPRINT: { name: "Overprint", value: DocumentPreviewMode.OverprintPreview }
})

/**
 * PDF placing option panel.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {Array} inputSize size or bounds, may be null.
 */
function OpenPDFPanel(parent, inputSize) {
  checkNotNull(parent)

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
      it.addChangeListener(function() {
        preferences.setPDFCrop(PDFCrop.valueOf(self.boxTypeList.selection).value)
      })
    })
  })
  return self
}

/**
 * Impose pages option panel.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {Array} inputSize size or bounds, may be null.
 */
function OpenPagesPanel(parent, inputSize) {
  checkNotNull(parent)

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
    group.leftStaticText(undefined, R.string.width)
    self.widthEdit = group.editText(inputSize, "210 mm").also(VALIDATE_UNITS)
  })
  self.hgroup(function(group) {
    group.leftStaticText(undefined, R.string.height)
    self.heightEdit = group.editText(inputSize, "297 mm").also(VALIDATE_UNITS)
  })
  self.hgroup(function(group) {
    group.helpTips = R.string.tip_openpages_bleed
    group.leftStaticText(undefined, R.string.bleed)
    self.bleedEdit = group.editText(inputSize, "0 mm").also(VALIDATE_UNITS)
  })

  /**
   * Returns width input added with horizontal bleed.
   * @return {Number}
   */
  self.getWidth = function() { return parseUnits(self.widthEdit.text) }

  /**
   * Returns height input added with vertical bleed.
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
  checkNotNull(parent)

  var self = parent.vpanel(R.string.document)
  self.widthEdit, self.heightEdit, self.unitsList, self.layoutList, self.previewModeList
  self.presetTypeList, self.colorModeList, self.resolutionList, self.columnEdit, self.spacingEdit

  self.alignChildren = "right"
  self.alignment = "fill"

  self.hgroup(function(rootGroup) {
    rootGroup.vgroup(function(topGroup) {
      topGroup.alignChildren = "right"
      topGroup.hgroup(function(group) {
        group.leftStaticText(undefined, R.string.width)
        self.widthEdit = group.editText(SIZE_DOCUMENT_INPUT, "0 mm").also(VALIDATE_UNITS)
      })
      topGroup.hgroup(function(group) {
        group.leftStaticText(undefined, R.string.height)
        self.heightEdit = group.editText(SIZE_DOCUMENT_INPUT, "0 mm").also(VALIDATE_UNITS)
      })
      topGroup.hgroup(function(group) {
        group.helpTips = R.string.tip_opendocuments_units
        group.leftStaticText(undefined, R.string.units)
        self.unitsList = group.dropDownList(SIZE_DOCUMENT_INPUT, UnitType.list()).also(function(it) {
          it.selection = 3
        })
      })
      topGroup.hgroup(function(group) {
        group.helpTips = R.string.tip_opendocuments_layout
        group.leftStaticText(undefined, R.string.layout)
        self.layoutList = group.dropDownList(SIZE_DOCUMENT_INPUT, DocumentLayout.list()).also(function(it) {
          it.selection = 0
        })
      })
      topGroup.hgroup(function(group) {
        group.helpTips = R.string.tip_opendocuments_previewmode
        group.leftStaticText(undefined, R.string.preview_mode)
        self.previewModeList = group.dropDownList(SIZE_DOCUMENT_INPUT, DocumentPreview.list()).also(function(it) {
          it.selection = 0
        })
      })
    })
    rootGroup.vgroup(function(topGroup) {
      topGroup.alignChildren = "right"
      topGroup.hgroup(function(group) {
        group.helpTips = R.string.tip_opendocuments_preset
        group.leftStaticText(undefined, R.string.preset_type)
        self.presetTypeList = group.dropDownList(SIZE_DOCUMENT_INPUT2, DocumentPreset2.list()).also(function(it) {
          it.selection = 2
        })
      })
      topGroup.hgroup(function(group) {
        group.helpTips = R.string.tip_opendocuments_colormode
        group.leftStaticText(undefined, R.string.color_mode)
        self.colorModeList = group.dropDownList(SIZE_DOCUMENT_INPUT2, DocumentColor.list()).also(function(it) {
          it.selection = 1
        })
      })
      topGroup.hgroup(function(group) {
        group.helpTips = R.string.tip_opendocuments_resolution
        group.leftStaticText(undefined, R.string.resolution)
        self.resolutionList = group.dropDownList(SIZE_DOCUMENT_INPUT2, DocumentResolution.list()).also(function(it) {
          it.selection = 2
        })
      })
      topGroup.hgroup(function(group) {
        group.helpTips = R.string.tip_opendocuments_column
        group.leftStaticText(undefined, R.string.column)
        self.columnEdit = group.editText(SIZE_DOCUMENT_INPUT2, "2").also(VALIDATE_DIGITS)
      })
      topGroup.hgroup(function(group) {
        group.helpTips = R.string.tip_opendocuments_spacing
        group.leftStaticText(undefined, R.string.spacing)
        self.spacingEdit = group.editText(SIZE_DOCUMENT_INPUT2, "10 mm").also(VALIDATE_UNITS)
      })
    })
  })

  /**
   * Returns document's width.
   * @return {Number}
   */
  self.getWidth = function() { return parseUnits(self.widthEdit.text) || 0 }

  /**
   * Returns document's width.
   * @return {Number}
   */
  self.getHeight = function() { return parseUnits(self.heightEdit.text) || 0 }

  /**
   * Change document's width.
   * @return {String}
   */
  self.setWidthText = function(widthText) { return self.widthEdit.text = checkNotNull(widthText) }

  /**
   * Change document's height.
   * @return {String}
   */
  self.setHeightText = function(heightText) { return self.heightEdit.text = checkNotNull(heightText) }

  /**
   * Create a new document with specific preset.
   * @param {String} title document's name.
   * @param {Number} pages number of artboards.
   * @return {Document}
   */
  self.create = function(title, pages) {
    checkNotNull(title)
    checkNotNull(pages)
    var presetType = DocumentPreset2.valueOf(self.presetTypeList.selection)
    return app.documents.addDocument(presetType.value, new DocumentPreset().also(function(preset) {
      preset.title = title
      preset.numArtboards = pages
      preset.width = self.getWidth()
      preset.height = self.getHeight()
      preset.colorMode = DocumentColor.valueOf(self.colorModeList.selection).value
      preset.rasterResolution = DocumentResolution.valueOf(self.resolutionList.selection).value
      preset.artboardLayout = DocumentLayout.valueOf(self.layoutList.selection).value
      preset.artboardRowsOrCols = parseInt(self.columnEdit.text)
      preset.units = UnitType.valueOf(self.unitsList.selection).rulerUnits
      preset.artboardSpacing = parseUnits(self.spacingEdit.text)
      preset.previewMode = DocumentPreview.valueOf(self.previewModeList.selection).value
    }))
  }

  return self
}
