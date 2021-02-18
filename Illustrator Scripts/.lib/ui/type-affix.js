function TypeAffixPanel(parent, textBounds, editBounds) {
    var self = this
    this.main = parent.addVPanel('Affix')

    this.prefix = this.main.addHGroup()
    this.prefix.addText(textBounds, 'Prefix:', 'right')
    this.prefixEdit = this.prefix.addEditText(editBounds)
    this.prefix.setTooltip('Extra text before content.')

    this.suffix = this.main.addHGroup()
    this.suffix.addText(textBounds, 'Suffix:', 'right')
    this.suffixEdit = this.suffix.addEditText(editBounds)
    this.suffix.setTooltip('Extra text after content.')
}