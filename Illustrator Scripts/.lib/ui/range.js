function RangeGroup(parent, textBounds, editBounds) {
    var self = this
    this.startEdit, this.endEdit

    this.minRange = 1
    this.maxRange = 2^53 - 1 // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER

    editBounds = [editBounds[0] / 2 - 13, editBounds[1]]
    this.main = parent.hgroup(function(group) {
        group.setTooltips('From starting point to ending point')
        group.staticText(textBounds, 'Range:', JUSTIFY_RIGHT)
        self.startEdit = group.editText(editBounds, '1', VALIDATE_DIGITS)
        group.staticText(undefined, '–', JUSTIFY_RIGHT) // use en dash
        self.endEdit = group.editText(editBounds, undefined, VALIDATE_DIGITS)
    })

    this.getStart = function() {
        var start = parseInt(self.startEdit.text) - 1
        if (start < self.minRange - 1) {
            errorWithAlert('Start range cannot be less than ' + self.minRange)
        }
        return start
    }

    this.getEnd = function() {
        var end = parseInt(self.endEdit.text) - 1
        if (end > self.maxRange - 1) {
            errorWithAlert('End range cannot be more than ' + self.maxRange)
        }
        return end
    }

    this.getLength = function() {
        var length = self.getEnd() - self.getStart() + 1
        if (length <= 0) {
            errorWithAlert('End range cannot be less than start')
        }
        return length
    }

    this.forEach = function(action) {
        var current = self.getStart()
        do {
            action(current++)
        } while (current < self.getLength())
    }
}