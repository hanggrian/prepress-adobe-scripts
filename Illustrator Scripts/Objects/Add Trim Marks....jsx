//@target illustrator;
//@include '../.lib/commons.js';

checkAnySelection();

var SIZE_INPUT = [110, 21];
var SIZE_CHECK = [15, 15]; // usually 14, but need to stretch the size equalling left panel

var dialog = new Dialog(R.string.add_trim_marks, 'add-trim-marks/');
var offsetEdit;
var lengthEdit;
var weightEdit;
var colorList;
var topLeftMarkCheck;
var topMarksCheck;
var topRightMarkCheck;
var rightTopMarkCheck;
var rightMarksCheck;
var rightBottomMarkCheck;
var leftTopMarkCheck;
var leftMarksCheck;
var leftBottomMarkCheck;
var bottomLeftMarkCheck;
var bottomMarksCheck;
var bottomRightMarkCheck;
var multipleMultiRadioGroup;
var prefs = preferences2.resolve('objects/add_trim_marks');

dialog.vgroup(function(main) {
  main.hgroup(function(rootPane) {
    rootPane.alignChildren = 'fill';
    rootPane.vpanel(
        R.string.trim_marks,
        function(panel) {
          panel.alignChildren = 'right';
          panel.hgroup(function(group) {
            group.helpTips = R.string.tip_addtrimmarks_offset;
            group.staticText(undefined, R.string.offset).apply(HEADING);
            offsetEdit =
                group
                    .editText(SIZE_INPUT, prefs.getString('offset', '2.5 mm'))
                    .apply(function(it) {
                      it.validateUnits();
                      it.activate();
                    });
          });
          panel.hgroup(function(group) {
            group.helpTips = R.string.tip_addtrimmarks_length;
            group.staticText(undefined, R.string.length).apply(HEADING);
            lengthEdit =
                group
                    .editText(SIZE_INPUT, prefs.getString('length', '2.5 mm'))
                    .apply(VALIDATE_UNITS);
          });
          panel.hgroup(function(group) {
            group.helpTips = R.string.tip_addtrimmarks_weight;
            group.staticText(undefined, R.string.weight).apply(HEADING);
            weightEdit =
                group
                    .editText(SIZE_INPUT, prefs.getString('weight', '0.3 pt'))
                    .apply(VALIDATE_UNITS); // the same value used in `Object > Create Trim Marks`
          });
          panel.hgroup(function(group) {
            group.helpTips = R.string.tip_addtrimmarks_color;
            group.staticText(undefined, R.string.color).apply(HEADING);
            colorList =
                group
                    .dropDownList(SIZE_INPUT, Color2.list())
                    .apply(function(it) {
                      it.selection = prefs.getInt('color');
                    });
          });
        },
    );
    rootPane.vpanel(
        R.string.locations,
        function(panel) {
          panel.hgroup(function(group) {
            group.staticText(SIZE_CHECK);
            topLeftMarkCheck =
                group
                    .checkBox(SIZE_CHECK)
                    .apply(function(it) {
                      it.select();
                      it.helpTip = R.string.tip_addtrimmarks_markcheck;
                    });
            topMarksCheck =
                group
                    .checkBox(SIZE_CHECK)
                    .apply(function(it) {
                      it.select();
                      it.helpTip = R.string.tip_addtrimmarks_markscheck;
                      it.visible = false;
                    });
            topRightMarkCheck =
                group
                    .checkBox(SIZE_CHECK)
                    .apply(function(it) {
                      it.select();
                      it.helpTip = R.string.tip_addtrimmarks_markcheck;
                    });
            group.staticText(SIZE_CHECK);
          });
          panel.hgroup(function(group) {
            leftTopMarkCheck =
                group
                    .checkBox(SIZE_CHECK)
                    .apply(function(it) {
                      it.select();
                      it.helpTip = R.string.tip_addtrimmarks_markcheck;
                    });
            group
                .iconButton(SIZE_CHECK, 'ic_arrow_topleft', STYLE_TOOLBUTTON)
                .apply(function(it) {
                  it.addClickListener(function() {
                    toggleChecks([topLeftMarkCheck, leftTopMarkCheck]);
                  });
                });
            group
                .iconButton(SIZE_CHECK, 'ic_arrow_top', STYLE_TOOLBUTTON)
                .apply(function(it) {
                  it.addClickListener(function() {
                    toggleChecks([topLeftMarkCheck, topMarksCheck, topRightMarkCheck]);
                  });
                });
            group
                .iconButton(SIZE_CHECK, 'ic_arrow_topright', STYLE_TOOLBUTTON)
                .apply(function(it) {
                  it.addClickListener(function() {
                    toggleChecks([topRightMarkCheck, rightTopMarkCheck]);
                  });
                });
            rightTopMarkCheck =
                group
                    .checkBox(SIZE_CHECK)
                    .apply(function(it) {
                      it.select();
                      it.helpTip = R.string.tip_addtrimmarks_markcheck;
                    });
          });
          panel.hgroup(function(group) {
            leftMarksCheck =
                group
                    .checkBox(SIZE_CHECK)
                    .apply(function(it) {
                      it.select();
                      it.helpTip = R.string.tip_addtrimmarks_markscheck;
                      it.visible = false;
                    });
            group
                .iconButton(SIZE_CHECK, 'ic_arrow_left', STYLE_TOOLBUTTON)
                .apply(function(it) {
                  it.addClickListener(function() {
                    toggleChecks([leftTopMarkCheck, leftMarksCheck, leftBottomMarkCheck]);
                  });
                });
            group
                .iconButton(SIZE_CHECK, 'ic_arrow_center', STYLE_TOOLBUTTON)
                .apply(function(it) {
                  it.addClickListener(function() {
                    toggleChecks([
                      topLeftMarkCheck,
                      topMarksCheck,
                      topRightMarkCheck,
                      rightTopMarkCheck,
                      rightMarksCheck,
                      rightBottomMarkCheck,
                      leftTopMarkCheck,
                      leftMarksCheck,
                      leftBottomMarkCheck,
                      bottomLeftMarkCheck,
                      bottomMarksCheck,
                      bottomRightMarkCheck,
                    ]);
                  });
                });
            group
                .iconButton(SIZE_CHECK, 'ic_arrow_right', STYLE_TOOLBUTTON)
                .apply(function(it) {
                  it.addClickListener(function() {
                    toggleChecks([rightTopMarkCheck, rightMarksCheck, rightBottomMarkCheck]);
                  });
                });
            rightMarksCheck =
                group
                    .checkBox(SIZE_CHECK)
                    .apply(function(it) {
                      it.select();
                      it.helpTip = R.string.tip_addtrimmarks_markscheck;
                      it.visible = false;
                    });
          });
          panel.hgroup(function(group) {
            leftBottomMarkCheck =
                group
                    .checkBox(SIZE_CHECK)
                    .apply(function(it) {
                      it.select();
                      it.helpTip = R.string.tip_addtrimmarks_markcheck;
                    });
            group
                .iconButton(SIZE_CHECK, 'ic_arrow_bottomleft', STYLE_TOOLBUTTON)
                .apply(function(it) {
                  it.addClickListener(function() {
                    toggleChecks([leftBottomMarkCheck, bottomLeftMarkCheck]);
                  });
                });
            group
                .iconButton(SIZE_CHECK, 'ic_arrow_bottom', STYLE_TOOLBUTTON)
                .apply(function(it) {
                  it.addClickListener(function() {
                    toggleChecks([bottomLeftMarkCheck, bottomMarksCheck, bottomRightMarkCheck]);
                  });
                });
            group
                .iconButton(SIZE_CHECK, 'ic_arrow_bottomright', STYLE_TOOLBUTTON)
                .apply(function(it) {
                  it.addClickListener(function() {
                    toggleChecks([rightBottomMarkCheck, bottomRightMarkCheck]);
                  });
                });
            rightBottomMarkCheck =
                group
                    .checkBox(SIZE_CHECK)
                    .apply(function(it) {
                      it.select();
                      it.helpTip = R.string.tip_addtrimmarks_markcheck;
                    });
          });
          panel.hgroup(function(group) {
            group.staticText(SIZE_CHECK)
            bottomLeftMarkCheck =
                group
                    .checkBox(SIZE_CHECK)
                    .apply(function(it) {
                      it.select();
                      it.helpTip = R.string.tip_addtrimmarks_markcheck;
                    });
            bottomMarksCheck =
                group
                    .checkBox(SIZE_CHECK)
                    .apply(function(it) {
                      it.select();
                      it.helpTip = R.string.tip_addtrimmarks_markscheck;
                      it.visible = false;
                    });
            bottomRightMarkCheck =
                group
                    .checkBox(SIZE_CHECK)
                    .apply(function(it) {
                      it.select();
                      it.helpTip = R.string.tip_addtrimmarks_markcheck;
                    });
            group.staticText(SIZE_CHECK);
          });
        },
    );
  });
  multipleMultiRadioGroup =
      new MultiRadioGroup(main, R.string.multiple_target, [R.string.default, R.string.recursive])
          .apply(function(it) {
            it.alignment = 'right';
            it.setHelpTips(R.string.tip_addtrimmarks_multipletarget);
            it.check.addClickListener(function() {
              leftMarksCheck.visible = it.isSelected();
              topMarksCheck.visible = it.isSelected();
              rightMarksCheck.visible = it.isSelected();
              bottomMarksCheck.visible = it.isSelected();
            });
          });
});
dialog.setCancelButton();
dialog.setDefaultButton(
    undefined,
    function() {
      var offset = parseUnits(offsetEdit.text);
      var length = parseUnits(lengthEdit.text);
      var weight = parseUnits(weightEdit.text);
      var color = Color2.find(colorList.selection);
      var maxBounds = Items.getMaxBounds(selection);

      // list all trim marks that will be generated
      var trimMarks = calculateSingleTarget(offset, length, weight, color, maxBounds);
      if (multipleMultiRadioGroup.isSelected()) {
        trimMarks =
            trimMarks.concat(calculateMultipleTarget(offset, length, weight, color, maxBounds));
      }
      // remove duplicates, and generate
      var addedTrimMarks = [];
      Collections.forEach(
          trimMarks,
          function(trimMark) {
            if (!hasDuplicate(addedTrimMarks, trimMark)) {
              addedTrimMarks.push(trimMark);
              trimMark.create();
            }
          },
      );

      prefs.setString('offset', offsetEdit.text);
      prefs.setString('length', lengthEdit.text);
      prefs.setString('weight', weightEdit.text);
      prefs.setInt('color', colorList.selection.index);
      return false;
    },
);
dialog.show();

