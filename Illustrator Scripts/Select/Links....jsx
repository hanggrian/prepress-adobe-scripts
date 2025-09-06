// Select all PlacedItem with attributes matching user input.
// When there are active selection, will only select items within those selection.
//
// The file type options are similar with Illustrator native `Relink...` dialog.

//@target illustrator;
//@include '../.lib/commons.js';

var SIZE_INPUT = [150, 21];

var isFilterMode = Collections.isNotEmpty(selection);
if (isFilterMode) {
  check(
      Collections.anyItem(
          selection,
          function(it) {
            return Items.isPlaced(it);
          },
      ),
      getString(R.string.error_notypes_selection, getString(R.string.links).toLowerCase()),
  );
} else {
  check(
      Collections.isNotEmpty(document.placedItems),
      getString(R.string.error_notypes_document, getString(R.string.links).toLowerCase()),
  );
}

var dialog = new Dialog(R.string.select_links, 'selecting-items/#select-links');
var dimensionPanel;
var aiCheck;
var pdfCheck;
var bmpCheck;
var gifCheck;
var jpegCheck;
var jpeg2000Check;
var pngCheck;
var psdCheck;
var tiffCheck;
var recursiveCheck;
var prefs = preferences2.resolve('select/links');

dialog.vgroup(function(main) {
  dimensionPanel = new SelectDimensionPanel(main, SIZE_INPUT);
  main.vpanel(
      R.string.file_types,
      function(panel) {
        panel.helpTips = R.string.tip_selectlinks_filetypes;
        panel.alignChildren = 'left';
        aiCheck = panel.checkBox(undefined, getTypeString(FileExtension.ADOBE_ILLUSTRATOR));
        pdfCheck = panel.checkBox(undefined, getTypeString(FileExtension.ADOBE_PDF));
        bmpCheck = panel.checkBox(undefined, getTypeString(FileExtension.BMP));
        gifCheck = panel.checkBox(undefined, getTypeString(FileExtension.GIF89a));
        jpegCheck = panel.checkBox(undefined, getTypeString(FileExtension.JPEG));
        jpeg2000Check = panel.checkBox(undefined, getTypeString(FileExtension.JPEG2000));
        pngCheck = panel.checkBox(undefined, getTypeString(FileExtension.PNG));
        psdCheck = panel.checkBox(undefined, getTypeString(FileExtension.PHOTOSHOP));
        tiffCheck = panel.checkBox(undefined, getTypeString(FileExtension.TIFF));
      },
  );
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
      selectAll(
          ['PlacedItem'],
          function(item) {
            if (width !== undefined && parseInt(width) !== parseInt(item.width)) return false;
            if (height !== undefined && parseInt(height) !== parseInt(item.height)) return false;
            var extension = Items.isLinkExists(item) && item.file.name.split('.').pop();
            if (aiCheck.value &&
                !Collections.contains(FileExtension.ADOBE_ILLUSTRATOR.value, extension)) {
              return false;
            }
            if (pdfCheck.value && !Collections.contains(FileExtension.ADOBE_PDF.value, extension)) {
              return false;
            }
            if (bmpCheck.value && !Collections.contains(FileExtension.BMP.value, extension)) {
              return false;
            }
            if (gifCheck.value && !Collections.contains(FileExtension.GIF89a.value, extension)) {
              return false;
            }
            if (jpegCheck.value && !Collections.contains(FileExtension.JPEG.value, extension)) {
              return false;
            }
            if (jpeg2000Check.value && !Collections.contains(FileExtension.JPEG2000.value, extension)) {
              return false;
            }
            if (pngCheck.value && !Collections.contains(FileExtension.PNG.value, extension)) {
              return false;
            }
            if (psdCheck.value && !Collections.contains(FileExtension.PHOTOSHOP.value, extension)) {
              return false;
            }
            if (tiffCheck.value && !Collections.contains(FileExtension.TIFF.value, extension)) {
              return false;
            }
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

function getTypeString(fileExtension) {
  var s = '';
  Collections.forEach(
      fileExtension.value,
      function(it, i) {
        s += it;
        if (i !== Collections.lastIndex(fileExtension.value)) {
          s += ', ';
        }
      },
  );
  return '%s (%s)'.format(fileExtension.text, s);
}
