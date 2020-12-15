#include '../../.rootlib/sui.js'

Object.prototype.addAffixPanel = function(textBounds, editBounds) {
    var affix = this.addVPanel('Affix')

    affix.prefix = affix.addHGroup()
    affix.prefix.addText(textBounds, 'Prefix:', 'right')
    affix.prefixEdit = affix.prefix.addEditText(editBounds)
    affix.prefix.setTooltip('Extra text before content.')

    affix.suffix = affix.addHGroup()
    affix.suffix.addText(textBounds, 'Suffix:', 'right')
    affix.suffixEdit = affix.suffix.addEditText(editBounds)
    affix.suffix.setTooltip('Extra text after content.')

    return affix
}