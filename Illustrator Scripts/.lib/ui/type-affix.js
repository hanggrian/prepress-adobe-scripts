function TypeAffixPanel(parent, textBounds, editBounds) {
    var self = this
    this.prefixEdit, this.suffixEdit

    this.main = parent.vpanel('Affix', function(panel) {
        panel.hgroup(function(group) {
            group.staticText(textBounds, 'Prefix:', JUSTIFY_RIGHT)
            self.prefixEdit = group.editText(editBounds)
            group.setTooltip('Extra text before content, can be left empty.')
        
        })
        panel.hgroup(function(group) {
            group.staticText(textBounds, 'Suffix:', JUSTIFY_RIGHT)
            self.suffixEdit = group.editText(editBounds)
            group.setTooltip('Extra text after content, can be left empty.')
        })
    })

    this.getPrefix = function() {
        return self.prefixEdit.text
    }

    this.getSuffix = function() {
        return self.suffixEdit.text
    }
}