//@target illustrator;
//@include '../.lib/commons.js';

var SIZE_RANGING = [150, 21];

var dialog = new Dialog(R.string.fit_to_arts);
var rangingGroup;

dialog.hgroup(function(main) {
  main.staticText(undefined, R.string.range).apply(HEADING);
  rangingGroup =
      new RangingGroup(main, SIZE_RANGING).apply(function(it) {
        it.maxRange = document.artboards.length;
        it.endEdit.text = document.artboards.length;
        it.startEdit.activate();
      });
});
dialog.setCancelButton();
dialog.setDefaultButton(
    undefined,
    function() {
      if (!rangingGroup.isValid()) {
        return Windows.alert(R.string.error_range, dialog.text, true);
      }
      var temp = selection; // preserve selection
      rangingGroup
          .get()
          .forEachIndex(function(i) {
            document.artboards.setActiveArtboardIndex(i);
            document.selectObjectsOnActiveArtboard(i);
            document.fitArtboardToSelectedArt(i);
          });
      selection = temp;
      return false;
    },
);
dialog.show();
