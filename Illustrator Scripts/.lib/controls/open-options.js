var SIZE_DOCUMENT_INPUT = [120, 21]
var SIZE_DOCUMENT_INPUT2 = [70, 21]
var SIZE_DOCUMENT_INPUTMAX = [120 + 70 + 10, 21]

var OpenPages = {
  PDF_BOXES: ["Bounding", "-", "Art", "Crop", "Trim", "Bleed", "Media"]
}
var OpenDocuments = {
  COLOR_MODES: ["RGB", "CMYK"],
  listResolutions: function() {
    return [
      R.string.screen,
      R.string.medium,
      R.string.high
    ]
  },
  listLayouts: function() {
    return [
      R.string.grid_by_row,
      R.string.grid_by_column,
      R.string.row,
      R.string.column,
      R.string.rtl_grid_by_row,
      R.string.rtl_grid_by_column,
      R.string.rtl_row
    ]
  }
}

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
    group.tooltips(R.string.tip_cropto)
    group.leftStaticText(undefined, R.string.crop_to)
    self.boxTypeList = group.dropDownList(inputSize, OpenPages.PDF_BOXES).also(function(it) {
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
        if (self.boxTypeList.selection.text === "Art") {
          preferences.setPDFCrop(PDFBoxType.PDFARTBOX)
        } else if (self.boxTypeList.selection.text === "Crop") {
          preferences.setPDFCrop(PDFBoxType.PDFCROPBOX)
        } else if (self.boxTypeList.selection.text === "Trim") {
          preferences.setPDFCrop(PDFBoxType.PDFTRIMBOX)
        } else if (self.boxTypeList.selection.text === "Bleed") {
          preferences.setPDFCrop(PDFBoxType.PDFBLEEDBOX)
        } else if (self.boxTypeList.selection.text === "Media") {
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
    group.tooltips(R.string.tip_openpages_pages)
    group.leftStaticText(undefined, R.string.pages)
    self.rangeGroup = new RangeGroup(group, inputSize)
  })
  self.hgroup(function(group) {
    group.tooltips(R.string.tip_openpages_width)
    group.leftStaticText(undefined, R.string.width)
    self.widthEdit = group.editText(inputSize, "210 mm").also(VALIDATE_UNITS)
  })
  self.hgroup(function(group) {
    group.tooltips(R.string.tip_openpages_height)
    group.leftStaticText(undefined, R.string.height)
    self.heightEdit = group.editText(inputSize, "297 mm").also(VALIDATE_UNITS)
  })
  self.hgroup(function(group) {
    group.tooltips(R.string.tip_openpages_bleed)
    group.leftStaticText(undefined, R.string.bleed)
    self.bleedEdit = group.editText(inputSize, "0 mm").also(VALIDATE_UNITS)
  })

  /**
   * Returns width input.
   * @returns {Number}
   */
  self.getWidth = function() { return parseUnits(self.widthEdit.text) }

  /**
   * Returns height input.
   * @returns {Number}
   */
  self.getHeight = function() { return parseUnits(self.heightEdit.text) }

  /**
   * Returns bleed input.
   * @returns {Number}
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
    group.tooltips(R.string.tip_opendocuments_colormode)
    group.leftStaticText(undefined, R.string.color_mode)
    self.modeList = group.dropDownList(SIZE_DOCUMENT_INPUT, OpenDocuments.COLOR_MODES).also(function(it) {
      it.selection = 1
    })
    self.resolutionList = group.dropDownList(SIZE_DOCUMENT_INPUT2, OpenDocuments.listResolutions()).also(function(it) {
      it.selection = 2
    })
  })
  self.hgroup(function(group) {
    group.tooltips(R.string.tip_opendocuments_layout)
    group.leftStaticText(undefined, R.string.layout)
    self.layoutList = group.dropDownList(SIZE_DOCUMENT_INPUT, OpenDocuments.listLayouts()).also(function(it) {
      it.selection = 0
    })
    self.rowsOrColsEdit = group.editText(SIZE_DOCUMENT_INPUT2, "2").also(VALIDATE_DIGITS)
  })
  self.hgroup(function(group) {
    group.tooltips(R.string.tip_opendocuments_units)
    group.leftStaticText(undefined, R.string.units)
    self.unitsList = group.dropDownList(SIZE_DOCUMENT_INPUTMAX, Units.list()).also(function(it) {
      it.selection = 3
    })
  })
  self.hgroup(function(group) {
    group.tooltips(R.string.tip_opendocuments_spacing)
    group.leftStaticText(undefined, R.string.spacing)
    self.spacingEdit = group.editText(SIZE_DOCUMENT_INPUTMAX, "10 mm").also(VALIDATE_UNITS)
  })
  self.hgroup(function(group) {
    group.alignChildren = "bottom"
    group.tooltips(R.string.tip_opendocuments_previewmode)
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
   * @returns
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
      switch (self.modeList.selection.index) {
        case 0:
          preset.colorMode = DocumentColorSpace.RGB
          break;
        default:
          preset.colorMode = DocumentColorSpace.CMYK
          break;
      }
      switch (self.resolutionList.selection.index) {
        case 0:
          preset.rasterResolution = DocumentRasterResolution.ScreenResolution
          break;
        case 1:
          preset.rasterResolution = DocumentRasterResolution.MediumResolution
          break;
        default:
          preset.rasterResolution = DocumentRasterResolution.HighResolution
          break;
      }
      switch (self.layoutList.selection.index) {
        case 0:
          preset.artboardLayout = DocumentArtboardLayout.GridByRow
          break;
        case 1:
          preset.artboardLayout = DocumentArtboardLayout.GridByCol
          break;
        case 2:
          preset.artboardLayout = DocumentArtboardLayout.Row
          break;
        case 3:
          preset.artboardLayout = DocumentArtboardLayout.Column
          break;
        case 4:
          preset.artboardLayout = DocumentArtboardLayout.RLGridByRow
          break;
        case 5:
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
    }))
  }

  return self
}
