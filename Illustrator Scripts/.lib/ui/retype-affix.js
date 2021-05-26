function RetypeAffixPanel(parent, textBounds, editBounds) {
    var self = this
    this.prefixEdit, this.suffixEdit

    this.main = parent.vpanel('Affix', function(panel) {
        panel.hgroup(function(group) {
            group.setHelpTips('Extra text before content, can be left empty.')
            group.staticText(textBounds, 'Prefix:', JUSTIFY_RIGHT)
            self.prefixEdit = group.editText(editBounds)
        
        })
        panel.hgroup(function(group) {
            group.setHelpTips('Extra text after content, can be left empty.')
            group.staticText(textBounds, 'Suffix:', JUSTIFY_RIGHT)
            self.suffixEdit = group.editText(editBounds)
        })
    })

    this.getPrefix = function() {
        return self.prefixEdit.text
    }

    this.getSuffix = function() {
        return self.suffixEdit.text
    }
}