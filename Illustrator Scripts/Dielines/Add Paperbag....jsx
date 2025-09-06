//@target illustrator;
//@include '../.lib/commons.js';

var SIZE_TEXT_DIVIDER = [60, 21];
var SIZE_EDIT = [100, 21];

var dialog =
    new Dialog(R.string.add_paperbag_dielines, 'adding-measuring-dielines/#add-paperbag-dielines');
var widthEdit;
var heightEdit;
var depthEdit;
var upperEdit;
var lowerEdit;
var glueLengthEdit;
var glueShearEdit;
var strokeWeightEdit;
var strokeColorList;
var prefs = preferences2.resolve('dielines/add_paperbag');

dialog.vgroup(function(main) {
  main.vpanel(
      'Area',
      function(panel) {
        panel.alignChildren = 'right';
        panel.hgroup(function(line) {
          line.hgroup(function(group) {
            group.helpTips = R.string.tip_addpaperbagdielines_width;
            group.staticText(undefined, R.string.width).apply(HEADING);
            widthEdit =
                group
                    .editText(SIZE_EDIT, prefs.getString('width', '210 mm'))
                    .apply(function(it) {
                      it.validateUnits();
                      it.activate();
                    });
          });
          line.hgroup(function(group) {
            group.helpTips = R.string.tip_addpaperbagdielines_height;
            group.staticText(SIZE_TEXT_DIVIDER, R.string.height).apply(HEADING);
            heightEdit =
                group
                    .editText(SIZE_EDIT, prefs.getString('height', '297 mm'))
                    .apply(VALIDATE_UNITS);
          });
        });
        panel.hgroup(function(line) {
          line.hgroup(function(group) {
            group.helpTips = R.string.tip_addpaperbagdielines_depth;
            group.staticText(undefined, R.string.depth).apply(HEADING);
            depthEdit =
                group
                    .editText(SIZE_EDIT, prefs.getString('depth', '100 mm'))
                    .apply(VALIDATE_UNITS);
          });
        });
        panel.hgroup(function(line) {
          line.hgroup(function(group) {
            group.helpTips = R.string.tip_addpaperbagdielines_upper;
            group.staticText(undefined, R.string.upper).apply(HEADING);
            upperEdit =
                group
                    .editText(SIZE_EDIT, prefs.getString('upper', '30 mm'))
                    .apply(VALIDATE_UNITS);
          });
          line.hgroup(function(group) {
            group.helpTips = R.string.tip_addpaperbagdielines_lower;
            group.staticText(SIZE_TEXT_DIVIDER, R.string.lower).apply(HEADING);
            lowerEdit =
                group
                    .editText(SIZE_EDIT, prefs.getString('lower', '60 mm'))
                    .apply(VALIDATE_UNITS);
          });
        });
        panel.hgroup(function(line) {
          line.hgroup(function(group) {
            group.helpTips = R.string.tip_addpaperbagdielines_glue;
            group.staticText(undefined, R.string.glue).apply(HEADING);
            glueLengthEdit =
                group
                    .editText(SIZE_EDIT, prefs.getString('glue_length', '20 mm'))
                    .apply(VALIDATE_UNITS);
          });
          line.hgroup(function(group) {
            group.helpTips = R.string.tip_addpaperbagdielines_shear
            group.staticText(SIZE_TEXT_DIVIDER, R.string.shear).apply(HEADING);
            glueShearEdit =
                group
                    .editText(SIZE_EDIT, prefs.getString('glue_shear', '5 mm'))
                    .apply(VALIDATE_UNITS);
          });
        });
      },
  );
  main.vpanel(
      R.string.stroke,
      function(panel) {
        panel.hgroup(function(line) {
          line.hgroup(function(group) {
            group.helpTips = R.string.tip_addpaperbagdielines_strokeweight;
            group.staticText(undefined, R.string.weight).apply(HEADING);
            strokeWeightEdit =
                group
                    .editText(SIZE_EDIT, prefs.getString('stroke_weight', '1 pt'))
                    .apply(VALIDATE_UNITS);
          });
          line.hgroup(function(group) {
            group.helpTips = R.string.tip_addpaperbagdielines_strokecolor;
            group.staticText(SIZE_TEXT_DIVIDER, R.string.color).apply(HEADING);
            strokeColorList =
                group
                    .dropDownList(SIZE_EDIT, Color2.list())
                    .apply(function(it) {
                      it.selection = prefs.getInt('stroke_color');
                    });
          });
        });
      },
  );
});
dialog.setCancelButton();
dialog.setDefaultButton(
    R.string.full_size,
    function() {
      process(true);
      return false;
    },
);
dialog.setYesButton(
    R.string.half_size,
    function() {
      process(false);
      return false;
    },
);
dialog.show();

