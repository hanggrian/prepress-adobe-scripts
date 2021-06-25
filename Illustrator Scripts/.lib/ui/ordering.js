var ORDERING_DEFAULTS = ['Default', 'Reversed']
var ORDERING_NAMES = ['Ascending', 'Descending']
var ORDERING_POSITIONS = ['Horizontal', 'Vertical']

function OrderingGroup(parent, orderings, textBounds, editBounds) {
    var self = this
    this.orderingList

    checkNotNull(orderings)
    var actualOrderings = []
    orderings.forEach(function(it, i) {
        actualOrderings = actualOrderings.concat(it)
        if (i !== orderings.lastIndex()) {
            actualOrderings.push('-')
        }
    })

    this.main = parent.hgroup(function(group) {
        group.staticText(textBounds, 'Ordering:', JUSTIFY_RIGHT)
        self.orderingList = group.dropDownList(editBounds, actualOrderings)
    })

    this.forEach = function(collection, action) {
        if (self.orderingList.selection.text === 'Default') {
            collection.forEach(action)
        } else if (self.orderingList.selection.text === 'Reversed') {
            collection.forEachReversed(action)
        }
        var sortedCollection = collection.map(function(it) { return it })
        if (self.orderingList.selection.text === 'Ascending') {
            sortedCollection.sort(sortAscending)
        } else if (self.orderingList.selection.text === 'Descending') {
            sortedCollection.sort(sortDescending)
        } else if (self.orderingList.selection.text === 'Horizontal') {
            sortedCollection.sort(sortHorizontal)
        } else if (self.orderingList.selection.text === 'Vertical') {
            sortedCollection.sort(sortVertical)
        } else {
            error('Ordering error')
        }
        sortedCollection.forEach(action)
    }

    function getBounds(item) {
        return item.typename === 'Artboard' ? item.artboardRect : item.geometricBounds
    }

    function sortAscending(a, b) {
        if (a.name > b.name) {
            return 1
        } else if (a.name < b.name) {
            return -1
        }
        return 0
    }

    function sortDescending(a, b) {
        if (a.name < b.name) {
            return 1
        } else if (a.name > b.name) {
            return -1
        }
        return 0
    }

    function sortHorizontal(a, b) {
        var aX = getBounds(a).getLeft().floor()
        var aY = getBounds(a).getTop().floor()
        var bX = getBounds(b).getLeft().floor()
        var bY = getBounds(b).getTop().floor()
        if (aY === bY) {
            if (aX > bX) {
                return 1
            } else if (aX < bX) {
                return -1
            }
        } else if (aY < bY) {
            return 1
        } else {
            return -1
        }
        return 0
    }

    function sortVertical(a, b) {
        var aX = getBounds(a).getLeft().floor()
        var aY = getBounds(a).getTop().floor()
        var bX = getBounds(b).getLeft().floor()
        var bY = getBounds(b).getTop().floor()
        if (aX === bX) {
            if (aY < bY) {
                return 1
            } else if (aY > bY) {
                return -1
            }
        } else if (aX > bX) {
            return 1
        } else {
            return -1
        }
        return 0
    }
}