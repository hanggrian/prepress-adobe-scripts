//@target illustrator;
//@include '../.lib/commons.js';

checkMultipleArtboards();

var dialog =
    new Dialog(R.string.reorder_artboards, 'reordering-resizing-artboards/#reorder-artboards');
var orderingList;
var prefs = preferences2.resolve('artboards/reorder');

dialog.hgroup(function(main) {
  orderingList =
      new OrderingList(
          main,
          [Ordering.nameList(), Ordering.positionList()]).apply(function(it) {
            it.minimumSize.width = 230;
            it.selection = prefs.getInt('order');
          },
      );
});
dialog.setCancelButton();
dialog.setDefaultButton(
    undefined,
    function() {
      var properties = [];
      var sortedArtboards =
          Collections.copyOf(document.artboards).sort(orderingList.getComparator());
      Collections.forEach(
          sortedArtboards,
          function(it) {
            properties.push(Objects.copyProperties(it))
          },
      );
      Collections.forEach(
          document.artboards,
          function(it, i) {
            Objects.pasteProperties(properties[i], it);
          },
      );

      prefs.setInt('order', orderingList.selection.index);
      return false;
    },
);
dialog.show();
