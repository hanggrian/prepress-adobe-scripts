function ReverseOrderGroup(parent) {
    var self = this
    this.reverseCheck

    this.main = parent.vgroup(function(group) {
        group.alignment = 'right'
        self.reverseCheck = group.checkBox(undefined, 'Reverse Order', function(it) {
            it.select()
            it.setTooltip('Iterate items at reverse order')
        })
    })

    this.forEachAware = function(collection, action) {
        if (!self.reverseCheck.value) {
            collection.forEach(action)
        } else {
            collection.forEachReversed(action)
        }
    }
}

function RecursiveGroup(parent) {
    var self = this
    this.recursiveCheck

    this.main = parent.vgroup(function(group) {
        group.alignment = 'right'
        self.recursiveCheck = group.checkBox(undefined, 'Recursive', function(it) {
            it.setTooltip('Iterate items through group and clipping masks')
        })
    })

    this.forEachAware = function(collection, action) {
        if (!self.recursiveCheck.value) {
            collection.forEach(action)
        } else {
            collection.forEachItem(action)
        }
    }
}