function process(isFull) {
  var width = parseUnits(widthEdit.text);
  var height = parseUnits(heightEdit.text);
  var depth = parseUnits(depthEdit.text);
  var upper = parseUnits(upperEdit.text);
  var lower = parseUnits(lowerEdit.text);
  var glueLength = parseUnits(glueLengthEdit.text);
  var glueShear = parseUnits(glueShearEdit.text);
  var weight = parseUnits(strokeWeightEdit.text);
  var color = Color2.find(strokeColorList.selection);

  var paths = [];
  var leftMost;
  var topMost;
  var bottomMost;
  var rightMost;
  document
      .artboards[document.artboards.getActiveArtboardIndex()]
      .artboardRect
      .run(function(it) {
        leftMost = it.getLeft() + it.getWidth() / 10;
        topMost = it.getTop() - it.getHeight() / 10;
      });
  if (isFull) {
    rightMost = leftMost + glueLength + (width + depth) * 2;
  } else {
    rightMost = leftMost + glueLength + width + depth;
  }
  bottomMost = topMost - upper - height - lower;

  // outer
  paths.push(
      createLine(
          weight,
          color,
          [
            [leftMost, topMost - glueShear],
            [leftMost + glueLength, topMost],
            [rightMost, topMost],
            [rightMost, bottomMost],
            [leftMost + glueLength, bottomMost],
            [leftMost, bottomMost + glueShear],
            [leftMost, topMost - glueShear],
          ],
      ),
  );

  // inner vertical
  paths.push(
      createDash(
          weight,
          color,
          [
            [leftMost + glueLength, topMost],
            [leftMost + glueLength, bottomMost],
          ],
      ),
  );
  paths.push(
      createDash(
          weight,
          color, [
            [leftMost + glueLength + width, topMost],
            [leftMost + glueLength + width, bottomMost],
          ],
      ),
  );
  paths.push(
      createDash(
          weight,
          color,
          [
            [leftMost + glueLength + width + depth * 0.5, topMost],
            [leftMost + glueLength + width + depth * 0.5, bottomMost],
          ],
      ),
  );
  if (isFull) {
    paths.push(
        createDash(
            weight,
            color,
            [
              [leftMost + glueLength + width + depth, topMost],
              [leftMost + glueLength + width + depth, bottomMost],
            ],
        ),
    );
    paths.push(
        createDash(
            weight,
            color,
            [
              [leftMost + glueLength + width * 2 + depth, topMost],
              [leftMost + glueLength + width * 2 + depth, bottomMost],
            ],
        ),
    );
    paths.push(
        createDash(
            weight,
            color,
            [
              [leftMost + glueLength + width * 2 + depth * 1.5, topMost],
              [leftMost + glueLength + width * 2 + depth * 1.5, bottomMost],
            ],
        ),
    );
  }

  // inner horizontal
  paths.push(
      createDash(
          weight,
          color,
          [
            [leftMost, topMost - upper],
            [rightMost, topMost - upper],
          ],
      ),
  );
  paths.push(
      createDash(
          weight,
          color,
          [
            [leftMost, topMost - upper - height + depth * 0.5],
            [rightMost, topMost - upper - height + depth * 0.5],
          ],
      ),
  );
  paths.push(
      createDash(
          weight,
          color,
          [
            [leftMost, topMost - upper - height],
            [rightMost, topMost - upper - height],
          ],
      ),
  );

  // inner diagonal
  var topDiagonal = topMost - upper - height + depth * 0.5;
  paths.push(
      createDash(
          weight,
          color,
          [
            [leftMost, bottomMost + lower + glueLength],
            [leftMost + glueLength + lower, bottomMost],
          ],
      ),
  );
  var secondDiagonalPoints = [];
  secondDiagonalPoints.push([leftMost + glueLength + width - lower, bottomMost]);
  secondDiagonalPoints.push([leftMost + glueLength + width + depth * 0.5, topDiagonal]);
  if (isFull) {
    secondDiagonalPoints.push([leftMost + glueLength + width + depth + lower, bottomMost]);
  } else {
    secondDiagonalPoints.push([rightMost, bottomMost + lower]);
  }
  paths.push(createDash(weight, color, secondDiagonalPoints));
  if (isFull) {
    paths.push(
        createDash(
            weight,
            color,
            [
              [leftMost + glueLength + width * 2 + depth - lower, bottomMost],
              [leftMost + glueLength + width * 2 + depth * 1.5, topDiagonal],
              [rightMost, bottomMost + lower],
            ],
        ),
    );
  }

  selection = paths;

  prefs.setString('width', widthEdit.text);
  prefs.setString('height', heightEdit.text);
  prefs.setString('depth', depthEdit.text);
  prefs.setString('upper', upperEdit.text);
  prefs.setString('lower', lowerEdit.text);
  prefs.setString('glue_length', glueLengthEdit.text);
  prefs.setString('glue_shear', glueShearEdit.text);
  prefs.setString('stroke_weight', strokeWeightEdit.text);
  prefs.setInt('stroke_color', strokeColorList.selection.index);
}

function createLine(weight, color, positions) {
  var path = layer.pathItems.add();
  path.filled = false;
  path.strokeDashes = [];
  path.strokeColor = color.get();
  path.strokeWidth = weight;
  path.setEntirePath(positions);
  path.closed = true;
  return path;
}

function createDash(weight, color, positions) {
  var path = layer.pathItems.add();
  path.filled = false;
  path.strokeDashOffset = 12;
  path.strokeDashes = [12];
  path.strokeColor = color.get();
  path.strokeWidth = weight;
  path.setEntirePath(positions);
  return path;
}
