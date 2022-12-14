/*<javascriptresource><menu>hide</menu></javascriptresource>*/

/**
 * Print a message to the console.
 * @param {!Array<?Object>} arguments first element as format template, the rest are its format arguments.
 */
function print() {
  if (Collections.isEmpty(arguments)) {
    $.write()
    return
  }
  var format = Array.prototype.shift.call(arguments)
  $.write(Internals.formatString(format, arguments))
}

/**
 * Print a message to the console with newline.
 * @param {!Array<?Object>} arguments first element as format template, the rest are its format arguments.
 */
function println() {
  if (Collections.isEmpty(arguments)) {
    $.writeln()
    return
  }
  var format = Array.prototype.shift.call(arguments)
  $.writeln(Internals.formatString(format, arguments))
}
