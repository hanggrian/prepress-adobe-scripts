var SIZE_OPENDOCUMENT_INPUT = [120, 21];
var SIZE_OPENDOCUMENT_INPUT2 = [80, 21];

var PDFCrop =
    new Enum(
        {
          BOUNDING: {text: 'Bounding', value: PDFBoxType.PDFBOUNDINGBOX},
          ART: {text: 'Art', value: PDFBoxType.PDFARTBOX},
          CROP: {text: 'Crop', value: PDFBoxType.PDFCROPBOX},
          TRIM: {text: 'Trim', value: PDFBoxType.PDFTRIMBOX},
          BLEED: {text: 'Bleed', value: PDFBoxType.PDFBLEEDBOX},
          MEDIA: {text: 'Media', value: PDFBoxType.PDFMEDIABOX},
        },
        [0],
    );

var DocumentPreset2 =
    new Enum({
      MOBILE: {text: 'Mobile', value: DocumentPresetType.Mobile},
      WEB: {text: 'Web', value: DocumentPresetType.Web},
      PRINT: {text: 'Print', value: DocumentPresetType.Print},
      VIDEO: {text: 'Video', value: DocumentPresetType.Video},
    });

var DocumentColor =
    new Enum({
      RGB: {text: 'RGB', value: DocumentColorSpace.RGB},
      CMYK: {text: 'CMYK', value: DocumentColorSpace.CMYK},
    });

var DocumentResolution =
    new Enum({
      SCREEN: {text: R.string.screen, value: DocumentRasterResolution.ScreenResolution},
      MEDIUM: {text: R.string.medium, value: DocumentRasterResolution.MediumResolution},
      HIGH: {text: R.string.high, value: DocumentRasterResolution.HighResolution},
    });

var DocumentLayout =
    new Enum({
      GRID_BY_ROW: {text: R.string.grid_by_row, value: DocumentArtboardLayout.GridByRow},
      GRID_BY_COLUMN: {text: R.string.grid_by_column, value: DocumentArtboardLayout.GridByCol},
      ROW: {text: R.string.row, value: DocumentArtboardLayout.Row},
      COLUMN: {text: R.string.column, value: DocumentArtboardLayout.Column},
      RTL_GRID_BY_ROW: {text: R.string.rtl_grid_by_row, value: DocumentArtboardLayout.RLGridByRow},
      RTL_GRID_BY_COLUMN: {
        text: R.string.rtl_grid_by_column,
        value: DocumentArtboardLayout.RLGridByCol,
      },
      RTL_ROW: {text: R.string.rtl_row, value: DocumentArtboardLayout.RLRow},
    });

var DocumentPreview =
    new Enum({
      DEFAULT: {text: 'Default', value: DocumentPreviewMode.DefaultPreview},
      PIXEL: {text: 'Pixel', value: DocumentPreviewMode.PixelPreview},
      OVERPRINT: {text: 'Overprint', value: DocumentPreviewMode.OverprintPreview},
    });

/**
 * PDF placing option panel.
 * @param {!Group|!Panel|!Window} parent
 * @param {!Array<number>} inputSize
 */
function OpenPDFPanel(parent, inputSize) {
  checkNotNull(parent);

  var self = parent.vpanel(R.string.place_pdf);
  self.boxTypeList;

  self.alignChildren = 'right';
  self.alignment = 'fill';
  self.hgroup(function(group) {
    group.helpTips = R.string.tip_cropto;
    group.staticText(undefined, R.string.crop_to).apply(HEADING);
    self.boxTypeList =
        group
            .dropDownList(inputSize, PDFCrop.list())
            .apply(function(it) {
              if (preferences.getPDFCrop() === PDFBoxType.PDFARTBOX) {
                it.selection = 2;
              } else if (preferences.getPDFCrop() === PDFBoxType.PDFCROPBOX) {
                it.selection = 3;
              } else if (preferences.getPDFCrop() === PDFBoxType.PDFTRIMBOX) {
                it.selection = 4;
              } else if (preferences.getPDFCrop() === PDFBoxType.PDFBLEEDBOX) {
                it.selection = 5;
              } else if (preferences.getPDFCrop() === PDFBoxType.PDFMEDIABOX) {
                it.selection = 6;
              } else {
                it.selection = 0;
              }
              it.addChangeListener(function() {
                preferences.setPDFCrop(PDFCrop.find(self.boxTypeList.selection).value);
              });
            });
  });
  return self;
}

/**
 * Impose pages option panel.
 * @param {!Group|!Panel|!Window} parent
 * @param {!Array<number>} inputSize
 */
