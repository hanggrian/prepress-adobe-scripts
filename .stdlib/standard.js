// Because JavaScript does not have a generic type,
// first parameter of `block` and `predicate` is always an Object.
// When comparing it directly, remember that `===` and `!==` operators won't work,
// Instead use `==` and `!=`.
// See https://github.com/JetBrains/kotlin/blob/master/libraries/stdlib/src/kotlin/util/Standard.kt.

/**
 * Calls the specified function `block` and returns its result.
 * @param {function(*)} block
 */
Object.prototype.run = function(block) {
  block(this)
}

/**
 * Calls the specified function `block` with `this` value as its argument and returns `this` value.
 * @param {function(*): *} block
 * @return {*}
 */
Object.prototype.also = function(block) {
  checkNotNull(block)
  block(this)
  return this
}

/**
 * Calls the specified function `block` with `this` value as its argument and returns its result.
 * @param {function(*): *} block
 * @return {*}
 */
Object.prototype.let = function(block) {
  checkNotNull(block)
  return block(this)
}

/**
 * Returns `this` value if it satisfies the given `predicate` or `null`, if it doesn't.
 * @param {function(*): boolean} predicate
 * @return {*}
 */
Object.prototype.takeIf = function(predicate) {
  checkNotNull(predicate)
  return predicate(this) ? this : null
}

/**
 * Returns `this` value if it _does not_ satisfy the given `predicate` or `null`, if it does.
 * @param {function(*): boolean} predicate
 * @return {*}
 */
Object.prototype.takeUnless = function(predicate) {
  checkNotNull(predicate)
  return !predicate(this) ? this : null
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
