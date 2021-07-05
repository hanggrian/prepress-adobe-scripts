function MaintainSizeGroup(parent) {
    var self = this
    this.check

    this.main = parent.hgroup(function(group) {
        group.alignment = 'right'
        self.check = group.checkBox(undefined, 'Maintain Size', function(it) {
            it.setTooltip('Keep curent dimension after action')
            it.select()
        })
    })

    this.isSelected = function() {
        return self.check.value
    }
}