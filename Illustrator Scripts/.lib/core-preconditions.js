/**
 * Asserts an item's type.
 * @param {!PageItem} item
 * @param {string} typename
 * @return {!PageItem}
 */
function checkTypename(item, typename) {
  check(item.typename === typename, getString(R.string.error_preconditions_typename, typename))
  return item
}
