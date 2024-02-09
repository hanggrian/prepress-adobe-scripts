// Because JavaScript does not have a generic type,
// first parameter of `block` and `predicate` is always an Object.
// When comparing it directly, remember that `===` and `!==` operators won't work,
// Instead use `==` and `!=`.
// See https://github.com/JetBrains/kotlin/blob/master/libraries/stdlib/src/kotlin/util/Standard.kt.

/*<javascriptresource><menu>hide</menu></javascriptresource>*/

/**
 * Calls the specified function `block` with `this` value as its argument and returns `this` value.
 * @param {function(*): *} block
 * @return {*}
 */
Object.prototype.apply =
    function(block) {
      checkNotNull(block)
      block(this)
      return this
    }

/**
 * Calls the specified function `block` with `this` value as its argument and returns its result.
 * @param {function(*): *} block
 * @return {*}
 */
Object.prototype.run =
    function(block) {
      checkNotNull(block)
      return block(this)
    }

/**
 * Iterate n times with provided action.
 * @param {number} times
 * @param {function(number)} action
 */
function repeat(times, action) {
  checkNotNull(times)
  checkNotNull(action)
  for (var i = 1; i <= times; i++) {
    action(i)
  }
}
