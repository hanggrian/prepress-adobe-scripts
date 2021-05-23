function ReverseOrderGroup(parent) {
    var self = this
    this.reverseCheck

    this.main = parent.vgroup(function(group) {
        group.alignment = 'right'
        group.setHelpTips('Iterate items at reverse order.')
        self.reverseCheck = group.checkBox(undefined, 'Reverse Order')
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
        group.setHelpTips('Iterate items through group and clipping masks.')
        self.recursiveCheck = group.checkBox(undefined, 'Recursive')
    })

    this.forEachAware = function(collection, action) {
        if (!self.recursiveCheck.value) {
            collection.forEach(action)
        } else {
            collection.forEachItem(action)
        }
    }
}