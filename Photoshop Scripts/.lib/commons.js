/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

#include "core.js"

#include "commons-preconditions.js"

check(app.documents.length > 0, R.string.error_commons)

var document = app.activeDocument
var unitName = ""
switch (app.preferences.rulerUnits) {
  case Units.INCHES:
    unitName = "in"
    break;
  case Units.CM:
    unitName = "cm"
    break;
  case Units.POINTS:
    unitName = "pt"
    break;
  case Units.PICAS:
    unitName = "pica"
    break;
  case Units.MM:
    unitName = "mm"
    break;
  case Units.PIXELS:
    unitName = "px"
    break;
}

/**
 * Recalibrate unit text (e.g: "20 mm") to current document's units.
 * @return {String}
 */
function unitsOf(input) { return UnitValue(input).as(unitName) + " " + unitName }
