function Spreader(parent) {
    var self = this

    var spreaderTextBounds = [0, 0, 95, 21]
    var spreaderEditBounds = [0, 0, 100, 21]
    var spreaderEditBounds2 = [0, 0, 36, 21]
    
    var main = parent.addVGroup()
    
    this.copies = main.addHGroup()
    this.copies.addText(spreaderTextBounds, 'Copies:', 'right')
    this.horizontalEdit = this.copies.addEditText(spreaderEditBounds2)
    this.horizontalEdit.validateDigits()
    this.copies.addText(undefined, '×')
    this.verticalEdit = this.copies.addEditText(spreaderEditBounds2)
    this.verticalEdit.validateDigits()
    this.copies.setTooltip('2 dimension target.')

    this.gapHorizontal = main.addHGroup()
    this.gapHorizontal.addText(spreaderTextBounds, 'Horizontal Gap:', 'right')
    this.gapHorizontalEdit = this.gapHorizontal.addEditText(spreaderEditBounds, '0 mm')
    this.gapHorizontalEdit.validateUnits()
    this.gapHorizontal.setTooltip('Distance between arts horizontally.')

    this.gapVertical = main.addHGroup()
    this.gapVertical.addText(spreaderTextBounds, 'Vertical Gap:', 'right')
    this.gapVerticalEdit = this.gapVertical.addEditText(spreaderEditBounds, '0 mm')
    this.gapVerticalEdit.validateUnits()
    this.gapVertical.setTooltip('Distance between arts vertically.')

    /**
     * spreader selected item, only support single selection.
     * @param {Function} horizontalRunnable nullable custom action.
     * @param {Function} verticalRunnable nullable custom action.
     */
    this.spread = function(horizontalRunnable, verticalRunnable) {
        var horizontal = parseInt(self.horizontalEdit.text) || 0
        var vertical = parseInt(self.verticalEdit.text) || 0
        var gapHorizontal = parseUnit(self.gapHorizontalEdit.text)
        var gapVertical = parseUnit(self.gapVerticalEdit.text)
    
        var target = selection.first()
        var clippingTarget = target.getClippingPathItem()
        var width = clippingTarget.width
        var height = clippingTarget.height
        var x = target.position.first()
        var y = target.position[1]
    
        app.copy()
        target.remove()
    
        // vertical is 0 because the starting point doesn't change
        for (var v = 0; v < vertical; v++) {
            app.paste()
            var addedItem = selection.first()
            addedItem.position = [x, y - v * (height + gapVertical)]
            if (verticalRunnable !== undefined) {
                verticalRunnable(addedItem, h, v)
            }
    
            for (var h = 1; h < horizontal; h++) {
                app.paste()
                addedItem = selection.first()
                addedItem.position = [x + h * (width + gapHorizontal), y - v * (height + gapVertical)]
                if (horizontalRunnable !== undefined) {
                    horizontalRunnable(addedItem, h, v)
                }
            }
        }
    }
}