/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * @param {RulerUnits} rulerUnits enum used in Illustrator.
 * @param {Units} units enum used in Photoshop.
 */
var UnitType = Enums.of({
  PIXELS: { name: R.string.pixels, rulerUnits: undefined, units: undefined },
  POINTS: { name: R.string.points, rulerUnits: undefined, units: undefined },
  INCHES: { name: R.string.inches, rulerUnits: undefined, units: undefined },
  MILLIMETERS: { name: R.string.millimeters, rulerUnits: undefined, units: undefined },
  CENTIMETERS: { name: R.string.centimeters, rulerUnits: undefined, units: undefined }
})
