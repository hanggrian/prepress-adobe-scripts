// TODO avoid duplicate paths in the same position and length.

//@target illustrator;
//@include '../.lib/commons.js';

checkAnySelection();

var items =
    Collections.filterItem(
        selection,
        function(it) {
          return Items.isPath(it) || Items.isCompoundPath(it);
        },
    );
check(
    Collections.isNotEmpty(items),
    getString(R.string.error_notypes_document, getString(R.string.paths).toLowerCase()),
);

var count = 0;
var distance = 0;
var clippingCount = 0;
var filledCount = 0;
var registrationCount = 0;

Collections.forEachItem(
    items,
    function(item) {
      switch (item.typename) {
        case 'PathItem':
          increment(item);
          break;
        case 'CompoundPathItem':
          Collections.forEach(
              item.pathItems,
              function(it) {
                increment(it);
              },
          );
          break;
      }
    },
);

var message = '';
if (count + distance === 0) {
  message += getString(R.string.message_measuredielines1);
} else {
  message +=
      getString(R.string.message_measuredielines2, count, formatUnits(distance, unitType, 2));
}
if (clippingCount > 0) {
  message += getString(R.string.message_measuredielines3, clippingCount);
}
if (filledCount > 0) {
  message += getString(R.string.message_measuredielines4, filledCount);
}
if (registrationCount > 0) {
  message += getString(R.string.message_measuredielines5, registrationCount);
}
alert(message, getString(R.string.measure_dielines));

function increment(item) {
  // dielines usually aren't used as clipping
  if (item.clipping) {
    clippingCount++;
    return;
  }
  // dielines usually aren't filled
  if (item.filled) {
    filledCount++;
    return;
  }
  // dielines' stroke color usually aren't registration
  if (item.stroked && isColorEqual(item.strokeColor, Color2.REGISTRATION.get())) {
    registrationCount++;
    return;
  }
  count++;
  distance += item.length;
}
