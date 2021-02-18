var DEFAULT_WEIGHT = 0.3 // the same value used in `Object > Create Trim Marks`

var LOCATION_TOP_LEFT = 11
var LOCATION_TOP_RIGHT = 1
var LOCATION_RIGHT_TOP = 2
var LOCATION_RIGHT_BOTTOM = 4
var LOCATION_BOTTOM_RIGHT = 5
var LOCATION_BOTTOM_LEFT = 7
var LOCATION_LEFT_BOTTOM = 8
var LOCATION_LEFT_TOP = 10

function TrimMarksPanel(parent, textBounds, editBounds) {
    var self = this
    this.main = parent.addVPanel('Trim Marks', 'fill')

    this.offset = this.main.addHGroup()
    this.offset.addText(textBounds, 'Offset:', 'right')
    this.offsetEdit = this.offset.addEditText(editBounds, '2.5 mm')
    this.offsetEdit.validateUnits()
    this.offset.setTooltip('Distance between art and trim marks.')

    this.length = this.main.addHGroup()
    this.length.addText(textBounds, 'Length:', 'right')
    this.lengthEdit = this.length.addEditText(editBounds, '2.5 mm')
    this.lengthEdit.validateUnits()
    this.length.setTooltip('Size of trim marks.')
    
    this.weight = this.main.addHGroup()
    this.weight.addText(textBounds, 'Weight:', 'right')
    this.weightEdit = this.weight.addEditText(editBounds, DEFAULT_WEIGHT)
    this.weightEdit.validateUnits()
    this.weight.setTooltip('Thickness of trim marks.')

    this.color = this.main.addHGroup()
    this.color.addText(textBounds, 'Color:', 'right')
    this.colorList = this.color.addDropDown(editBounds, COLORS)
    this.colorList.selection = 0
    this.color.setTooltip('Color of trim marks.')
    
    /**
     * Create multiple trim marks around item.
     * The marks are created with clockwise ordering.
     * @param {PageItem} item art where trim marks will be applied to.
     * @param {Array} locations combination of 8 possible mark locations as defined in constants.
     * @return {Array} created trim marks.
     */
    this.addToItem = function(item, locations) {
        var clippingItem = item.getClippingPathItem()
        var width = clippingItem.width
        var height = clippingItem.height
        var startX = clippingItem.position.first()
        var startY = clippingItem.position[1]
        var endX = startX + width
        var endY = startY - height
        return self.addToBounds(startX, startY, endX, endY, locations)
    }
    
    /**
     * Create multiple trim marks with specific X/Y positions.
     * The marks are created with clockwise ordering.
     * @param {Number} startX starting point of .
     * @param {Array} locations combination of 8 possible mark locations as defined in constants.
     * @return {Array} created trim marks.
     */
    this.addToBounds = function(startX, startY, endX, endY, locations) {
        var offset = parseUnit(self.offsetEdit.text)
        var length = parseUnit(self.lengthEdit.text)
        var marks = []
        for (var i = 0; i < locations.length; i++) {
            var location = locations[i]
            switch (location) {
                case LOCATION_TOP_LEFT:
                    marks.push(createTrimMark(
                        'TOP_LEFT',
                        startX,
                        startY + offset,
                        startX,
                        startY + offset + length
                    ))
                    break;
                case LOCATION_TOP_RIGHT:
                    marks.push(createTrimMark(
                        'TOP_RIGHT',
                        endX,
                        startY + offset,
                        endX,
                        startY + offset + length
                    ))
                    break;
                case LOCATION_RIGHT_TOP: 
                    marks.push(createTrimMark(
                        'RIGHT_TOP',
                        endX + offset,
                        startY,
                        endX + offset + length,
                        startY
                    ))
                    break;
                case LOCATION_RIGHT_BOTTOM: 
                    marks.push(createTrimMark(
                        'RIGHT_BOTTOM',
                        endX + offset,
                        endY,
                        endX + offset + length,
                        endY
                    ))
                    break;
                case LOCATION_BOTTOM_RIGHT: 
                    marks.push(createTrimMark(
                        'BOTTOM_RIGHT',
                        endX,
                        endY - offset,
                        endX,
                        endY - offset - length
                    ))
                    break;
                case LOCATION_BOTTOM_LEFT: 
                    marks.push(createTrimMark(
                        'BOTTOM_LEFT',
                        startX,
                        endY - offset,
                        startX,
                        endY - offset - length
                    ))       
                    break;
                case LOCATION_LEFT_BOTTOM: 
                    marks.push(createTrimMark(
                        'LEFT_BOTTOM',
                        startX - offset,
                        endY,
                        startX - offset - length,
                        endY
                    ))
                    break;
                case LOCATION_LEFT_TOP: 
                    marks.push(createTrimMark(
                        'LEFT_TOP',
                        startX - offset,
                        startY,
                        startX - offset - length,
                        startY
                    ))
                    break;
                default:
                    throw new Error('Unrecognizable location ' + location)
            }
        }
        return marks
    }

    function createTrimMark(suffixName, fromX, fromY, toX, toY) {
        var weight = parseUnit(self.weightEdit.text)
        var color = parseColor(self.colorList.selection.text)

        var mark = document.pathItems.add()
        mark.name = 'Trim ' + suffixName
        mark.fillColor = COLOR_NONE
        mark.strokeColor = color
        mark.strokeWidth = weight // important to set weight before color

        var fromPosition = [fromX, fromY]
        var fromPoint = mark.pathPoints.add()
        fromPoint.anchor = fromPosition
        fromPoint.leftDirection = fromPosition
        fromPoint.rightDirection = fromPosition

        var toPosition = [toX, toY]
        var toPoint = mark.pathPoints.add()
        toPoint.anchor = toPosition
        toPoint.leftDirection = toPosition
        toPoint.rightDirection = toPosition

        return mark
    }
}

