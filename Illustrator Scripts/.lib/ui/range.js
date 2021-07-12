/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

function RangeGroup(parent, textBounds, editBounds) {
    var self = this
    this.startEdit, this.endEdit

    this.minRange = 0
    this.maxRange = Number.MAX_VALUE

    editBounds = [editBounds[0] / 2 - 13, editBounds[1]]
    this.main = parent.hgroup(function(group) {
        group.setTooltips('From starting point to ending point')
        group.staticText(textBounds, 'Range:', JUSTIFY_RIGHT)
        self.startEdit = group.editText(editBounds, '1', VALIDATE_DIGITS)
        group.staticText(undefined, '–', JUSTIFY_RIGHT) // use en dash
        self.endEdit = group.editText(editBounds, undefined, VALIDATE_DIGITS)
    })

    this.getStartText = function() {
        checkValidity
        return self.startEdit.text
    }

    this.getEndText = function() {
        checkValidity
        return self.endEdit.text
    }

    this.getStart = function() {
        var start = parseInt(self.getStartText()) - 1
        if (start < self.minRange) {
            errorWithAlert('Start range cannot be less than ' + self.minRange)
        }
        return start
    }

    this.getEnd = function() {
        var end = parseInt(self.getEndText()) - 1
        if (end > self.maxRange) {
            errorWithAlert('End range cannot be more than ' + self.maxRange)
        }
        return end
    }

    this.getLength = function() {
        checkValidity()
        return self.getEnd() - self.getStart() + 1
    }

    this.includes = function(i) {
        checkValidity()
        return i >= self.getStart() && i <= self.getEnd()
    }

    this.forEach = function(action) {
        checkValidity()
        var start = self.getStart()
        var end = start + self.getLength() // necessary to call `getLength` instead of `getEnd` to check range
        for (var i = start; i < end; i++) {
            action(i)
        }
    }

    function checkValidity() {
        if (parseInt(self.startEdit.text) > parseInt(self.endEdit.text)) {
            errorWithAlert('Invalid range')
        }
    }
}