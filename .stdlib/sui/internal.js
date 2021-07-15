/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

function _tip(child, text) {
    text = text.trim()
    child.helpTip = text.endsWith('.') || text.endsWith('?') ? text : text + '.'
    return child
}

function _tips(parent, text) {
    // queue tooltip that will be attached upon children creation
    parent.helpTips = text
    // attach it manually in case `setHelpTips` is called when children are already created
    parent.children.forEach(function(it) {
        if (it.helpTip === undefined) {
            _tip(it, text)
        }
    })
    return parent
}

function _expandBounds(bounds) {
    return bounds !== undefined && bounds.length === 2
        ? [0, 0, bounds[0], bounds[1]]
        : bounds
}

String.prototype.removeRegexes = function(regexes) {
    var s = this
    for (var i = 0; i < regexes.length; i++) {
        s = s.replace(regexes[i], '')
    }
    return s
}