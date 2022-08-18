/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Print a message to the console.
 * @param {Array} arguments first element as format template, the rest are its format arguments
 */
function print() {
  if (Collections.isEmpty(arguments)) {
    $.write()
    return
  }
  $.write(Collections.first(arguments).formatArr(Array.prototype.slice.call(arguments, 1)))
}

/**
 * Print a message to the console with newline.
 * @param {Array} arguments first element as format template, the rest are its format arguments
 */
function println() {
  if (Collections.isEmpty(arguments)) {
    $.writeln()
    return
  }
  $.writeln(Collections.first(arguments).formatArr(Array.prototype.slice.call(arguments, 1)))
}
