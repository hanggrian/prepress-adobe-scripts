function MaintainDimensionGroup(parent) {
    var self = this
    this.maintainCheck

    this.main = parent.vgroup(function(group) {
        group.alignment = 'right'
        group.setHelpTips('Keep current size & position after relinking.')
        self.maintainCheck = group.checkBox(undefined, 'Maintain Dimension', SELECTED)
    })

    this.isMaintain = function() {
        return self.maintainCheck.value
    }
}

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