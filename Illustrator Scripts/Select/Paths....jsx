// Select all PathItem with attributes matching user input.
// When there are active selection, will only select items within those selection.

//@target illustrator;
//@include '../.lib/commons.js';

var SIZE_INPUT = [110, 21];

var isFilterMode = Collections.isNotEmpty(selection);
if (isFilterMode) {
  check(
      Collections.anyItem(
          selection,
          function(it) {
            return Items.isPath(it);
          },
      ),
      getString(R.string.error_notypes_selection, getString(R.string.paths).toLowerCase()),
  );
} else {
  check(
      Collections.isNotEmpty(document.pathItems),
      getString(R.string.error_notypes_document, getString(R.string.paths).toLowerCase()),
  );
}

var dialog = new Dialog(R.string.select_paths, 'selecting-items/#select-paths');
var fillColorList;
var fillOverprintList;
var strokeColorList;
var strokeWeightEdit;
var strokeDashedList;
var strokeOverprintList;
var dimensionPanel;
var clippingList;
var closedList;
var guidesList;
var recursiveCheck;
var prefs = preferences2.resolve('select/paths');

dialog.vgroup(function(main) {
  main.hgroup(function(rootPane) {
    rootPane.alignChildren = 'top';
    rootPane.vgroup(function(leftPane) {
      leftPane.alignChildren = 'fill';
      leftPane.vpanel(
          R.string.fill,
          function(panel) {
            panel.alignChildren = 'right';
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selectpaths_fillcolor;
              group.staticText(undefined, R.string.color).apply(HEADING);
              fillColorList = group.dropDownList(SIZE_INPUT, Color2.list());
            });
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selectpaths_filloverprint;
              group.staticText(undefined, R.string.overprint).apply(HEADING);
              fillOverprintList = group.dropDownList(SIZE_INPUT, SelectOption.list());
            });
          },
      );
      leftPane.vpanel(
          R.string.stroke,
          function(panel) {
            panel.alignChildren = 'right';
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selectpaths_strokecolor;
              group.staticText(undefined, R.string.color).apply(HEADING);
              strokeColorList = group.dropDownList(SIZE_INPUT, Color2.list());
            });
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selectpaths_strokeweight;
              group.staticText(undefined, R.string.weight).apply(HEADING);
              strokeWeightEdit =
                  group
                      .editText(SIZE_INPUT)
                      .apply(function(it) {
                        it.validateUnits();
                        it.activate();
                      });
            });
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selectpaths_strokedashed;
              group.staticText(undefined, R.string.dashed).apply(HEADING);
              strokeDashedList = group.dropDownList(SIZE_INPUT, SelectOption.list());
            });
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selectpaths_strokeoverprint;
              group.staticText(undefined, R.string.overprint).apply(HEADING);
              strokeOverprintList = group.dropDownList(SIZE_INPUT, SelectOption.list());
            });
          },
      );
    });
    rootPane.vgroup(function(rightPane) {
      rightPane.alignChildren = 'fill';
      dimensionPanel = new SelectDimensionPanel(rightPane, SIZE_INPUT);
      rightPane.vpanel(
          R.string.others,
          function(panel) {
            panel.alignChildren = 'right';
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selectpaths_clipping;
              group.staticText(undefined, R.string.clipping).apply(HEADING);
              clippingList = group.dropDownList(SIZE_INPUT, SelectOption.list());
            });
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selectpaths_closed;
              group.staticText(undefined, R.string.closed).apply(HEADING);
              closedList = group.dropDownList(SIZE_INPUT, SelectOption.list());
            });
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selectpaths_guides;
              group.staticText(undefined, R.string.guides).apply(HEADING);
              guidesList = group.dropDownList(SIZE_INPUT, SelectOption.list());
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
      var fillColor =
          fillColorList.hasSelection() ? Color2.find(fillColorList.selection) : undefined;
      var fillOverprint =
          fillOverprintList.hasSelection()
              ? SelectOption.isYes(fillOverprintList.selection)
              : undefined;
      var strokeColor =
          strokeColorList.hasSelection() ? Color2.find(strokeColorList.selection) : undefined;
      var strokeWeight = parseUnits(strokeWeightEdit.text);
      var strokeDashed =
          strokeDashedList.hasSelection()
              ? SelectOption.isYes(strokeDashedList.selection)
              : undefined;
      var strokeOverprint =
          strokeOverprintList.hasSelection()
              ? SelectOption.isYes(strokeOverprintList.selection)
              : undefined;
      var width = dimensionPanel.getWidth();
      var height = dimensionPanel.getHeight();
      var clipping =
          clippingList.hasSelection() ? SelectOption.isYes(clippingList.selection) : undefined;
      var closed = closedList.hasSelection() ? SelectOption.isYes(closedList.selection) : undefined;
      var guides = guidesList.hasSelection() ? SelectOption.isYes(guidesList.selection) : undefined;
      selectAll(
          ['PathItem'],
          function(item) {
            if (width !== undefined && parseInt(width) !== parseInt(item.width)) return false;
            if (height !== undefined && parseInt(height) !== parseInt(item.height)) return false;
            if (clipping !== undefined && clipping !== item.clipping) return false;
            if (closed !== undefined && closed !== item.closed) return false;
            if (guides !== undefined && guides !== item.guides) return false;
            if (fillColor !== undefined &&
                item.filled &&
                !isColorEqual(fillColor.get(), item.fillColor)
            ) {
              return false;
            }
            if (fillOverprint !== undefined && fillOverprint !== item.fillOverprint) return false;
            if (strokeColor !== undefined && item.stroked &&
                !isColorEqual(strokeColor.get(), item.strokeColor)) {
              return false;
            }
            if (strokeWeight !== undefined &&
                parseInt(strokeWeight) !== parseInt(item.strokeWidth)
            ) {
              return false;
            }
            if (strokeDashed !== undefined &&
                strokeDashed !== Collections.isNotEmpty(item.strokeDashes)
            ) {
              return false;
            }
            if (strokeOverprint !== undefined && strokeOverprint !== item.strokeOverprint) {
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
