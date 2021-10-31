var ORDER_LAYERS = [
    ['Default', 'ic_order_layer'],
    ['Reversed', 'ic_order_layer']
]
var ORDER_NAMES = [
    ['Ascending', 'ic_order_name'],
    ['Descending', 'ic_order_name']
]
var ORDER_POSITIONS = [
    ['Horizontal', 'ic_order_position'],
    ['Vertical', 'ic_order_position']
]

function OrderByGroup(parent, ordersCollection) {
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
        group.tips('Modify how iteration should be operated')
        self.list = group.dropDownList(undefined, orders).also(function(it) {
            it.title = 'Order by:'
        })
    })

    this.forEach = function(collection, action) {
        if (self.list.selection.text === 'Default') {
            collection.forEach(action)
            return
        } else if (self.list.selection.text === 'Reversed') {
            collection.forEachReversed(action)
            return
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
        var aX = Math.floor(getBounds(a).getLeft())
        var aY = Math.floor(getBounds(a).getTop())
        var bX = Math.floor(getBounds(b).getLeft())
        var bY = Math.floor(getBounds(b).getTop())
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
        var aX = Math.floor(getBounds(a).getLeft())
        var aY = Math.floor(getBounds(a).getTop())
        var bX = Math.floor(getBounds(b).getLeft())
        var bY = Math.floor(getBounds(b).getTop())
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