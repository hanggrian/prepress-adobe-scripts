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

    this.getStart = function() {
        checkValidity()
        var start = parseInt(self.startEdit.text) - 1
        if (start < self.minRange) {
            errorWithAlert('Start range cannot be less than ' + self.minRange)
        }
        return start
    }

    this.getEnd = function() {
        checkValidity()
        var end = parseInt(self.endEdit.text) - 1
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