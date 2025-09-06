/*
<javascriptresource>
<name>Resize Images...</name>
<category>2</category>
<enableinfo>true</enableinfo>
</javascriptresource>
*/

//@target photoshop;
//@include '../.lib/commons.js';

var Resample =
    new Enum({
      BICUBIC: {text: R.string.bicubic, value: ResampleMethod.BICUBIC},
      BICUBIC_SHARPER: {text: R.string.bicubic_sharper, value: ResampleMethod.BICUBICSHARPER},
      BICUBIC_SMOOTHER: {text: R.string.bicubic_smoother, value: ResampleMethod.BICUBICSMOOTHER},
      BILINEAR: {text: R.string.bilinear, value: ResampleMethod.BILINEAR},
      NEAREST_NEIGHBOR: {text: R.string.nearest_neighbor, value: ResampleMethod.NEARESTNEIGHBOR},
      NONE: {text: R.string.none, value: ResampleMethod.NONE},
    });

var SIZE_INPUT = [180, 21];

var dialog = new Dialog(R.string.resize_images, 'resizing-images-canvases/#resize-images');
var widthEdit;
var heightEdit;
var resolutionEdit;
var resampleList;

dialog.vgroup(function(main) {
  main.alignChildren = 'right';
  main.hgroup(function(group) {
    group.staticText(undefined, R.string.width).apply(HEADING);
    widthEdit =
        group
            .editText(SIZE_INPUT, formatUnits(document.width, unitType, 2))
            .apply(function(it) {
              it.validateUnits();
              it.activate();
            });
  });
  main.hgroup(function(group) {
    group.staticText(undefined, R.string.height).apply(HEADING);
    heightEdit =
        group.editText(SIZE_INPUT, formatUnits(document.height, unitType, 2)).apply(VALIDATE_UNITS);
  });
  main.hgroup(function(group) {
    group.helpTips = R.string.tip_resizeimages_resolution;
    group.staticText(undefined, R.string.resolution).apply(HEADING);
    resolutionEdit =
        group.editText(SIZE_INPUT, document.resolution.toString()).apply(VALIDATE_UNITS);
  });
  main.hgroup(function(group) {
    group.helpTips = R.string.tip_resizeimages_resample;
    group.staticText(undefined, R.string.resample).apply(HEADING);
    resampleList =
        group
            .dropDownList(SIZE_INPUT, Resample.list())
            .apply(function(it) {
              it.selection = 0;
            });
  });
});
dialog.setCancelButton();
dialog.setDefaultButton(
    undefined,
    function() {
      var width = new UnitValue(widthEdit.text);
      var height = new UnitValue(heightEdit.text);
      var resolution = parseInt(resolutionEdit.text);
      var method = Resample.find(resampleList.selection);

      process(document, width, height, resolution, method);
      return false;
    },
);
dialog.setYesButton(
    R.string.all,
    function() {
      var width = new UnitValue(widthEdit.text);
      var height = new UnitValue(heightEdit.text);
      var resolution = parseInt(resolutionEdit.text);
      var method = Resample.find(resampleList.selection);
      var progress = new ProgressPalette(app.documents.length, R.string.resizing);

      Collections.forEach(
          app.documents,
          function(document) {
            progress.increment();
            process(document, width, height, resolution, method);
          },
      );
      return false;
    },
);
dialog.show();

function process(document, width, height, resolution, method) {
  app.activeDocument = document;
  document.resizeImage(width, height, resolution, method.value);
}
