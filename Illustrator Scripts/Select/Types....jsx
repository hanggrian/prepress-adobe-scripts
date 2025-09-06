// Select all TextFrame with attributes matching user input.
// When there are active selection, will only select items within those selection.

//@target illustrator;
//@include '../.lib/commons.js';

var Kind =
    new Enum({
      POINT_TEXT: {text: R.string.point_text, value: TextType.POINTTEXT},
      AREA_TEXT: {text: R.string.area_text, value: TextType.AREATEXT},
      PATH_TEXT: {text: R.string.path_text, value: TextType.PATHTEXT},
    });

var Orientation =
    new Enum({
      HORIZONTAL: {text: R.string.horizontal, value: TextOrientation.HORIZONTAL},
      VERTICAL: {text: R.string.vertical, value: TextOrientation.VERTICAL},
    });

var SIZE_INPUT_LEFT = [100, 21];
var SIZE_INPUT_RIGHT = [110, 21];

var isFilterMode = Collections.isNotEmpty(selection);
if (isFilterMode) {
  check(
      Collections.anyItem(
          selection,
          function(it) {
            return Items.isText(it);
          },
      ),
      getString(R.string.error_notypes_selection, getString(R.string.types).toLowerCase()),
  );
} else {
  check(
      Collections.isNotEmpty(document.textFrames),
      getString(R.string.error_notypes_document, getString(R.string.types).toLowerCase()),
  );
}

var dialog = new Dialog(R.string.select_types, 'selecting-items/#select-types');
var findEdit;
var matchCaseCheck;
var matchWordCheck;
var fontNameEdit;
var fontSizeEdit;
var italicList;
var underlineList;
var fillColorList;
var strokeColorList;
var kindList;
var orientationList;
var recursiveCheck;
var prefs = preferences2.resolve('select/types');

dialog.vgroup(function(main) {
  main.hgroup(function(rootPane) {
    rootPane.alignChildren = 'top';
    rootPane.vgroup(function(leftPane) {
      leftPane.alignChildren = 'fill';
      leftPane.vpanel(
          R.string.content,
          function(panel) {
            panel.alignChildren = 'left';
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selecttypes_content;
              group.staticText(undefined, R.string.find).apply(HEADING);
              findEdit = group.editText([150, 21]).apply(ACTIVATE);
            });
            matchCaseCheck = panel.checkBox(undefined, R.string.match_case);
            matchWordCheck = panel.checkBox(undefined, R.string.match_whole_word);
          },
      );
      leftPane.vpanel(
          R.string.character,
          function(panel) {
            panel.alignChildren = 'right';
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selecttypes_fontname;
              group.staticText(undefined, R.string.font_name).apply(HEADING);
              fontNameEdit = group.editText(SIZE_INPUT_LEFT);
            });
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selecttypes_fontsize;
              group.staticText(undefined, R.string.font_size).apply(HEADING);
              fontSizeEdit = group.editText(SIZE_INPUT_LEFT).apply(VALIDATE_UNITS);
            });
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selecttypes_italic;
              group.staticText(undefined, R.string.italic).apply(HEADING);
              italicList = group.dropDownList(SIZE_INPUT_LEFT, SelectOption.list());
            });
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selecttypes_underline;
              group.staticText(undefined, R.string.underline).apply(HEADING);
              underlineList = group.dropDownList(SIZE_INPUT_LEFT, SelectOption.list());
            });
          },
      );
    });
    rootPane.vgroup(function(rightPane) {
      rightPane.alignChildren = 'fill';
      rightPane.vpanel(
          R.string.color,
          function(panel) {
            panel.alignChildren = 'right';
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selecttypes_fill;
              group.staticText(undefined, R.string.fill).apply(HEADING);
              fillColorList = group.dropDownList(SIZE_INPUT_RIGHT, Color2.list());
            });
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selecttypes_stroke;
              group.staticText(undefined, R.string.stroke).apply(HEADING);
              strokeColorList = group.dropDownList(SIZE_INPUT_RIGHT, Color2.list());
            });
          },
      );
      rightPane.vpanel(
          R.string.others,
          function(panel) {
            panel.alignChildren = 'right';
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selecttypes_kind;
              group.staticText(undefined, R.string.kind).apply(HEADING);
              kindList = group.dropDownList(SIZE_INPUT_RIGHT, Kind.list());
            });
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_selecttypes_orientation;
              group.staticText(undefined, R.string.orientation).apply(HEADING);
              orientationList = group.dropDownList(SIZE_INPUT_RIGHT, Orientation.list());
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
      var substring = findEdit.text;
      var fontName = fontNameEdit.text;
      var fontSize = parseUnits(fontSizeEdit.text);
      var italic = italicList.hasSelection() ? SelectOption.isYes(italicList.selection) : undefined;
      var underline =
          underlineList.hasSelection() ? SelectOption.isYes(underlineList.selection) : undefined;
      var fillColor =
          fillColorList.hasSelection() ? Color2.find(fillColorList.selection) : undefined;
      var strokeColor =
          strokeColorList.hasSelection() ? Color2.find(strokeColorList.selection) : undefined;
      var kind = kindList.hasSelection() ? Kind.find(kindList.selection) : undefined;
      var orientation =
          orientationList.hasSelection() ? Orientation.find(orientationList.selection) : undefined;
      selectAll(
          ['TextFrame'],
          function(item) {
            if (substring.isNotEmpty()) {
              var string = item.contents;
              if (!matchCaseCheck.value) {
                string = string.toLowerCase();
                substring = substring.toLowerCase();
              }
              if (!find(string, substring)) return false;
            }
            var attr = item.textRange.characterAttributes;
            if (fontName.isNotEmpty() &&
                !attr.textFont.name.toLowerCase().contains(fontName.toLowerCase())
            ) {
              return false;
            }
            if (fontSize !== undefined && parseInt(fontSize) !== parseInt(attr.size)) return false;
            if (italic !== undefined && italic !== attr.italics) return false;
            if (underline !== undefined && underline !== attr.underline) return false;
            if (fillColor !== undefined && !isColorEqual(fillColor.get(), attr.fillColor)) {
              return false;
            }
            if (strokeColor !== undefined && !isColorEqual(strokeColor.get(), attr.strokeColor)) {
              return false;
            }
            if (kind !== undefined && kind.value !== item.kind) return false;
            if (orientation !== undefined && orientation.value !== item.orientation) return false;
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

function find(string, substring) {
  if (!matchWordCheck.value) {
    return string.contains(substring);
  }
  // https://stackoverflow.com/questions/18740664/search-whole-word-in-string
  substring = substring.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  return string.match(new RegExp('\\b' + substring + '\\b', 'i')) !== null;
}
