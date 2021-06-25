function RecursiveGroup(parent) {
    var self = this
    this.recursiveCheck

    this.main = parent.vgroup(function(group) {
        group.alignment = 'right'
        self.recursiveCheck = group.checkBox(undefined, 'Recursive', function(it) {
            it.setTooltip('Iterate items through group and clipping masks')
        })
    })

    this.forEach = function(collection, action) {
        if (!self.recursiveCheck.value) {
            collection.forEach(action)
        } else {
            collection.forEachItem(action)
        }
    }
}