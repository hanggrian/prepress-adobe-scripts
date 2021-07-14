/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/** Constructs a new string by appending substring. */
function buildString(builderAction) {
    var sb = new StringBuilder()
    builderAction(sb)
    return sb.toString()
}

function StringBuilder(initialValue) {
    var nativeString = initialValue || ''

    this.append = function(s) {
        if (s !== undefined) {
            nativeString += s
        }
        return this
    }

    this.appendLine = function(s) {
        if (s !== undefined) {
            nativeString += s
        }
        nativeString += '\n'
        return this
    }

    this.toString = function() {
        return nativeString
    }
}