/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

// Commons libraries require active document,
// providing tools for modifying current document.

//@include 'core.js'

check(app.documents.length > 0, R.string.error_commons)

var document = app.activeDocument

var unitType = Collections.first(UnitType.values(),
  function(it) { return it.units === app.preferences.rulerUnits })
