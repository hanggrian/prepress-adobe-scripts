//@target illustrator;
//@include '../../.lib/commons.js';

var SIZE_INPUT = [100, 21];

checkAnySelection();
check(
    Collections.anyItem(
        selection,
        function(it) {
          return it.clipping;
        }),
    getString(R.string.error_notypes_selection, getString(R.string.clipping_masks).toLowerCase()),
);

var dialog = new Dialog(R.string.resize_clipping_masks);
var widthFromEdit;
var widthToEdit;
var heightFromEdit;
var heightToEdit;
var documentOriginCheck;
var anchorGroup;

dialog.hgroup(function(main) {
      var prefill =
          Collections.firstItem(
              selection,
              function(it) {
                return it.clipping;
              },
          );
      main.vpanel(
          R.string.dimension,
          function(panel) {
            panel.alignChildren = 'right'
            panel.hgroup(function(group) {
              group.staticText(undefined, R.string.width).apply(HEADING);
              widthFromEdit =
                  group
                      .editText(SIZE_INPUT, formatUnits(prefill.width, unitType, 2))
                      .apply(function(it) {
                        it.validateUnits();
                        it.activate();
                      });
              group.staticText(undefined, 'to');
              widthToEdit =
                  group
                      .editText(SIZE_INPUT, formatUnits(prefill.width, unitType, 2))
                      .apply(VALIDATE_UNITS);
            });
            panel.hgroup(function(group) {
              group.staticText(undefined, R.string.height).apply(HEADING);
              heightFromEdit =
                  group
                      .editText(SIZE_INPUT, formatUnits(prefill.height, unitType, 2))
                      .apply(VALIDATE_UNITS);
              group.staticText(undefined, 'to');
              heightToEdit =
                  group
                      .editText(SIZE_INPUT, formatUnits(prefill.height, unitType, 2))
                      .apply(VALIDATE_UNITS);
            });
          });
      main.vpanel(
          R.string.anchor,
          function(panel) {
            documentOriginCheck =
                new DocumentOriginCheck(panel).apply(function(it) {
                  it.addClickListener(function() {
                    anchorGroup.enabled = !it.value;
                  });
                });
            anchorGroup = new AnchorGroup(panel);
          },
      );
    },
);
dialog.setCancelButton();
dialog.setDefaultButton(
    undefined,
    function() {
      var widthFrom = parseUnits(widthFromEdit.text);
      var heightFrom = parseUnits(heightFromEdit.text);
      var widthTo = parseUnits(widthToEdit.text);
      var heightTo = parseUnits(heightToEdit.text);
      var transformation =
          documentOriginCheck.value
              ? Transformation.DOCUMENTORIGIN
              : anchorGroup.getTransformation();
      var clippingPaths =
          Collections.filterItem(
              selection,
              function(it) {
                return it.clipping &&
                    parseInt(it.width) === parseInt(widthFrom) &&
                    parseInt(it.height) === parseInt(heightFrom)
              },
          );
      var progress = new ProgressPalette(clippingPaths.length, R.string.resizing_clipping_masks);

      Collections.forEach(
          clippingPaths,
          function(clippingPath, i) {
            var clippingPath = clippingPaths[i];
            print(i + '. ');
            progress.increment();
            var scaleX = 100 * widthTo / clippingPath.width;
            var scaleY = 100 * heightTo / clippingPath.height;
            println('Scale X=%d Y=%d.', scaleX, scaleY);
            clippingPath.resize(scaleX, scaleY, true, true, true, true, 100, transformation);
          },
      );
      return false;
    },
);
dialog.show();
