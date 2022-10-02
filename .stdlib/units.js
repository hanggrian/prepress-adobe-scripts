/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

// Conventions used in this library:
// * `units` are number with unit name suffix. (e.g.: `5`, `20 mm`)
// * `unitValue` are the number. (e.g. : `5`, `20`)
// * `unitType` are the suffix. (e.g. : `pt`, `mm`)

/**
 * `units` is a class in Photoshop.
 * `rulerUnits` is a class in Illustrator.
 */
var UnitType = new Enum({
  PX: {
    name: R.string.pixels,
    qualifier: "px",
    rulerUnits: undefined,
    units: undefined
  },
  PT: {
    name: R.string.points,
    qualifier: "pt",
    rulerUnits: undefined,
    units: undefined
  },
  IN: {
    name: R.string.inches,
    qualifier: "inches",
    rulerUnits: undefined,
    units: undefined
  },
  MM: {
    name: R.string.millimeters,
    qualifier: "mm",
    rulerUnits: undefined,
    units: undefined
  },
  CM: {
    name: R.string.centimeters,
    qualifier: "cm",
    rulerUnits: undefined,
    units: undefined
  }
})
