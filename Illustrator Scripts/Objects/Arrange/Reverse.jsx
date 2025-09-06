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

// find reversed position and keep ordering until met
Collections.forEach(
    selection,
    function(it, index) {
      var reversedPosition = initialPositions[Collections.lastIndex(initialPositions) - index];
      println(
          'Moving %s from %d to %d.',
          Items.getName(it),
          it.absoluteZOrderPosition,
          reversedPosition,
      );
      while (it.absoluteZOrderPosition < reversedPosition) {
        it.zOrder(ZOrderMethod.BRINGFORWARD);
      }
      while (it.absoluteZOrderPosition > reversedPosition) {
        it.zOrder(ZOrderMethod.SENDBACKWARD);
      }
    },
);
