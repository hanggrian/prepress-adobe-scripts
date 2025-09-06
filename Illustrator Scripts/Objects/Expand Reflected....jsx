//@target illustrator;
//@include '../.lib/commons.js';

checkAnySelection();

var SIZE_CHECK = [14, 14];
var SPACING_LOCATIONS = 14;

var dialog = new Dialog(R.string.expand_reflected, 'expanding-with-reflections/');
var clipObjectsCheck;
var paddingGroup;
var topLeftCheck;
var topCheck;
var topRightCheck;
var leftCheck;
var rightCheck;
var bottomLeftCheck;
var bottomCheck;
var bottomRightCheck;
var recursiveCheck;
var useGuidesCheck;
var prefs = preferences2.resolve('objects/expand_reflected');
var progress;

dialog.vgroup(function(main) {
  main.hgroup(function(rootPane) {
    rootPane.alignChildren = 'fill';
    rootPane.vpanel(
        R.string.expand,
        function(panel) {
          panel.alignChildren = 'left';
          clipObjectsCheck =
              panel
                  .checkBox(undefined, R.string.clip_objects)
                  .apply(function(it) {
                    it.helpTip = R.string.tip_expandreflected_clipobjects;
                    it.select();
                    it.addClickListener(function() {
                      paddingGroup.enabled = it.value;
                    });
                  });
          paddingGroup =
              new PaddingGroup(panel).apply(function(group) {
                group.paddingEdit.activate();
                group.paddingEdit.text = prefs.getString('padding', '2.5 mm');
              });
        },
    );
    rootPane.vpanel(
        R.string.locations,
        function(panel) {
          panel.spacing = SPACING_LOCATIONS;
          panel.hgroup(function(group) {
            group.spacing = SPACING_LOCATIONS;
            group.helpTips = R.string.tip_expandreflected_locations;
            topLeftCheck = group.checkBox(SIZE_CHECK).apply(SELECTED);
            topCheck = group.checkBox(SIZE_CHECK).apply(SELECTED);
            topRightCheck = group.checkBox(SIZE_CHECK).apply(SELECTED);
          });
          panel.hgroup(function(group) {
            group.spacing = SPACING_LOCATIONS;
            group.helpTips = R.string.tip_expandreflected_locations;
            leftCheck = group.checkBox(SIZE_CHECK).apply(SELECTED);
            group
                .iconButton(SIZE_CHECK, 'ic_arrow_center', STYLE_TOOLBUTTON)
                .apply(function(it) {
                  it.addClickListener(function() {
                    toggleChecks();
                  });
                });
            rightCheck = group.checkBox(SIZE_CHECK).apply(SELECTED);
          });
          panel.hgroup(function(group) {
            group.spacing = SPACING_LOCATIONS;
            group.helpTips = R.string.tip_expandreflected_locations;
            bottomLeftCheck = group.checkBox(SIZE_CHECK).apply(SELECTED);
            bottomCheck = group.checkBox(SIZE_CHECK).apply(SELECTED);
            bottomRightCheck = group.checkBox(SIZE_CHECK).apply(SELECTED);
          });
        },
    );
  });
  main.hgroup(function(group) {
    group.alignment = 'right';
    useGuidesCheck =
        group
            .checkBox(undefined, R.string.use_guides)
            .apply(function(it) {
              it.helpTip = R.string.tip_expandreflected_useguides;
              it.value = prefs.getBoolean('use_guides');
            });
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
      progress = new ProgressPalette(selection.length, R.string.expanding);
      if (recursiveCheck.value) {
        Collections.forEachItem(selection, process);
      } else {
        Collections.forEach(selection, process);
      }

      prefs.setString('padding', paddingGroup.paddingEdit.text);
      prefs.setBoolean('use_guides', useGuidesCheck.value);
      prefs.setBoolean('recursive', recursiveCheck.value);
      return false;
    },
);
dialog.show();

function process(item) {
  progress.increment();
  var x = item.position.getLeft();
  var y = item.position.getTop();
  var width = item.width;
  var height = item.height;

  var originalParent;
  var clippingGroup;
  if (clipObjectsCheck.value) {
    originalParent = item.parent;
    clippingGroup = document.groupItems.add();
    item.moveToBeginning(clippingGroup); // also include main item
  }

  if (topLeftCheck.value) duplicate(item, x - width, y + height, true, true, clippingGroup);
  if (topCheck.value) duplicate(item, x, y + height, false, true, clippingGroup);
  if (topRightCheck.value) duplicate(item, x + width, y + height, true, true, clippingGroup);
  if (leftCheck.value) duplicate(item, x - width, y, true, false, clippingGroup);
  if (rightCheck.value) duplicate(item, x + width, y, true, false, clippingGroup);
  if (bottomLeftCheck.value) duplicate(item, x - width, y - height, true, true, clippingGroup);
  if (bottomCheck.value) duplicate(item, x, y - height, false, true, clippingGroup);
  if (bottomRightCheck.value) duplicate(item, x + width, y - height, true, true, clippingGroup);

  if (clipObjectsCheck.value) {
    var padding = paddingGroup.get();
    var clip =
        document.pathItems.rectangle(
            y + padding,
            x - padding,
            width + padding * 2,
            height + padding * 2,
        );
    clip.clipping = true;
    clip.moveToBeginning(clippingGroup);

    clippingGroup.clipped = true;
    clippingGroup.moveToBeginning(originalParent);
  }

  if (useGuidesCheck.value) {
    var guide = document.pathItems.rectangle(y, x, width, height);
    guide.filled = false;
    guide.guides = true;
  }
}

function duplicate(item, x, y, flipHorizontal, flipVertical, group) {
  var duplicatedItem = item.duplicate(layer, ElementPlacement.PLACEATBEGINNING);
  duplicatedItem.position = [x, y];
  if (flipHorizontal) {
    flip(duplicatedItem, true);
  }
  if (flipVertical) {
    flip(duplicatedItem, false);
  }
  if (group !== undefined) {
    duplicatedItem.moveToBeginning(group);
  }
  return duplicatedItem;
}

function flip(item, isHorizontal) {
  var matrix = new Matrix();
  matrix.mValueA = isHorizontal ? -1 : 1;
  matrix.mValueB = 0;
  matrix.mValueC = 0;
  matrix.mValueD = isHorizontal ? 1 : -1;
  matrix.mValueTX = 0;
  matrix.mValueTY = 0;
  item.transform(matrix, true, true, true, true, 1);
}

function toggleChecks() {
  var checks = [
    topLeftCheck,
    topCheck,
    topRightCheck,
    leftCheck,
    rightCheck,
    bottomLeftCheck,
    bottomCheck,
    bottomRightCheck,
  ];
  var anySelected =
      Collections.any(
          checks,
          function(it) {
            return it.value
          },
      );
  Collections.forEach(
      checks,
      function(it) {
        it.value = !anySelected
      },
  );
}
