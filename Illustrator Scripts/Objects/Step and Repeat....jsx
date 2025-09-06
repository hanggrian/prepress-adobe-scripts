//@target illustrator;
//@include '../.lib/commons.js';

var SIZE_INPUT = [40, 21];
var SIZE_INPUT_MOVE = [120, 21];

checkAnySelection();

var dialog = new Dialog(R.string.step_and_repeat, 'step-and-repeat/');
var horizontalEdit;
var verticalEdit;
var moveHorizontalEdit;
var moveVerticalEdit;
var moveRelativeCheck;
var prefs = preferences2.resolve('objects/step_and_repeat');

var bounds = Items.getMaxBounds(selection);
dialog.vgroup(function(main) {
  main.hgroup(function(group) {
    group.helpTips = R.string.tip_stepandrepeat_copies;
    group.staticText(undefined, R.string.copies).apply(HEADING);
    horizontalEdit =
        group
            .editText(SIZE_INPUT, prefs.getInt('horizontal').toString())
            .apply(function(it) {
              it.validateDigits();
              it.activate();
            });
    group.staticText(undefined, '×');
    verticalEdit =
        group
            .editText(SIZE_INPUT, prefs.getInt('vertical').toString())
            .apply(VALIDATE_DIGITS);
  });
  main.vpanel(
      R.string.move,
      function(panel) {
        panel.alignChildren = 'right';
        panel.hgroup(function(group) {
          group.helpTips = R.string.tip_stepandrepeat_horizontal;
          group.staticText(undefined, R.string.horizontal).apply(HEADING);
          moveHorizontalEdit =
              group
                  .editText(SIZE_INPUT_MOVE, formatUnits(bounds.getWidth(), unitType, 2))
                  .apply(VALIDATE_UNITS);
        });
        panel.hgroup(function(group) {
          group.helpTips = R.string.tip_stepandrepeat_vertical;
          group.staticText(undefined, R.string.vertical).apply(HEADING);
          moveVerticalEdit =
              group
                  .editText(SIZE_INPUT_MOVE, formatUnits(bounds.getHeight(), unitType, 2))
                  .apply(VALIDATE_UNITS);
        });
        moveRelativeCheck =
            panel
                .checkBox(undefined, R.string.relative_position)
                .apply(function(it) {
                  it.helpTip = R.string.tip_stepandrepeat_relativeposition;
                  it.addClickListener(function() {
                    if (it.value) {
                      moveHorizontalEdit.text = '0 ' + unitType.qualifier;
                      moveVerticalEdit.text = '0 ' + unitType.qualifier;
                    } else {
                      moveHorizontalEdit.text = formatUnits(bounds.getWidth(), unitType, 2);
                      moveVerticalEdit.text = formatUnits(bounds.getHeight(), unitType, 2);
                    }
                    moveHorizontalEdit.activate();
                  });
                });
      },
  );
});
dialog.setCancelButton();
dialog.setDefaultButton(
    undefined,
    function() {
      var horizontal = parseInt(horizontalEdit.text) || 0;
      var vertical = parseInt(verticalEdit.text) || 0;
      var moveHorizontal = parseUnits(moveHorizontalEdit.text);
      var moveVertical = parseUnits(moveVerticalEdit.text);

      if (horizontal < 1 || vertical < 1) {
        Windows.alert(R.string.error_stepandrepeat, dialog.text, true);
        return true;
      }

      var readOnlySelection = selection;

      // vertical starts with 0 because the starting point doesn't change
      for (var v = 0; v < vertical; v++) {
        print(v + '. ');
        var finalMoveVertical = moveVertical;
        if (moveRelativeCheck.value) {
          finalMoveVertical += bounds.getHeight();
        }
        if (v !== 0) { // skip first
          Collections.forEach(
              Collections.reversed(readOnlySelection),
              function(item) {
                var x = bounds.getLeft() - (bounds.getLeft() - item.position.getLeft());
                var y = bounds.getTop() - (bounds.getTop() - item.position.getTop());
                item.duplicate(layer, ElementPlacement.PLACEATBEGINNING).position = [
                  x,
                  y - v * finalMoveVertical,
                ];
              },
          );
        }
        for (var h = 1; h < horizontal; h++) {
          print(h + ' ');
          var finalMoveHorizontal = moveHorizontal;
          if (moveRelativeCheck.value) {
            finalMoveHorizontal += bounds.getWidth();
          }
          Collections.forEach(
              Collections.reversed(readOnlySelection),
              function(item) {
                var x = bounds.getLeft() - (bounds.getLeft() - item.position.getLeft());
                var y = bounds.getTop() - (bounds.getTop() - item.position.getTop());
                item.duplicate(layer, ElementPlacement.PLACEATBEGINNING).position = [
                  x + h * finalMoveHorizontal,
                  y - v * finalMoveVertical
                ];
              },
          );
        }
        println();
      }

      prefs.setInt('horizontal', horizontal);
      prefs.setInt('vertical', vertical);
      return false;
    },
);
dialog.show();
