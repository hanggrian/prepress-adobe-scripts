// Select all PathItem with attributes matching user input.
// When there are active selection, will only select items within those selection.

//@target illustrator;
//@include '../.lib/commons.js';

var ImageColor =
    new Enum({
      GRAYSCALE: {text: 'Grayscale', value: ImageColorSpace.GrayScale},
      RGB: {text: 'RGB', value: ImageColorSpace.RGB},
      CMYK: {text: 'CMYK', value: ImageColorSpace.CMYK},
      LAB: {text: 'LAB', value: ImageColorSpace.LAB},
      SEPARATION: {text: 'Separation', value: ImageColorSpace.Separation},
      DEVICEN: {text: 'DeviceN', value: ImageColorSpace.DeviceN},
      INDEXED: {text: 'Indexed', value: ImageColorSpace.Indexed},
    });

var ImageStatus =
    new Enum({
      NO_DATA: {text: 'No Data'},
      DATA_FROM_FILE: {text: 'Data from File'},
      DATA_MODIFIED: {text: 'Data Modified'},
    });

var SIZE_INPUT = [100, 21];

var isFilterMode = Collections.isNotEmpty(selection);
if (isFilterMode) {
  check(
      Collections.anyItem(
          selection,
          function(it) {
            return Items.isRaster(it);
          },
      ),
      getString(R.string.error_notypes_selection, getString(R.string.images).toLowerCase()),
  );
} else {
  check(
      Collections.isNotEmpty(document.rasterItems),
      getString(R.string.error_notypes_document, getString(R.string.images).toLowerCase()),
  );
}

var dialog = new Dialog(R.string.select_images, 'selecting-items/#select-images');
var dimensionPanel;
var colorSpaceList;
var bitsEdit;
var transparentList;
var embeddedList;
var overprintList;
var statusList;
var recursiveCheck;
var prefs = preferences2.resolve('select/images');

dialog.vgroup(function(main) {
  main.hgroup(function(rootPane) {
    rootPane.alignChildren = 'top';
    rootPane.vgroup(function(leftPane) {
      leftPane.alignChildren = 'fill';
      dimensionPanel = new SelectDimensionPanel(leftPane, SIZE_INPUT);
      leftPane.vpanel(
          R.string.image,
          function(panel) {
            panel.alignChildren = 'right';
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selectimage_colorspace;
              group.staticText(undefined, R.string.color_space).apply(HEADING);
              colorSpaceList = group.dropDownList(SIZE_INPUT, ImageColor.list());
            });
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selectimage_bitsperchannel;
              group.staticText(undefined, R.string.bits_per_channel).apply(HEADING);
              bitsEdit = group.editText(SIZE_INPUT).apply(VALIDATE_DIGITS);
            });
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selectimage_transparent;
              group.staticText(undefined, R.string.transparent).apply(HEADING);
              transparentList = group.dropDownList(SIZE_INPUT, SelectOption.list());
            });
          },
      );
    });
    rootPane.vgroup(function(rightPane) {
      rightPane.alignChildren = 'fill';
      rightPane.vpanel(
          R.string.others,
          function(panel) {
            panel.alignChildren = 'right'
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selectimage_embedded;
              group.staticText(undefined, R.string.embedded).apply(HEADING);
              embeddedList = group.dropDownList(SIZE_INPUT, SelectOption.list());
            });
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selectimage_overprint;
              group.staticText(undefined, R.string.overprint).apply(HEADING);
              overprintList = group.dropDownList(SIZE_INPUT, SelectOption.list());
            });
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selectimage_status;
              group.staticText(undefined, R.string.status).apply(HEADING);
              statusList = group.dropDownList(SIZE_INPUT, ImageStatus.list());
            });
          },
      );
    });
  });
  if (isFilterMode) {
    recursiveCheck =
        new RecursiveCheck(main).apply(function(it) {
          it.alignment = 'right';
          it.value = prefs.getBoolean('recursive');
        });
  }
});
dialog.setCancelButton();
dialog.setDefaultButton(
    undefined,
    function() {
      var width = dimensionPanel.getWidth();
      var height = dimensionPanel.getHeight();
      var colorSpace;
      if (colorSpaceList.hasSelection()) {
        colorSpace = ImageColor.find(colorSpaceList.selection).value;
      }
      var bits = parseInt(bitsEdit.text) || 0;
      var transparent =
          transparentList.hasSelection()
              ? SelectOption.isYes(transparentList.selection)
              : undefined;
      var embedded =
          embeddedList.hasSelection()
              ? SelectOption.isYes(embeddedList.selection)
              : undefined;
      var overprint =
          overprintList.hasSelection()
              ? SelectOption.isYes(overprintList.selection)
              : undefined;
      var status;
      if (statusList.hasSelection()) {
        status = ImageStatus.find(statusList.selection).value;
      }
      selectAll(
          ['RasterItem'],
          function(item) {
            if (width !== undefined && parseInt(width) !== parseInt(item.width)) return false;
            if (height !== undefined && parseInt(height) !== parseInt(item.height)) return false;
            if (colorSpace !== undefined && colorSpace !== item.imageColorSpace) return false;
            if (bits !== 0 && bits !== parseInt(item.bitsPerChannel)) return false;
            if (transparent !== undefined && transparent !== item.transparent) return false;
            if (embedded !== undefined && embedded !== item.embedded) return false;
            if (overprint !== undefined && overprint !== item.overprint) return false;
            if (status !== undefined && status !== item.status) return false;
            return true;
          },
          isFilterMode && recursiveCheck.value,
      );

      if (isFilterMode) {
        prefs.setBoolean('recursive', recursiveCheck.value);
      }
      return false;
    },
);
dialog.show();
