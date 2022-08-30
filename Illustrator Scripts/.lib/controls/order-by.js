var OrderBy = {
  layers: function() {
    return [
      [R.string.default, "ic_order_layer_default"],
      [R.string.reversed, "ic_order_layer_reversed"]
    ]
  },
  names: function() {
    return [
      [R.string.ascending, "ic_order_name_ascending"],
      [R.string.descending, "ic_order_name_descending"]
    ]
  },
  positions: function() {
    return [
      [R.string.horizontal, "ic_order_position_horizontal"],
      [R.string.vertical, "ic_order_position_vertical"],
      [R.string.horizontal_rtl, "ic_order_position_horizontalrtl"],
      [R.string.vertical_rtl, "ic_order_position_verticalrtl"]
    ]
  }
}

/**
 * DropDownList of ordering choices.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {Array} ordersCollection ordering options.
 */
function OrderByList(parent, ordersCollection) {
  var orders = []
  Collections.forEach(checkNotNull(ordersCollection), function(it, i) {
    orders = orders.concat(it)
    if (i !== Collections.lastIndex(ordersCollection)) {
      orders.push("-")
    }
  })

  var self = parent.dropDownList(undefined, orders).also(function(it) {
    it.tooltip(R.string.tip_orderby)
    it.title = getString(R.string.order_by) + ":"
  })

  /**
   * Iterate collection using selected ordering.
   * @param {Array} collection source elements.
   * @param {Function} action runnable of element as parameter.
   * @returns
   */
  self.forEach = function(collection, action) {
    var imageName = self.selection.image.name.substringBefore(".png")
    if (imageName === "ic_order_layer_default") {
      Collections.forEach(collection, action)
      return
    } else if (imageName === "ic_order_layer_reversed") {
      Collections.forEachReversed(collection, action)
      return
    }
    var sortedCollection = Collections.map(collection, function(it) { return it })
    if (imageName === "ic_order_name_ascending") {
      sortedCollection.sort(sortAscending)
    } else if (imageName === "ic_order_name_descending") {
      sortedCollection.sort(sortDescending)
    } else if (imageName === "ic_order_position_horizontal") {
      sortedCollection.sort(sortHorizontal)
    } else if (imageName === "ic_order_position_vertical") {
      sortedCollection.sort(sortVertical)
    } else if (imageName === "ic_order_position_horizontalrtl") {
      sortedCollection.sort(sortHorizontalRtl)
    } else if (imageName === "ic_order_position_verticalrtl") {
      sortedCollection.sort(sortVerticalRtl)
    } else {
      errorWithAlert("Ordering error")
    }
    Collections.forEach(sortedCollection, action)
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

  return self
}
