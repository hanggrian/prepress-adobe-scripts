function ReverseOrderGroup(parent) {
    var self = this
    this.reverseCheck

    this.main = parent.vgroup(function(group) {
        group.alignment = 'right'
        self.reverseCheck = group.checkBox(undefined, 'Reverse order')
        group.setTooltip('Iterate items at reverse order.')
    })

    this.forEachAware = function(collection, action) {
        if (!self.reverseCheck.value) {
            collection.forEach(action)
        } else {
            collection.forEachReversed(action)
        }
    }
}