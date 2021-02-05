function Spreader() {
    var self = this

    this.horizontalEdit, this.verticalEdit
    this.gapHorizontalEdit, this.gapVerticalEdit

    var spreaderTextBounds = [0, 0, 95, 21]
    var spreaderEditBounds = [0, 0, 100, 21]
    var spreaderEditBounds2 = [0, 0, 36, 21]
    
    /**
     * Add spreader layout to target.
     * @this {Object} may be a Group, Panel, or Window.
     * @return {Group}
     */
    this.getGroup = function(parent) {
        var spreader = parent.addVGroup()
    
        spreader.copies = spreader.addHGroup()
        spreader.copies.addText(spreaderTextBounds, 'Copies:', 'right')
        self.horizontalEdit = spreader.copies.addEditText(spreaderEditBounds2)
        self.horizontalEdit.validateDigits()
        spreader.copies.addText(undefined, '×')
        self.verticalEdit = spreader.copies.addEditText(spreaderEditBounds2)
        self.verticalEdit.validateDigits()
        spreader.copies.setTooltip('2 dimension target.')
    
        spreader.gapHorizontal = spreader.addHGroup()
        spreader.gapHorizontal.addText(spreaderTextBounds, 'Horizontal Gap:', 'right')
        self.gapHorizontalEdit = spreader.gapHorizontal.addEditText(spreaderEditBounds, '0 mm')
        self.gapHorizontalEdit.validateUnits()
        spreader.gapHorizontal.setTooltip('Distance between arts horizontally.')
    
        spreader.gapVertical = spreader.addHGroup()
        spreader.gapVertical.addText(spreaderTextBounds, 'Vertical Gap:', 'right')
        self.gapVerticalEdit = spreader.gapVertical.addEditText(spreaderEditBounds, '0 mm')
        self.gapVerticalEdit.validateUnits()
        spreader.gapVertical.setTooltip('Distance between arts vertically.')
    
        return spreader
    }

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