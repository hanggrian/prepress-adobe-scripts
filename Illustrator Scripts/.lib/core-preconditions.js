/**
 * Asserts an item's type.
 * @param {Object} item any child class of PageItem.
 * @param {String} typename item typename, (e.g.: `PathItem`, `TextFrame`, etc.).
 * @returns {Object}
 */
function checkTypename(item, typename) {
  check(item.typename === typename, getString(R.string.error_preconditions_typename, typename))
  return item
}