function TrimMarkLocationsPanel(parent) {
    var self = this
    this.main = parent.addVPanel('Locations')

    var checkBounds = [0, 0, 15, 15]
    this.locations1 = this.main.addHGroup()
    this.locations1.addText(checkBounds)
    this.topLeftCheck = this.locations1.addCheckBox(checkBounds)
    this.topLeftCheck.value = true
    this.locations1.addText(checkBounds)
    this.topRightCheck = this.locations1.addCheckBox(checkBounds)
    this.topRightCheck.value = true
    this.locations1.addText(checkBounds)
    this.locations2 = this.main.addHGroup()
    this.leftTopCheck = this.locations2.addCheckBox(checkBounds)
    this.leftTopCheck.value = true
    this.locations2.addText(checkBounds, '\u2196', 'center')
    this.locations2.addText(checkBounds, '\u2191', 'center')
    this.locations2.addText(checkBounds, '\u2197', 'center')
    this.rightTopCheck = this.locations2.addCheckBox(checkBounds)
    this.rightTopCheck.value = true
    this.locations3 = this.main.addHGroup()
    this.locations3.addText(checkBounds)
    this.locations3.addText(checkBounds, '\u2190', 'center')
    this.locations3.addText(checkBounds, '\u25CF', 'center')
    this.locations3.addText(checkBounds, '\u2192', 'center')
    this.locations3.addText(checkBounds)
    this.locations4 = this.main.addHGroup()
    this.leftBottomCheck = this.locations4.addCheckBox(checkBounds)
    this.leftBottomCheck.value = true
    this.locations4.addText(checkBounds, '\u2199', 'center')
    this.locations4.addText(checkBounds, '\u2193', 'center')
    this.locations4.addText(checkBounds, '\u2198', 'center')
    this.rightBottomCheck = this.locations4.addCheckBox(checkBounds)
    this.rightBottomCheck.value = true
    this.locations5 = this.main.addHGroup()
    this.locations5.addText(checkBounds)
    this.bottomLeftCheck = this.locations5.addCheckBox(checkBounds)
    this.bottomLeftCheck.value = true
    this.locations5.addText(checkBounds)
    this.bottomRightCheck = this.locations5.addCheckBox(checkBounds)
    this.bottomRightCheck.value = true
    this.locations5.addText(checkBounds)
    this.main.setTooltip('Select which trim marks will be added.')

    this.getLocations = function() {
        var locations = []
        if (self.topLeftCheck.value) locations.push(LOCATION_TOP_LEFT)
        if (self.topRightCheck.value) locations.push(LOCATION_TOP_RIGHT)
        if (self.rightTopCheck.value) locations.push(LOCATION_RIGHT_TOP)
        if (self.rightBottomCheck.value) locations.push(LOCATION_RIGHT_BOTTOM)
        if (self.bottomRightCheck.value) locations.push(LOCATION_BOTTOM_RIGHT)
        if (self.bottomLeftCheck.value) locations.push(LOCATION_BOTTOM_LEFT)
        if (self.leftBottomCheck.value) locations.push(LOCATION_LEFT_BOTTOM)
        if (self.leftTopCheck.value) locations.push(LOCATION_LEFT_TOP)
        return locations
    }
}