function OpenPagesPanel(parent, inputSize) {
  checkNotNull(parent);

  var self = parent.vpanel(getString(R.string.pages));
  self.rangingGroup;
  self.widthEdit;
  self.heightEdit;
  self.bleedEdit;

  self.alignChildren = 'right';
  self.alignment = 'fill';
  self.hgroup(function(group) {
    group.helpTips = R.string.tip_openpages_pages;
    group.staticText(undefined, getString(R.string.pages)).apply(HEADING);
    self.rangingGroup = new RangingGroup(group, inputSize);
  });
  self.hgroup(function(group) {
    group.staticText(undefined, R.string.width).apply(HEADING);
    self.widthEdit = group.editText(inputSize, '210 mm').apply(VALIDATE_UNITS);
  });
  self.hgroup(function(group) {
    group.staticText(undefined, R.string.height).apply(HEADING);
    self.heightEdit = group.editText(inputSize, '297 mm').apply(VALIDATE_UNITS);
  });
  self.hgroup(function(group) {
    group.helpTips = R.string.tip_openpages_bleed;
    group.staticText(undefined, R.string.bleed).apply(HEADING);
    self.bleedEdit = group.editText(inputSize, '0 mm').apply(VALIDATE_UNITS);
  });

  /** @return {Range} */
  self.getRange =
      function() {
        return self.rangingGroup.get();
      };

  /** @return {number} */
  self.getWidth =
      function() {
        return parseUnits(self.widthEdit.text);
      };

  /** @return {number} */
  self.getHeight =
      function() {
        return parseUnits(self.heightEdit.text);
      };

  /** @return {number} */
  self.getBleed =
      function() {
        return parseUnits(self.bleedEdit.text);
      };

  return self;
}

/**
 * Impose document option panel.
 * @param {!Group|!Panel|!Window} parent
 */
