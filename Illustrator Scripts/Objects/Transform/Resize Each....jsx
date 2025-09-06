//@target illustrator;
//@include '../../.lib/commons.js'

var SIZE_INPUT = [150, 21];
var SIZE_INPUT_CHECK = [14, 14];

checkAnySelection();

var dialog = new Dialog(R.string.resize_each, 'resizing-rasterizing-each/#resize-each');
var prefill = Collections.first(selection);
var widthEdit;
var widthCheck;
var heightEdit;
var heightCheck;
var changePositionsCheck;
var changeFillPatternsCheck;
var changeFillGradientsCheck;
var changeStrokePatternsCheck;
var documentOriginCheck;
var anchorGroup;
var recursiveCheck;
var prefs = preferences2.resolve('objects/resize_each');

dialog.vgroup(function(main) {
  main.vgroup(function(topPane) {
    topPane.alignment = 'center';
    topPane.alignChildren = 'right';
    topPane.hgroup(function(group) {
      group.staticText(undefined, R.string.width).apply(HEADING);
      widthEdit =
          group
              .editText(SIZE_INPUT, formatUnits(prefill.width, unitType, 2))
              .apply(function(it) {
                it.validateUnits();
                it.activate();
              });
      widthCheck =
          group
              .checkBox(SIZE_INPUT_CHECK)
              .apply(function(it) {
                it.select();
                it.addClickListener(function() {
                  widthEdit.enabled = it.value;
                });
              });
    });
    topPane.hgroup(function(group) {
      group.staticText(undefined, R.string.height).apply(HEADING);
      heightEdit =
          group
              .editText(SIZE_INPUT, formatUnits(prefill.height, unitType, 2))
              .apply(VALIDATE_UNITS);
      heightCheck =
          group
              .checkBox(SIZE_INPUT_CHECK)
              .apply(function(it) {
                it.select();
                it.addClickListener(function() {
                  heightEdit.enabled = it.value;
                });
              });
    });
  });
  main.hgroup(function(rootPane) {
    rootPane.alignChildren = 'fill';
    rootPane.vpanel(
        R.string.change,
        function(panel) {
          panel.alignChildren = 'left'
          changePositionsCheck =
              panel
                  .checkBox(undefined, R.string.positions)
                  .apply(function(it) {
                    it.helpTip = R.string.tip_resizeeach_option1;
                    it.value = prefs.getBoolean('option1');
                  });
          changeFillPatternsCheck =
              panel
                  .checkBox(undefined, R.string.fill_patterns)
                  .apply(function(it) {
                    it.helpTip = R.string.tip_resizeeach_option2;
                    it.value = prefs.getBoolean('option2');
                  });
          changeFillGradientsCheck =
              panel
                  .checkBox(undefined, R.string.fill_gradients)
                  .apply(function(it) {
                    it.helpTip = R.string.tip_resizeeach_option3;
                    it.value = prefs.getBoolean('option3');
                  });
          changeStrokePatternsCheck =
              panel
                  .checkBox(undefined, R.string.stroke_patterns)
                  .apply(function(it) {
                    it.helpTip = R.string.tip_resizeeach_option4;
                    it.value = prefs.getBoolean('option4');
                  });
        },
    );
    rootPane.vpanel(
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
  });
  main.hgroup(function(group) {
    group.alignment = 'right';
    recursiveCheck =
        new RecursiveCheck(group).apply(function(it) {
          it.value = prefs.getBoolean('recursive');
        });
  });
});
dialog.setCancelButton();
dialog.setDefaultButton(
    undefined,
    function() {
      var width = parseUnits(widthEdit.text);
      var height = parseUnits(heightEdit.text);
      var transformation =
          documentOriginCheck.value
              ? Transformation.DOCUMENTORIGIN
              : anchorGroup.getTransformation();

      var action =
          function(item, i) {
            print(i + '. ');
            var scaleX = !widthCheck.value ? 100 : 100 * width / item.width;
            var scaleY = !heightCheck.value ? 100 : 100 * height / item.height;
            if (!isFinite(scaleX)) {
              scaleX = 100;
            }
            if (!isFinite(scaleY)) {
              scaleY = 100;
            }
            println('Scale X=%d Y=%d.', scaleX, scaleY);
            item.resize(
                scaleX,
                scaleY,
                changePositionsCheck.value,
                changeFillPatternsCheck.value,
                changeFillGradientsCheck.value,
                changeStrokePatternsCheck.value,
                100,
                transformation,
            );
          }
      if (recursiveCheck.value) {
        Collections.forEachItem(selection, action);
      } else {
        Collections.forEach(selection, action);
      }

      prefs.setBoolean('option1', changePositionsCheck.value);
      prefs.setBoolean('option2', changeFillPatternsCheck.value);
      prefs.setBoolean('option3', changeFillGradientsCheck.value);
      prefs.setBoolean('option4', changeStrokePatternsCheck.value);
      prefs.setBoolean('recursive', recursiveCheck.value);
      return false;
    },
);
dialog.show();
