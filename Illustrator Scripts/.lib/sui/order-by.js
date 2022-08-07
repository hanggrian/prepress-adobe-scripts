var ORDER_LAYERS = [
  ["Default", "ic_order_layer_default"],
  ["Reversed", "ic_order_layer_reversed"]
]
var ORDER_NAMES = [
  ["Ascending", "ic_order_name_ascending"],
  ["Descending", "ic_order_name_descending"]
]
var ORDER_POSITIONS = [
  ["Horizontal", "ic_order_position_horizontal"],
  ["Vertical", "ic_order_position_vertical"],
  ["Horizontal RTL", "ic_order_position_horizontalrtl"],
  ["Vertical RTL", "ic_order_position_verticalrtl"]
]

function OrderByGroup(parent, ordersCollection) {
  var self = this
  this.list

  checkNotNull(ordersCollection)
  var orders = []
  ordersCollection.forEach(function(it, i) {
    orders = orders.concat(it)
    if (i !== ordersCollection.lastIndex()) {
      orders.push("-")
    }
  })

  this.main = parent.hgroup(function(group) {
    group.tips("Modify how iteration should be operated")
    self.list = group.dropDownList(undefined, orders).also(function(it) {
      it.title = "Order by:"
    })
  })

  this.forEach = function(collection, action) {
    if (self.list.selection.text === "Default") {
      collection.forEach(action)
      return
    } else if (self.list.selection.text === "Reversed") {
      collection.forEachReversed(action)
      return
    }
    var sortedCollection = collection.map(function(it) { return it })
    if (self.list.selection.text === "Ascending") {
      sortedCollection.sort(sortAscending)
    } else if (self.list.selection.text === "Descending") {
      sortedCollection.sort(sortDescending)
    } else if (self.list.selection.text === "Horizontal") {
      sortedCollection.sort(sortHorizontal)
    } else if (self.list.selection.text === "Vertical") {
      sortedCollection.sort(sortVertical)
    } else if (self.list.selection.text === "Horizontal RTL") {
      sortedCollection.sort(sortHorizontalRtl)
    } else if (self.list.selection.text === "Vertical RTL") {
      sortedCollection.sort(sortVerticalRtl)
    } else {
      error("Ordering error")
    }
    sortedCollection.forEach(action)
  }

  function getBounds(item) {
    return item.typename === "Artboard" ? item.artboardRect : item.geometricBounds
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
    if (aY < bY) {
      return 1
    } else if (aY > bY) {
      return -1
    }
    if (aX > bX) {
      return 1
    } else if (aX < bX) {
      return -1
    }
    return 0
  }

  function sortVertical(a, b) {
    var aX = getBounds(a).getLeft().floor()
    var aY = getBounds(a).getTop().floor()
    var bX = getBounds(b).getLeft().floor()
    var bY = getBounds(b).getTop().floor()
    if (aX > bX) {
      return 1
    } else if (aX < bX) {
      return -1
    }
    if (aY < bY) {
      return 1
    } else if (aY > bY) {
      return -1
    }
    return 0
  }

  function sortHorizontalRtl(a, b) {
    var aX = getBounds(a).getLeft().floor()
    var aY = getBounds(a).getTop().floor()
    var bX = getBounds(b).getLeft().floor()
    var bY = getBounds(b).getTop().floor()
    if (aY < bY) {
      return 1
    } else if (aY > bY) {
      return -1
    }
    if (aX > bX) {
      return -1
    } else if (aX < bX) {
      return 1
    }
    return 0
  }

  function sortVerticalRtl(a, b) {
    var aX = getBounds(a).getLeft().floor()
    var aY = getBounds(a).getTop().floor()
    var bX = getBounds(b).getLeft().floor()
    var bY = getBounds(b).getTop().floor()
    if (aX > bX) {
      return -1
    } else if (aX < bX) {
      return 1
    }
    if (aY < bY) {
      return 1
    } else if (aY > bY) {
      return -1
    }
    return 0
  }
}