function OpenDocumentPanel(parent) {
  checkNotNull(parent);

  var self = parent.vpanel(R.string.document);
  self.widthEdit;
  self.heightEdit;
  self.unitsList;
  self.layoutList;
  self.previewModeList;
  self.presetTypeList;
  self.colorModeList;
  self.resolutionList;
  self.columnEdit;
  self.spacingEdit;

  self.alignChildren = 'right';
  self.alignment = 'fill';

  self.hgroup(function(rootPane) {
    rootPane.vgroup(function(leftPane) {
      leftPane.alignChildren = 'right';
      leftPane.hgroup(function(group) {
        group.staticText(undefined, R.string.width).apply(HEADING);
        self.widthEdit = group.editText(SIZE_OPENDOCUMENT_INPUT, '0 mm').apply(VALIDATE_UNITS);
      });
      leftPane.hgroup(function(group) {
        group.staticText(undefined, R.string.height).apply(HEADING);
        self.heightEdit = group.editText(SIZE_OPENDOCUMENT_INPUT, '0 mm').apply(VALIDATE_UNITS);
      });
      leftPane.hgroup(function(group) {
        group.helpTips = R.string.tip_opendocuments_units;
        group.staticText(undefined, R.string.units).apply(HEADING);
        self.unitsList =
            group
                .dropDownList(SIZE_OPENDOCUMENT_INPUT, UnitType.list())
                .apply(function(it) {
                  it.selection = 3;
                });
      });
      leftPane.hgroup(function(group) {
        group.helpTips = R.string.tip_opendocuments_layout;
        group.staticText(undefined, R.string.layout).apply(HEADING);
        self.layoutList =
            group
                .dropDownList(SIZE_OPENDOCUMENT_INPUT, DocumentLayout.list())
                .apply(function(it) {
                  it.selection = 0;
                });
      });
      leftPane.hgroup(function(group) {
        group.helpTips = R.string.tip_opendocuments_previewmode;
        group.staticText(undefined, R.string.preview_mode).apply(HEADING);
        self.previewModeList =
            group
                .dropDownList(SIZE_OPENDOCUMENT_INPUT, DocumentPreview.list())
                .apply(function(it) {
                  it.selection = 0;
                });
      });
    });
    rootPane.vgroup(function(rightPane) {
      rightPane.alignChildren = 'right';
      rightPane.hgroup(function(group) {
        group.helpTips = R.string.tip_opendocuments_preset;
        group.staticText(undefined, R.string.preset_type).apply(HEADING);
        self.presetTypeList =
            group
                .dropDownList(SIZE_OPENDOCUMENT_INPUT2, DocumentPreset2.list())
                .apply(function(it) {
                  it.selection = 2;
                });
      });
      rightPane.hgroup(function(group) {
        group.helpTips = R.string.tip_opendocuments_colormode;
        group.staticText(undefined, R.string.color_mode).apply(HEADING);
        self.colorModeList =
            group
                .dropDownList(SIZE_OPENDOCUMENT_INPUT2, DocumentColor.list())
                .apply(function(it) {
                  it.selection = 1;
                });
      });
      rightPane.hgroup(function(group) {
        group.helpTips = R.string.tip_opendocuments_resolution;
        group.staticText(undefined, R.string.resolution).apply(HEADING);
        self.resolutionList =
            group
                .dropDownList(SIZE_OPENDOCUMENT_INPUT2, DocumentResolution.list())
                .apply(function(it) {
                  it.selection = 2;
                });
      });
      rightPane.hgroup(function(group) {
        group.helpTips = R.string.tip_opendocuments_column;
        group.staticText(undefined, R.string.column).apply(HEADING); // or row
        self.columnEdit = group.editText(SIZE_OPENDOCUMENT_INPUT2, '2').apply(VALIDATE_DIGITS);
      });
      rightPane.hgroup(function(group) {
        group.helpTips = R.string.tip_opendocuments_spacing;
        group.staticText(undefined, R.string.spacing).apply(HEADING);
        self.spacingEdit = group.editText(SIZE_OPENDOCUMENT_INPUT2, '10 mm').apply(VALIDATE_UNITS);
      });
    });
  });

  /** @return {number} */
  self.getWidth =
      function() {
        return parseUnits(self.widthEdit.text) || 0;
      };

  /** @return {number} */
  self.getHeight =
      function() {
        return parseUnits(self.heightEdit.text) || 0;
      };

  /** @return {string} */
  self.setWidthText =
      function(widthText) {
        return self.widthEdit.text = checkNotNull(widthText);
      };

  /** @return {string} */
  self.setHeightText =
      function(heightText) {
        return self.heightEdit.text = checkNotNull(heightText);
      };

  /**
   * @param {string} title
   * @param {number} artboardLength
   * @return {!Document}
   */
  self.create =
      function(title, artboardLength) {
        checkNotNull(title);
        checkNotNull(artboardLength);
        var presetType = DocumentPreset2.find(self.presetTypeList.selection);
        return app.documents.addDocument(presetType.value, new DocumentPreset()
            .apply(function(preset) {
              preset.title = title;
              preset.numArtboards = artboardLength;
              preset.width = self.getWidth();
              preset.height = self.getHeight();
              preset.colorMode = DocumentColor.find(self.colorModeList.selection).value;
              preset.rasterResolution = DocumentResolution.find(self.resolutionList.selection).value;
              preset.artboardLayout = DocumentLayout.find(self.layoutList.selection).value;
              preset.artboardRowsOrCols = parseInt(self.columnEdit.text);
              preset.units = UnitType.find(self.unitsList.selection).rulerUnits;
              preset.artboardSpacing = parseUnits(self.spacingEdit.text);
              preset.previewMode = DocumentPreview.find(self.previewModeList.selection).value;
            }));
      };

  /**
   * Checks validity of document, return false is combined artboards' size exceed max canvas size,
   * which is 225 inch. Dialog action should return true to invalidate process.
   * @param {number} artboardLength
   * @return {boolean}
   * @see https://pixelandbracket.com/how-to-change-max-canvas-size-in-illustrator/#:~:text=Traditionally%2C%20the%20max%20canvas%20size,a%20little%20over%2016%2C000%20pixels.
   */
  self.isValid =
      function(artboardLength) {
        var maxCanvasSize = parseUnits('225 inch');
        var isHorizontal = DocumentLayout.find(self.layoutList.selection).name.endsWith('ROW');
        var column = parseInt(self.columnEdit.text);
        var spacing = parseUnits(self.spacingEdit.text);

        var constraint1 = column * ((isHorizontal ? self.getWidth() : self.getHeight()) + spacing);
        var lines = artboardLength > column ? Math.floor(artboardLength / column) : 1;
        var constraint2 = lines * ((isHorizontal ? self.getHeight() : self.getWidth()) + spacing);

        println('Checking validity of new document:');
        println('- maxCanvasSize = ' + maxCanvasSize);
        println('- constraint1 = ' + constraint1);
        println('- constraint2 = ' + constraint2);
        return maxCanvasSize > constraint1 && maxCanvasSize > constraint2;
      };

  return self;
}
