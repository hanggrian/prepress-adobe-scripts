/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

// Because JavaScript does not have a generic type,
// first parameter of `block` and `predicate` is always an Object.
// When comparing it directly, remember that `===` and `!==` operators won't work,
// Instead use `==` and `!=`.
// See https://github.com/JetBrains/kotlin/blob/master/libraries/stdlib/src/kotlin/util/Standard.kt.

/**
 * Calls the specified function `block` and returns its result.
 * @param {Function} block runnable with receiver object as parameter.
 */
Object.prototype.run = function(block) {
  block(this)
}

/**
 * Calls the specified function `block` with `this` value as its argument and returns `this` value.
 * @param {Function} block runnable with receiver object as parameter.
 * @return {*}
 */
Object.prototype.also = function(block) {
  checkNotNull(block)
  block(this)
  return this
}

/**
 * Calls the specified function `block` with `this` value as its argument and returns its result.
 * @param {Function} block runnable with receiver object as parameter.
 * @return {*}
 */
Object.prototype.let = function(block) {
  checkNotNull(block)
  return block(this)
}

/**
 * Returns `this` value if it satisfies the given `predicate` or `null`, if it doesn't.
 * @param {Function} predicate runnable with receiver object as parameter and boolean return value.
 * @return {Boolean}
 */
Object.prototype.takeIf = function(predicate) {
  checkNotNull(predicate)
  return predicate(this) ? this : null
}

/**
 * Returns `this` value if it _does not_ satisfy the given `predicate` or `null`, if it does.
 * @param {Function} predicate runnable with receiver object as parameter and boolean return value.
 * @return {Boolean}
 */
Object.prototype.takeUnless = function(predicate) {
  checkNotNull(predicate)
  return !predicate(this) ? this : null
}

/**
 * Iterate n times with provided action.
 * @param {Number} times number of times to run the action.
 * @param {Function} action runnable with no parameter.
 */
function repeat(times, action) {
  checkNotNull(times)
  checkNotNull(action)
  for (var i = 1; i <= times; i++) {
    action(i)
  }
}
