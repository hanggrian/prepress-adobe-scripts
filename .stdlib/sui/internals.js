/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/** Set tooltip to children. */
function _tip(child, text) {
    text = text.trim()
    child.helpTip = text.endsWith('.') || text.endsWith('?') ? text : text + '.'
    return child
}

/** Set tooltip to parent. */
function _tips(parent, text) {
    // queue tooltip that will be attached upon children creation
    parent.helpTips = text
    // attach it manually in case `setHelpTips` is called when children are already created
    parent.children.forEach(function(it) {
        if (it.helpTip !== text) {
            _tip(it, text)
        }
    })
    return parent
}

/** Expand `[width, height]` to `[x, y, width, height]`. */
function _expandBounds(bounds) {
    return bounds !== undefined && bounds.length === 2
        ? [0, 0, bounds[0], bounds[1]]
        : bounds
}

/** See validators. */
function _removeRegexes(string, regexes) {
    var s = string
    for (var i = 0; i < regexes.length; i++) {
        s = s.replace(regexes[i], '')
    }
    return s
}

/** Returns resource file, or self if already a file. */
function _asFile(image) {
    if (typeof image === 'string' || image instanceof String) {
        return getImage(image)
    }
    return image
}

/** Split list items to texts and files. */
function _splitItems(items) {
    if (items.all(function(it) { return typeof it === 'string' || it instanceof String })) {
        return [items, []]
    }
    var itemTexts = []
    var itemFiles = []
    items.forEach(function(it) {
        itemTexts.push(it[0])
        itemFiles.push(it[0] === '-' ? undefined : _asFile(it[1]))
    })
    return [itemTexts, itemFiles]
}