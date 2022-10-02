#include "core.js"

#include "commons-preconditions.js"

// Commons libraries require active document,
// providing tools for modifying current document.

check(app.documents.length > 0, R.string.error_commons)

var document = app.activeDocument

var layer = Collections.isNotEmpty(selection) ? selection[0].layer : document.layers[0]

var unitType = Collections.first(UnitType.values(), function(it) { return it.rulerUnits === document.rulerUnits })

/**
 * Select all items that match selected configuration.
 * When nothing is selected, this script will select all items with requested parameters.
 * When there are selection, it will instead filter the selection to only match requested parameters.
 * @param {Array} types array of `PageItem` typenames.
 * @param {Function} predicate nullable item checker that should return true if the item parameter should be selected.
 * @param {Boolean} recursive whether or not search within groups recursively, default is false
 */
function selectAll(types, predicate, recursive) {
  checkNotNull(types)
  predicate = getOrDefault(predicate, function(_) { return true })
  recursive = getOrDefault(recursive, false)

  var source = Collections.isEmpty(selection) ? document.pageItems : selection
  var filterPredicate = function(item) {
    return Collections.contains(types, item.typename) && predicate(item)
  }
  if (recursive) {
    selection = Collections.filterItem(source, filterPredicate)
  } else {
    selection = Collections.filter(source, filterPredicate)
  }
}
