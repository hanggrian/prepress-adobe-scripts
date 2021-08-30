#include 'core.js'

#include 'commons-preconditions.js'

check(app.documents.length > 0, 'No active document')

var document = app.activeDocument
var unitName = ''
switch (document.rulerUnits) {
    case RulerUnits.Inches:
        unitName = 'in'
        break;
    case RulerUnits.Centimeters:
        unitName = 'cm'
        break;
    case RulerUnits.Points:
        unitName = 'pt'
        break;
    case RulerUnits.Picas:
        unitName = 'pica'
        break;
    case RulerUnits.Millimeters:
        unitName = 'mm'
        break;
    case RulerUnits.Qs:
        unitName = 'q'
        break;
    case RulerUnits.Pixels:
        unitName = 'px'
        break;
}

/**
 * Recalibrate unit text (e.g: '20 mm') to current document's units.
 * @returns {String}
 */
function unitsOf(input) { return UnitValue(input).as(unitName) + ' ' + unitName }

/**
 * Select all items that match selected configuration.
 * When nothing is selected, this script will select all items with requested parameters.
 * When there are selection, it will instead filter the selection to only match requested parameters.
 * @param {Array} types array of `PageItem` typenames.
 * @param {Function} callable nullable custom item checker that should return true if the item parameter should be selected.
 */
function selectAll(types, callable) {
    var queue = []
    var target = selection === null || selection.length === 0
        ? document.pageItems
        : selection
    _forEachItem(target, function(item) {
        if (types.contains(item.typename)) {
            if (callable === undefined) {
                callable = function() { return true }
            }
            if (callable(item)) {
                queue.push(item)
            }
        }
    })
    selection = queue
}