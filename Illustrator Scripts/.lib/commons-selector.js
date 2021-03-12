/**
 * Select all items that match selected configuration.
 * When nothing is selected, this library will select all items with requested types.
 * When there are selection, it will instead filter the selection to only match requested types.
 * @param {Array} types array of `PageItem` typenames.
 * @param {Function} callable nullable custom item checker that should return true if the item parameter should be selected.
 */
function selectAll(types, callable) {
    var queue = []
    var target = selection === null || selection.length === 0
        ? document.pageItems
        : selection
    _forEachItem(target, function(item) {
        if (types.contains(item.typename)) {
            if (callable === undefined) {
                callable = function() { return true }
            }
            if (callable(item)) {
                queue.push(item)
            }
        }
    })
    selection = queue
}