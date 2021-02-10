function TypeArrangement(parent, textBounds) {
    var self = this
    var main = parent.addHGroup()

    main.addText(textBounds, 'Arrangement:', 'right')
    this.arrangementCheck = main.addCheckBox(undefined, 'Reverse')
    main.setTooltip('Iterate items at reverse-order.')

    this.isReverse = function() {
        return self.arrangementCheck.value
    }
}

function TypeAffix(parent, textBounds, editBounds) {
    var self = this
    var main = parent.addVPanel('Affix')

    this.prefix = main.addHGroup()
    this.prefix.addText(textBounds, 'Prefix:', 'right')
    this.prefixEdit = this.prefix.addEditText(editBounds)
    this.prefix.setTooltip('Extra text before content.')

    this.suffix = main.addHGroup()
    this.suffix.addText(textBounds, 'Suffix:', 'right')
    this.suffixEdit = this.suffix.addEditText(editBounds)
    this.suffix.setTooltip('Extra text after content.')
}