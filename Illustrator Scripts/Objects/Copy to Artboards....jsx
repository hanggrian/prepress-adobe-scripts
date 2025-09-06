//@target illustrator;
//@include '../.lib/commons.js';

var Anchor =
    new Enum({
      TOP_LEFT: {text: R.string.top_left, image: 'ic_arrow_topleft'},
      TOP_RIGHT: {text: R.string.top_right, image: 'ic_arrow_topright'},
      BOTTOM_LEFT: {text: R.string.bottom_left, image: 'ic_arrow_bottomleft'},
      BOTTOM_RIGHT: {text: R.string.bottom_right, image: 'ic_arrow_bottomright'},
    });

var SIZE_INPUT = [150, 21];

checkAnySelection();
checkMultipleArtboards();

var activeArtboardIndex = document.artboards.getActiveArtboardIndex();
var activeArtboard = document.artboards[activeArtboardIndex];
var activeArtboardRect = activeArtboard.artboardRect;

var proceed = true;
if (!Collections.all(
    selection,
    function(it) {
      return activeArtboardRect.contains(it.geometricBounds);
    },
)) {
  proceed = Windows.confirm(R.string.confirm_copytoartboards);
}

if (proceed) {
  var relativePositions =
      Collections.map(
          selection,
          function(it) {
            var bounds = it.geometricBounds;
            var relativeLeft = bounds.getLeft() - activeArtboardRect.getLeft();
            var relativeRight =
                activeArtboardRect.getRight() - bounds.getRight() + bounds.getWidth();
            var relativeTop = bounds.getTop() - activeArtboardRect.getTop();
            var relativeBottom =
                activeArtboardRect.getBottom() - bounds.getBottom() - bounds.getHeight();
            return [relativeLeft, relativeTop, relativeRight, relativeBottom];
          },
      );

  var dialog = new Dialog(R.string.copy_to_artboards, 'copy-to-artboards/');
  var rangingGroup;
  var anchorList;
  var prefs = preferences2.resolve('objects/copy_to_artboards');

  dialog.vgroup(function(main) {
    main.alignChildren = 'right';
    main.hgroup(function(group) {
      group.staticText(undefined, R.string.from_artboard).apply(HEADING);
      group.staticText(SIZE_INPUT, activeArtboardIndex + 1);
    });
    main.hgroup(function(group) {
      group.helpTips = R.string.tip_copytoartboards_artboards;
      group.staticText(undefined, R.string.to_artboards).apply(HEADING);
      rangingGroup =
          new RangingGroup(group, SIZE_INPUT).apply(function(it) {
            it.maxRange = document.artboards.length;
            it.endEdit.text = document.artboards.length;
            it.startEdit.activate();
          });
    });
    main.hgroup(function(group) {
      group.helpTips = R.string.tip_copytoartboards_anchor
      group.staticText(undefined, R.string.anchor).apply(HEADING)
      anchorList =
          group
              .dropDownList(SIZE_INPUT, Anchor.list())
              .apply(function(it) {
                it.selection = prefs.getInt('anchor');
              });
    });
  });
  dialog.setCancelButton();
  dialog.setDefaultButton(
      undefined,
      function() {
        if (!rangingGroup.isValid()) {
          return Windows.alert(R.string.error_range, dialog.text, true);
        }
        var range = rangingGroup.get();
        var anchor = Anchor.find(anchorList.selection);
        var readOnlySelection = selection;

        Collections.forEach(
            document.artboards,
            function(artboard, artboardIndex) {
              if (artboardIndex === activeArtboardIndex || !range.contains(artboardIndex)) {
                println(activeArtboardIndex + '. Ignore active artboard' + '.');
                return;
              }
              var artboardRect = artboard.artboardRect;
              Collections.forEach(
                  readOnlySelection,
                  function(item, itemIndex) {
                    var relativePosition = relativePositions[itemIndex];
                    var x;
                    var y;
                    if (anchor === Anchor.TOP_LEFT || anchor === Anchor.BOTTOM_LEFT) {
                      x = artboardRect.getLeft() + relativePosition.getLeft();
                    } else {
                      x = artboardRect.getRight() - relativePosition.getRight();
                    }
                    if (anchor === Anchor.TOP_LEFT || anchor === Anchor.TOP_RIGHT) {
                      y = artboardRect.getTop() + relativePosition.getTop();
                    } else {
                      y = artboardRect.getBottom() - relativePosition.getBottom();
                    }
                    println('%d. Position X=%d Y=%d.', artboardIndex, x, y);
                    item.duplicate(layer, ElementPlacement.PLACEATBEGINNING).position = [x, y];
                  },
              );
            },
        );

        prefs.setInt('anchor', anchorList.selection.index);
        return false;
      },
  );
  dialog.show();
}
