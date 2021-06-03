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

/** Calls the specified function [block] and returns its result. */
Object.prototype.run = function(block) {
    return block()
}

/** Calls the specified function [block] with `this` value as its argument and returns `this` value. */
Object.prototype.also = function(block) {
    block(this)
    return this
}

/** Calls the specified function [block] with `this` value as its argument and returns its result. */
Object.prototype.let = function(block) {
    return block(this)
}

/** Returns `this` value if it satisfies the given [predicate] or `null`, if it doesn't. */
Object.prototype.takeIf = function(predicate) {
    return predicate(this) ? this : null
}

/** Returns `this` value if it _does not_ satisfy the given [predicate] or `null`, if it does. */
Object.prototype.takeUnless = function(predicate) {
    return !predicate(this) ? this : null
}

/** Iterate n times with provided action. */
function repeat(times, action) {
    for (var i = 1; i <= times; i++) {
        action(i)
    }
}