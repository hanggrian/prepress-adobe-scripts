#target Illustrator
#include '../.lib/commons.js'

var BOUNDS_TEXT = [70, 21]
var BOUNDS_EDIT = [100, 21]
var BOUNDS_EDIT2 = [40, 21]

checkSingleSelection()

var dialog = new Dialog('Step and Repeat')
var horizontalEdit, verticalEdit, moveHorizontalEdit, moveVerticalEdit

dialog.hgroup(function(group) {
    group.setTooltips('2 dimension target')
    group.staticText(BOUNDS_TEXT, 'Copies:', JUSTIFY_RIGHT)
    horizontalEdit = group.editText(BOUNDS_EDIT2, undefined, function(it) {
        it.validateDigits()
        it.activate()
    })
    group.staticText(undefined, '×')
    verticalEdit = group.editText(BOUNDS_EDIT2, undefined, VALIDATE_DIGITS)
})
dialog.vpanel('Move', function(panel) {
    var target = selection.first().getClippingPathItem()
    panel.hgroup(function(group) {
        group.setTooltips('Distance between arts horizontally')
        group.staticText(BOUNDS_TEXT, 'Horizontal:', JUSTIFY_RIGHT)
        moveHorizontalEdit = group.editText(BOUNDS_EDIT, formatUnits(target.width, unitName, 2), VALIDATE_UNITS)
    })
    panel.hgroup(function(group) {
        group.setTooltips('Distance between arts vertically')
        group.staticText(BOUNDS_TEXT, 'Vertical:', JUSTIFY_RIGHT)
        moveVerticalEdit = group.editText(BOUNDS_EDIT, formatUnits(target.height, unitName, 2), VALIDATE_UNITS)
    })
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var horizontal = parseInt(horizontalEdit.text) || 0
    var vertical = parseInt(verticalEdit.text) || 0
    var moveHorizontal = parseUnits(moveHorizontalEdit.text)
    var moveVertical = parseUnits(moveVerticalEdit.text)

    if (horizontal < 1 || vertical < 1) {
        errorWithAlert('Minimal value is 1×1')
        return
    }

    var target = selection.first()
    var x = target.position.getLeft()
    var y = target.position.getTop()

    app.copy()
    target.remove()

    var selectQueues = []
    // vertical starts with 0 because the starting point doesn't change
    for (var v = 0; v < vertical; v++) {
        app.paste()
        var addedItem = selection.first()
        addedItem.position = [x, y - v * moveVertical]
        selectQueues.push(addedItem)

        for (var h = 1; h < horizontal; h++) {
            app.paste()
            addedItem = selection.first()
            addedItem.position = [x + h * moveHorizontal, y - v * moveVertical]
            selectQueues.push(addedItem)
        }
    }
    selection = selectQueues
})
dialog.show()