function toggleChecks(checks) {
  var anySelected =
      Collections.any(
          checks,
          function(it) {
            return it.value;
          },
      );
  Collections.forEach(
      checks,
      function(it) {
        it.value = !anySelected;
      },
  );
}

function calculateSingleTarget(offset, length, weight, color, maxBounds) {
  var result = [];
  if (topLeftMarkCheck.value) {
    result.push(
        new TrimMark(
            weight,
            color,
            'TOP_LEFT',
            maxBounds.getLeft(), maxBounds.getTop() + offset,
            maxBounds.getLeft(), maxBounds.getTop() + offset + length,
        ),
    );
  }
  if (topRightMarkCheck.value) {
    result.push(
        new TrimMark(
            weight,
            color,
            'TOP_RIGHT',
            maxBounds.getRight(), maxBounds.getTop() + offset,
            maxBounds.getRight(), maxBounds.getTop() + offset + length,
        ),
    );
  }
  if (rightTopMarkCheck.value) {
    result.push(
        new TrimMark(
            weight,
            color,
            'RIGHT_TOP',
            maxBounds.getRight() + offset, maxBounds.getTop(),
            maxBounds.getRight() + offset + length, maxBounds.getTop(),
        ),
    );
  }
  if (rightBottomMarkCheck.value) {
    result.push(
        new TrimMark(
            weight,
            color,
            'RIGHT_BOTTOM',
            maxBounds.getRight() + offset, maxBounds.getBottom(),
            maxBounds.getRight() + offset + length, maxBounds.getBottom(),
        ),
    );
  }
  if (bottomRightMarkCheck.value) {
    result.push(
        new TrimMark(
            weight,
            color,
            'BOTTOM_RIGHT',
            maxBounds.getRight(), maxBounds.getBottom() - offset,
            maxBounds.getRight(), maxBounds.getBottom() - offset - length,
        ),
    );
  }
  if (bottomLeftMarkCheck.value) {
    result.push(
        new TrimMark(
            weight,
            color,
            'BOTTOM_LEFT',
            maxBounds.getLeft(), maxBounds.getBottom() - offset,
            maxBounds.getLeft(), maxBounds.getBottom() - offset - length,
        ),
    );
  }
  if (leftBottomMarkCheck.value) {
    result.push(
        new TrimMark(
            weight,
            color,
            'LEFT_BOTTOM',
            maxBounds.getLeft() - offset, maxBounds.getBottom(),
            maxBounds.getLeft() - offset - length, maxBounds.getBottom(),
        ),
    );
  }
  if (leftTopMarkCheck.value) {
    result.push(
        new TrimMark(
            weight,
            color,
            'LEFT_TOP',
            maxBounds.getLeft() - offset, maxBounds.getTop(),
            maxBounds.getLeft() - offset - length, maxBounds.getTop(),
        ),
    );
  }
  return result;
}

