function ReverseOrderGroup(parent) {
    var self = this
    this.main = parent.addVGroup()
    
    this.main.alignment = 'right'
    this.reverseCheck = this.main.addCheckBox(undefined, 'Reverse order')
    this.main.setTooltip('Iterate items at reverse order.')

    this.forEachAware = function(collection, action) {
        if (!self.reverseCheck.value) {
            collection.forEach(action)
        } else {
            collection.forEachReversed(action)
        }
    }
}