var LOCATION_TOP_LEFT = 11
var LOCATION_TOP_RIGHT = 1
var LOCATION_RIGHT_TOP = 2
var LOCATION_RIGHT_BOTTOM = 4
var LOCATION_BOTTOM_RIGHT = 5
var LOCATION_BOTTOM_LEFT = 7
var LOCATION_LEFT_BOTTOM = 8
var LOCATION_LEFT_TOP = 10

var BOUNDS_CHECK = [15, 15]

function TrimMarksPanel(parent, textBounds, editBounds) {
    var self = this
    this.offsetEdit, this.lengthEdit, this.weightEdit, this.colorList

    this.main = parent.vpanel('Trim Marks', function(panel) {
        panel.alignChildren = 'fill'
        panel.hgroup(function(group) {
            group.setHelpTips('Distance between art and trim marks.')
            group.staticText(textBounds, 'Offset:', JUSTIFY_RIGHT)
            self.offsetEdit = group.editText(editBounds, unitsOf('2.5 mm'), VALIDATE_UNITS)
        })
        panel.hgroup(function(group) {
            group.setHelpTips('Size of trim marks.')
            group.staticText(textBounds, 'Length:', JUSTIFY_RIGHT)
            self.lengthEdit = group.editText(editBounds, unitsOf('2.5 mm'), VALIDATE_UNITS)
        })
        panel.hgroup(function(group) {
            group.setHelpTips('Thickness of trim marks.')
            group.staticText(textBounds, 'Weight:', JUSTIFY_RIGHT)
            self.weightEdit = group.editText(editBounds, '0.3', VALIDATE_UNITS) // the same value used in `Object > Create Trim Marks`
        })
        panel.hgroup(function(group) {
            group.setHelpTips('Color of trim marks.')
            group.staticText(textBounds, 'Color:', JUSTIFY_RIGHT)
            self.colorList = group.dropDownList(editBounds, COLORS, function(it) {
                it.selection = COLORS.indexOf('Registration')
            })
        })
    })
    
    /**
     * Create multiple trim marks around item.
     * The marks are created with clockwise ordering.
     * @param {PageItem} item art where trim marks will be applied to.
     * @param {Array} locations combination of 8 possible mark locations as defined in constants.
     * @returns {Array} created trim marks.
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
     * @returns {Array} created trim marks.
     */
    this.addToBounds = function(startX, startY, endX, endY, locations) {
        var offset = parseUnits(self.offsetEdit.text)
        var length = parseUnits(self.lengthEdit.text)
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
        var weight = parseUnits(self.weightEdit.text)
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
    this.topLeftCheck, this.topRightCheck
    this.leftTopCheck, this.rightTopCheck
    this.leftBottomCheck, this.rightBottomCheck
    this.bottomLeftCheck, this.bottomRightCheck

    this.main = parent.vpanel('Locations', function(panel) {
        panel.hgroup(function(group) {
            group.setHelpTips('Select which trim marks will be added.')
            group.staticText(BOUNDS_CHECK)
            self.topLeftCheck = group.checkBox(BOUNDS_CHECK, undefined, SELECTED)
            group.staticText(BOUNDS_CHECK)
            self.topRightCheck = group.checkBox(BOUNDS_CHECK, undefined, SELECTED)
            group.staticText(BOUNDS_CHECK)
        })
        panel.hgroup(function(group) {
            group.setHelpTips('Select which trim marks will be added.')
            self.leftTopCheck = group.checkBox(BOUNDS_CHECK, undefined, SELECTED)
            group.staticText(BOUNDS_CHECK, '\u2196', JUSTIFY_CENTER)
            group.staticText(BOUNDS_CHECK, '\u2191', JUSTIFY_CENTER)
            group.staticText(BOUNDS_CHECK, '\u2197', JUSTIFY_CENTER)
            self.rightTopCheck = group.checkBox(BOUNDS_CHECK, undefined, SELECTED)
        })
        panel.hgroup(function(group) {
            group.setHelpTips('Select which trim marks will be added.')
            group.staticText(BOUNDS_CHECK)
            group.staticText(BOUNDS_CHECK, '\u2190', JUSTIFY_CENTER)
            group.staticText(BOUNDS_CHECK, '\u25CF', JUSTIFY_CENTER)
            group.staticText(BOUNDS_CHECK, '\u2192', JUSTIFY_CENTER)
            group.staticText(BOUNDS_CHECK)
        })
        panel.hgroup(function(group) {
            group.setHelpTips('Select which trim marks will be added.')
            self.leftBottomCheck = group.checkBox(BOUNDS_CHECK, undefined, SELECTED)
            group.staticText(BOUNDS_CHECK, '\u2199', JUSTIFY_CENTER)
            group.staticText(BOUNDS_CHECK, '\u2193', JUSTIFY_CENTER)
            group.staticText(BOUNDS_CHECK, '\u2198', JUSTIFY_CENTER)
            self.rightBottomCheck = group.checkBox(BOUNDS_CHECK, undefined, SELECTED)
        })
        panel.hgroup(function(group) {
            group.setHelpTips('Select which trim marks will be added.')
            group.staticText(BOUNDS_CHECK)
            self.bottomLeftCheck = group.checkBox(BOUNDS_CHECK, undefined, SELECTED)
            group.staticText(BOUNDS_CHECK)
            self.bottomRightCheck = group.checkBox(BOUNDS_CHECK, undefined, SELECTED)
            group.staticText(BOUNDS_CHECK)
        })
    })

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