function calculateMultipleTarget(offset, length, weight, color, maxBounds) {
  var result = [];
  var action =
      function(item) {
        var clippingItem = Items.getClippingItem(item);
        var width = clippingItem.width;
        var height = clippingItem.height;
        var itemStartX = clippingItem.position.getLeft();
        var itemStartY = clippingItem.position.getTop();
        var itemEndX = itemStartX + width;
        var itemEndY = itemStartY - height;
        if (topMarksCheck.value) {
          if (itemStartX !== maxBounds.getLeft()) {
            result.push(
                new TrimMark(
                    weight,
                    color,
                    'TOP',
                    itemStartX, maxBounds.getTop() + offset,
                    itemStartX, maxBounds.getTop() + offset + length,
                ),
            );
          }
          if (itemEndX !== maxBounds.getRight()) {
            result.push(
                new TrimMark(
                    weight,
                    color,
                    'TOP',
                    itemEndX, maxBounds.getTop() + offset,
                    itemEndX, maxBounds.getTop() + offset + length,
                ),
            );
          }
        }
        if (rightMarksCheck.value) {
          if (itemStartY !== maxBounds.getTop()) {
            result.push(
                new TrimMark(
                    weight,
                    color,
                    'RIGHT',
                    maxBounds.getRight() + offset, itemStartY,
                    maxBounds.getRight() + offset + length, itemStartY,
                ),
            );
          }
          if (itemEndY !== maxBounds.getBottom()) {
            result.push(
                new TrimMark(
                    weight,
                    color,
                    'RIGHT',
                    maxBounds.getRight() + offset, itemEndY,
                    maxBounds.getRight() + offset + length, itemEndY,
                ),
            );
          }
        }
        if (bottomMarksCheck.value) {
          if (itemEndX !== maxBounds.getRight()) {
            result.push(
                new TrimMark(
                    weight,
                    color,
                    'BOTTOM',
                    itemEndX, maxBounds.getBottom() - offset,
                    itemEndX, maxBounds.getBottom() - offset - length,
                ),
            );
          }
          if (itemStartX !== maxBounds.getLeft()) {
            result.push(
                new TrimMark(
                    weight,
                    color,
                    'BOTTOM',
                    itemStartX, maxBounds.getBottom() - offset,
                    itemStartX, maxBounds.getBottom() - offset - length,
                ),
            );
          }
        }
        if (leftMarksCheck.value) {
          if (itemEndY !== maxBounds.getBottom()) {
            result.push(
                new TrimMark(
                    weight,
                    color,
                    'LEFT',
                    maxBounds.getLeft() - offset, itemEndY,
                    maxBounds.getLeft() - offset - length, itemEndY,
                ),
            );
          }
          if (itemStartY !== maxBounds.getTop()) {
            result.push(
                new TrimMark(
                    weight,
                    color,
                    'LEFT',
                    maxBounds.getLeft() - offset, itemStartY,
                    maxBounds.getLeft() - offset - length, itemStartY,
                ),
            );
          }
        }
      };
  if (multipleMultiRadioGroup.getSelectedRadioIndex() === 1) {
    Collections.forEachItem(selection, action);
  } else {
    Collections.forEach(selection, action);
  }
  return result;
}

function hasDuplicate(trimMarks, trimMark) {
  var i = trimMarks.length;
  while (i--) {
    var otherTrimMark = trimMarks[i];
    if (parseInt(otherTrimMark.fromX) === parseInt(trimMark.fromX) &&
        parseInt(trimMark.fromY) === parseInt(otherTrimMark.fromY) &&
        parseInt(trimMark.toX) === parseInt(otherTrimMark.toX) &&
        parseInt(trimMark.toY) === parseInt(otherTrimMark.toY)
    ) {
      return true;
    }
  }
  return false;
}

function TrimMark(weight, color, suffixName, fromX, fromY, toX, toY) {
  var self = this;
  self.fromX = fromX;
  self.fromY = fromY;
  self.toX = toX;
  self.toY = toY;

  this.create =
      function() {
        println('%d. From [%d, %d] to [%d, %d].', suffixName, fromX, fromY, toX, toY);
        var path = layer.pathItems.add();
        path.name = 'Trim' + suffixName;
        path.filled = false;
        path.strokeDashes = [];
        path.strokeColor = color.get();
        path.strokeWidth = weight;
        path.setEntirePath([[fromX, fromY], [toX, toY]]);
        return path;
      };
}
