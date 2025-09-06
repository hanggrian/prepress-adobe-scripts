//@target illustrator;
//@include '../.lib/commons.js';

var Rounding =
    new Enum(
        {
          NONE: {
            text: R.string.none,
            round: function(it) {
              return it;
            },
          },
          ROUND: {text: R.string.round, round: Math.round},
          FLOOR: {text: R.string.floor, round: Math.floor},
          CEIL: {text: R.string.ceil, round: Math.ceil},
        },
        [0],
    );

var SIZE_LABEL = [80, 21]; // manual sizing because content is changable
var SIZE_INPUT = [150, 21];

checkSingleSelection();

var item = Collections.first(selection);
checkTypename(item, 'TextFrame');

var dialog = new Dialog(R.string.resize_glyph);
var dimensionWidthRadio;
var dimensionHeightRadio;
var dimensionSizeText;
var dimensionSizeEdit;
var roundingList;

dialog.vgroup(function(main) {
  main.alignChildren = 'left';
  main.hgroup(function(group) {
    group.helpTips = R.string.tip_resizeglyph_dimension;
    group.staticText(SIZE_LABEL, R.string.dimension).apply(HEADING);
    dimensionWidthRadio =
        group
            .radioButton(undefined, R.string.width)
            .apply(function(it) {
              it.addClickListener(changeDimensionText);
              it.select();
            });
    dimensionHeightRadio =
        group
            .radioButton(undefined, R.string.height)
            .apply(function(it) {
              it.addClickListener(changeDimensionText);
            });
  });
  main.hgroup(function(group) {
    group.helpTips = R.string.tip_resizeglyph_size;
    dimensionSizeText = group.staticText(SIZE_LABEL, R.string.width).apply(HEADING);
    dimensionSizeEdit =
        group
            .editText(SIZE_INPUT, formatUnits(item.width, unitType, 2))
            .apply(function(it) {
              it.validateUnits();
              it.activate();
            });
  });
  main.hgroup(function(group) {
    group.helpTips = R.string.tip_resizeglyph_rounding;
    group.staticText(SIZE_LABEL, R.string.rounding).apply(HEADING);
    roundingList =
        group
            .dropDownList(SIZE_INPUT, Rounding.list())
            .apply(function(it) {
              it.selection = 0;
            });
  });
});
dialog.setCancelButton();
dialog.setDefaultButton(
    undefined,
    function() {
      var currentFont = item.textRange.characterAttributes.size;
      // text's dimension are not an accurate real-world size, use its outline instead
      var currentDimension;
      item
          .duplicate(layer, ElementPlacement.PLACEATEND).createOutline()
          .run(function(it) {
            currentDimension = dimensionWidthRadio.value ? it.width : it.height;
            it.remove();
          });
      var targetDimension = parseUnits(dimensionSizeEdit.text);
      var targetFont = currentFont * targetDimension / currentDimension;
      var rounding = Rounding.find(roundingList.selection);
      targetFont = rounding.round(targetFont);
      item.textRange.characterAttributes.size = targetFont;
      return false;
    },
);
dialog.show();

function changeDimensionText() {
  if (dimensionWidthRadio.value) {
    dimensionSizeText.text = getString(R.string.width) + ':';
    dimensionSizeEdit.text = formatUnits(item.width, unitType, 2);
  } else {
    dimensionSizeText.text = getString(R.string.height) + ':';
    dimensionSizeEdit.text = formatUnits(item.height, unitType, 2);
  }
}
