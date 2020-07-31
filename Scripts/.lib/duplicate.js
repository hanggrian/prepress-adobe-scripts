/**
 * Duplicate selected item, only support single selection.
 * 
 * @param {number} horizontal - expected horizontal range
 * @param {number} vertical - expected vertical range
 * @param {number} offset - spacing between objects
 * @param {Function} horizontalRunnable - custom action that are executed during horizontal loop
 * @param {Function} verticalRunnable - custom action that are executed during vertical loop
 * @return {void}
 */
function duplicate(horizontal, vertical, offset, horizontalRunnable, verticalRunnable) {
    var selectedItem = selection[0]
    var width = selectedItem.width
    var height = selectedItem.height
    var x = selectedItem.position[0]
    var y = selectedItem.position[1]

    app.copy()
    selectedItem.remove()

    // vertical is 0 because the starting point doesn't change
    for (var v = 0; v < vertical; v++) {
        app.paste()
        var addedItem = selection[0]
        addedItem.position = [x, y - v * (height + offset)]
        verticalRunnable(addedItem, h, v)

        for (var h = 1; h < horizontal; h++) {
            app.paste()
            addedItem = selection[0]
            addedItem.position = [x + h * (width + offset), y - v * (height + offset)]
            horizontalRunnable(addedItem, h, v)
        }
    }
}