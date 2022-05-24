/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Print a message to the console.
 * String formatting may be applied.
 */
function print() {
  $.write(arguments.isEmpty()
    ? ''
    : arguments.first().formatArr(Array.prototype.slice.call(arguments, 1)))
}

/**
 * Print a message to the console with newline.
 * String formatting may be applied.
 */
function println() {
  $.writeln(arguments.isEmpty()
    ? ''
    : arguments.first().formatArr(Array.prototype.slice.call(arguments, 1)))
}