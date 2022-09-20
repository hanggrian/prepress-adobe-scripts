#include "core.js"

#include "commons-preconditions.js"

check(app.documents.length > 0, R.string.error_commons)

var document = app.activeDocument

var layer = Collections.isNotEmpty(selection) ? Collections.first(selection).layer : document.layers[0]

var unitName = ""
switch (document.rulerUnits) {
  case RulerUnits.Inches:
    unitName = "in"
    break;
  case RulerUnits.Centimeters:
    unitName = "cm"
    break;
  case RulerUnits.Points:
    unitName = "pt"
    break;
  case RulerUnits.Picas:
    unitName = "pica"
    break;
  case RulerUnits.Millimeters:
    unitName = "mm"
    break;
  case RulerUnits.Qs:
    unitName = "q"
    break;
  case RulerUnits.Pixels:
    unitName = "px"
    break;
}

/**
 * Recalibrate unit text (e.g: "20 mm") to current document's units.
 * @return {String}
 */
function unitsOf(input) { return UnitValue(input).as(unitName) + " " + unitName }

/**
 * Select all items that match selected configuration.
 * When nothing is selected, this script will select all items with requested parameters.
 * When there are selection, it will instead filter the selection to only match requested parameters.
 * @param {Array} types array of `PageItem` typenames.
 * @param {Function} predicate nullable custom item checker that should return true if the item parameter should be selected.
 * @param {Boolean} recursive whether or not search within groups recursively.
 */
function selectAll(types, predicate, recursive) {
  predicate = predicate || function(_) { return true }
  recursive = recursive || false

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
