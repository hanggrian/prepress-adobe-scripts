function RangeGroup(parent, textBounds, editBounds) {
    var self = this
    this.startEdit, this.endEdit

    var actualEditBounds = [editBounds[0] / 2 - 13, editBounds[1]]
    this.main = parent.hgroup(function(group) {
        group.setTooltips('From starting point to ending point')
        group.staticText(textBounds, 'Range:', JUSTIFY_RIGHT)
        self.startEdit = group.editText(actualEditBounds, '1', function(it) {
            it.validateDigits()
            it.activate()
        })
        group.staticText(undefined, '–', JUSTIFY_RIGHT) // use en dash
        self.endEdit = group.editText(actualEditBounds, undefined, VALIDATE_DIGITS)
    })

    this.getStart = function() {
        return parseInt(self.startEdit.text) - 1
    }

    this.getEnd = function() {
        return parseInt(self.endEdit.text) - 1
    }

    this.getLength = function() {
        var length = self.getEnd() - self.getStart() + 1
        if (length <= 0) {
            errorWithAlert('End range cannot be less than start')
        }
        return length
    }
}