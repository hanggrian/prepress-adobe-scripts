//@target illustrator;
//@include '../../.lib/commons.js';

checkMultipleSelection();

var initialPositions = [selection[0].absoluteZOrderPosition];
for (var i = 1; i < selection.length; i++) {
  check(
      selection[i - 1].absoluteZOrderPosition - selection[i].absoluteZOrderPosition === 1,
      R.string.error_rearrange,
  );
  initialPositions.push(selection[i].absoluteZOrderPosition);
}

var dialog = new Dialog(R.string.rearrange_objects);
var orderingList;
var prefs = preferences2.resolve('objects/rearrange');

dialog.vgroup(function(main) {
  orderingList =
      new OrderingList(main, [Ordering.positionList()]).apply(function(it) {
        it.selection = prefs.getInt('order');
      });
});
dialog.setCancelButton();
dialog.setDefaultButton(
    undefined,
    function() {
      var sortedSelection = Collections.copyOf(selection).sort(orderingList.getComparator());
      // the idea is to keep pusing item to bottommost
      Collections.forEach(
          sortedSelection,
          function(it) {
            var times = it.absoluteZOrderPosition - Collections.last(initialPositions);
            println('Moving %s %d times.', Items.getName(it), times);
            repeat(
                times,
                function() {
                  it.zOrder(ZOrderMethod.SENDBACKWARD);
                },
            );
          },
      );

      prefs.setInt('order', orderingList.selection.index);
      return false;
    },
);
dialog.show();
