var ORDERS_DEFAULTS = ['Default', 'Reversed']
var ORDERS_NAMES = ['Ascending', 'Descending']
var ORDERS_POSITIONS = ['Horizontal', 'Vertical']

function OrderByGroup(parent, ordersCollection, textBounds, editBounds) {
    var self = this
    this.list

    checkNotNull(ordersCollection)
    var orders = []
    ordersCollection.forEach(function(it, i) {
        orders = orders.concat(it)
        if (i !== ordersCollection.lastIndex()) {
            orders.push('-')
        }
    })

    this.main = parent.hgroup(function(group) {
        group.staticText(textBounds, 'Order by', JUSTIFY_RIGHT)
        self.list = group.dropDownList(editBounds, orders)
    })

    this.forEach = function(collection, action) {
        if (self.list.selection.text === 'Default') {
            collection.forEach(action)
        } else if (self.list.selection.text === 'Reversed') {
            collection.forEachReversed(action)
        }
        var sortedCollection = collection.map(function(it) { return it })
        if (self.list.selection.text === 'Ascending') {
            sortedCollection.sort(sortAscending)
        } else if (self.list.selection.text === 'Descending') {
            sortedCollection.sort(sortDescending)
        } else if (self.list.selection.text === 'Horizontal') {
            sortedCollection.sort(sortHorizontal)
        } else if (self.list.selection.text === 'Vertical') {
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