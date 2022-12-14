// Conventions used in this library:
// - `units` are number with unit name suffix. (e.g.: `5`, `20 mm`)
// - `unitValue` are the number. (e.g. : `5`, `20`)
// - `unitType` are the suffix. (e.g. : `pt`, `mm`)

/*<javascriptresource><menu>hide</menu></javascriptresource>*/

/** `units` is a class in Photoshop. `rulerUnits` is a class in Illustrator. */
var UnitType = new Enum({
  PX: {
    text: R.string.pixels,
    qualifier: 'px',
    rulerUnits: undefined,
    units: undefined
  },
  PT: {
    text: R.string.points,
    qualifier: 'pt',
    rulerUnits: undefined,
    units: undefined
  },
  IN: {
    text: R.string.inches,
    qualifier: 'in',
    rulerUnits: undefined,
    units: undefined
  },
  MM: {
    text: R.string.millimeters,
    qualifier: 'mm',
    rulerUnits: undefined,
    units: undefined
  },
  CM: {
    text: R.string.centimeters,
    qualifier: 'cm',
    rulerUnits: undefined,
    units: undefined
  }
})
