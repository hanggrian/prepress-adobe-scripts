function MaintainSizeGroup(parent) {
    var self = this
    this.check

    this.main = parent.hgroup(function(group) {
        group.alignment = 'right'
        group.tips('Keep curent dimension after action')
        self.check = group.checkBox(undefined, 'Maintain Size').also(SELECTED)
    })

    this.isSelected = function() { return self.check.value }
}