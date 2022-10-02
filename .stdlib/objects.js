/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

// Why is this necessary? Why not just use `value || defaultValue`?
// In case of boolean `value || true`, the value is always true.

/**
 * Get value if not null, otherwise get replacement.
 * @param {*} value expected value.
 * @param {*} defaultValue replacement.
 * @return {*}
 */
function getOrDefault(value, defaultValue) {
  return value == null ? defaultValue : value
}

/**
 * Get value if not null, otherwise get replacement.
 * @param {*} value expected value.
 * @param {Function} defaultValue replacement.
 * @return {*}
 */
function getOrElse(value, defaultValue) {
  return value == null ? defaultValue() : value
}
