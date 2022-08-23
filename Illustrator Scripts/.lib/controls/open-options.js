var OPEN_PDFBOXTYPES = ["Bounding", "-", "Art", "Crop", "Trim", "Bleed", "Media"]
var OPEN_DOCUMENTMODES = ["RGB", "CMYK"]
var OPEN_DOCUMENTRESOLUTIONS = ["Screen", "Medium", "High"]
var OPEN_DOCUMENTLAYOUTS = ["Grid by Row", "Grid by Column", "Row", "Column", "RTL Grid by Row", "RTL Grid by Column", "RTL Row"]
var OPEN_DOCUMENTPREVIEWMODES = ["Default", "Pixel", "Overprint"]
var SIZE_DOCUMENT_INPUT = [120, 21]
var SIZE_DOCUMENT_INPUT2 = [70, 21]
var SIZE_DOCUMENT_INPUTMAX = [120 + 70 + 10, 21]

/**
 * PDF placing option panel.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {Array} inputSize size or bounds.
 */
function OpenPDFPanel(parent, inputSize) {
  var self = this
  this.boxTypeList

  this.main = parent.vpanel("PDF Box", function(panel) {
    panel.alignChildren = "right"
    panel.hgroup(function(group) {
      group.tooltips("Which box should be used when placing a pdf document")
      group.staticText(undefined, "Crop to:").also(JUSTIFY_RIGHT)
      self.boxTypeList = group.dropDownList(inputSize, OPEN_PDFBOXTYPES).also(function(it) {
        var prefill
        if (preferences.getPDFCrop() === PDFBoxType.PDFARTBOX) {
          prefill = "Art"
        } else if (preferences.getPDFCrop() === PDFBoxType.PDFCROPBOX) {
          prefill = "Crop"
        } else if (preferences.getPDFCrop() === PDFBoxType.PDFTRIMBOX) {
          prefill = "Trim"
        } else if (preferences.getPDFCrop() === PDFBoxType.PDFBLEEDBOX) {
          prefill = "Bleed"
        } else if (preferences.getPDFCrop() === PDFBoxType.PDFMEDIABOX) {
          prefill = "Media"
        } else {
          prefill = "Bounding"
        }
        it.selection = Collections.indexOf(OPEN_PDFBOXTYPES, prefill)
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
  })
}

/**
 * Impose pages option panel.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {Array} inputSize size or bounds.
 */
function OpenPagesPanel(parent, inputSize) {
  var self = this
  this.rangeGroup, this.widthEdit, this.heightEdit, this.bleedEdit

  this.main = parent.vpanel("Pages", function(panel) {
    panel.alignChildren = "right"
    panel.hgroup(function(group) {
      group.tooltips("Which pages to impose")
      group.staticText(undefined, "Pages:").also(JUSTIFY_RIGHT)
      self.rangeGroup = new RangeGroup(group, inputSize)
    })
    panel.hgroup(function(group) {
      group.tooltips("Page width, not artboard")
      group.staticText(undefined, "Width:").also(JUSTIFY_RIGHT)
      self.widthEdit = group.editText(inputSize, "210 mm").also(VALIDATE_UNITS)
    })
    panel.hgroup(function(group) {
      group.tooltips("Page height, not artboard")
      group.staticText(undefined, "Height:").also(JUSTIFY_RIGHT)
      self.heightEdit = group.editText(inputSize, "297 mm").also(VALIDATE_UNITS)
    })
    panel.hgroup(function(group) {
      group.tooltips("Extra area that will be added to page dimension")
      group.staticText(undefined, "Bleed:").also(JUSTIFY_RIGHT)
      self.bleedEdit = group.editText(inputSize, "0 mm").also(VALIDATE_UNITS)
    })
  })

  /**
   * Returns width input.
   * @returns {Number}
   */
  this.getWidth = function() { return parseUnits(self.widthEdit.text) }

  /**
   * Returns height input.
   * @returns {Number}
   */
  this.getHeight = function() { return parseUnits(self.heightEdit.text) }

  /**
   * Returns bleed input.
   * @returns {Number}
   */
  this.getBleed = function() { return parseUnits(self.bleedEdit.text) }
}

/**
 * Impose document option panel.
 * @param {Group|Panel|Window} parent holder of this control.
 */
function OpenDocumentPanel(parent) {
  var self = this
  this.modeList, this.resolutionList
  this.layoutList, this.rowsOrColsEdit, this.unitsList
  this.spacingEdit
  this.previewDefaultRadio, this.previewPixelRadio, this.previewOverprintRadio

  this.main = parent.vpanel("Document Preset", function(panel) {
    panel.alignChildren = "right"
    panel.hgroup(function(group) {
      group.tooltips("The color mode and resolution for the new document")
      group.staticText(undefined, "Color Mode:").also(JUSTIFY_RIGHT)
      self.modeList = group.dropDownList(SIZE_DOCUMENT_INPUT, OPEN_DOCUMENTMODES).also(function(it) {
        it.selection = Collections.indexOf(OPEN_DOCUMENTMODES, "CMYK")
      })
      self.resolutionList = group.dropDownList(SIZE_DOCUMENT_INPUT2, OPEN_DOCUMENTRESOLUTIONS).also(function(it) {
        it.selection = Collections.indexOf(OPEN_DOCUMENTRESOLUTIONS, "High")
      })
    })
    panel.hgroup(function(group) {
      group.tooltips("Layout for artboards")
      group.staticText(undefined, "Layout:").also(JUSTIFY_RIGHT)
      self.layoutList = group.dropDownList(SIZE_DOCUMENT_INPUT, OPEN_DOCUMENTLAYOUTS).also(function(it) {
        it.selection = Collections.indexOf(OPEN_DOCUMENTLAYOUTS, "Grid by Row")
      })
      self.rowsOrColsEdit = group.editText(SIZE_DOCUMENT_INPUT2, "2").also(VALIDATE_DIGITS)
    })
    panel.hgroup(function(group) {
      group.tooltips("The units for the new document")
      group.staticText(undefined, "Units:").also(JUSTIFY_RIGHT)
      self.unitsList = group.dropDownList(SIZE_DOCUMENT_INPUTMAX, UNITS).also(function(it) {
        it.selection = Collections.indexOf(UNITS, "Millimeters")
      })
    })
    panel.hgroup(function(group) {
      group.tooltips("Spacing between artboards")
      group.staticText(undefined, "Spacing:").also(JUSTIFY_RIGHT)
      self.spacingEdit = group.editText(SIZE_DOCUMENT_INPUTMAX, "10 mm").also(VALIDATE_UNITS)
    })
    panel.hgroup(function(group) {
      group.tooltips("The preview mode for the new document")
      group.staticText(undefined, "Preview Mode:").also(JUSTIFY_RIGHT)
      self.previewDefaultRadio = group.radioButton(undefined, "Default").also(SELECTED)
      self.previewPixelRadio = group.radioButton(undefined, "Pixel")
      self.previewOverprintRadio = group.radioButton(undefined, "Overprint")
    })
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
  this.open = function(title, pages, width, height, bleed) {
    return app.documents.addDocument(DocumentPresetType.Print, new DocumentPreset().also(function(preset) {
      preset.title = title
      preset.numArtboards = pages
      preset.width = width
      preset.height = height
      if (bleed > 0) {
        preset.documentBleedLink = true
        preset.documentBleedOffset = [bleed, bleed, bleed, bleed]
      }
      switch (self.modeList.selection.text) {
        case "RGB":
          preset.colorMode = DocumentColorSpace.RGB
          break;
        default:
          preset.colorMode = DocumentColorSpace.CMYK
          break;
      }
      switch (self.resolutionList.selection.text) {
        case "Screen":
          preset.rasterResolution = DocumentRasterResolution.ScreenResolution
          break;
        case "Medium":
          preset.rasterResolution = DocumentRasterResolution.MediumResolution
          break;
        default:
          preset.rasterResolution = DocumentRasterResolution.HighResolution
          break;
      }
      switch (self.layoutList.selection.text) {
        case "Grid by Row":
          preset.artboardLayout = DocumentArtboardLayout.GridByRow
          break;
        case "Grid by Column":
          preset.artboardLayout = DocumentArtboardLayout.GridByCol
          break;
        case "Row":
          preset.artboardLayout = DocumentArtboardLayout.Row
          break;
        case "Column":
          preset.artboardLayout = DocumentArtboardLayout.Column
          break;
        case "RTL Grid by Row":
          preset.artboardLayout = DocumentArtboardLayout.RLGridByRow
          break;
        case "RTL Grid by Column":
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
}
