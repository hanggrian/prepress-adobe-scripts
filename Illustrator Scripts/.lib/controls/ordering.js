var Ordering = new Enum({
  LAYER_DEFAULT: { name: R.string.default, image: "ic_order_layer_default" },
  LAYER_REVERSED: { name: R.string.reversed, image: "ic_order_layer_reversed" },
  NAME_ASCENDING: { name: R.string.ascending, image: "ic_order_name_ascending" },
  NAME_DESCENDING: { name: R.string.descending, image: "ic_order_name_descending" },
  POSITION_HORIZONTAL: { name: R.string.horizontal, image: "ic_order_position_horizontal" },
  POSITION_VERTICAL: { name: R.string.vertical, image: "ic_order_position_vertical" },
  POSITION_HORIZONTALRTL: { name: R.string.horizontal_rtl, image: "ic_order_position_horizontalrtl" },
  POSITION_VERTICALRTL: { name: R.string.vertical_rtl, image: "ic_order_position_verticalrtl" },

  layerValues: function() { return [this.LAYER_DEFAULT, this.LAYER_REVERSED] },
  nameValues: function() { return [this.NAME_ASCENDING, this.NAME_DESCENDING] },
  positionValues: function() {
    return [this.POSITION_HORIZONTAL, this.POSITION_VERTICAL, this.POSITION_HORIZONTALRTL, this.POSITION_VERTICALRTL]
  },
  layerList: function() { return Collections.map(this.layerValues(), function(it) { return [it.name, it.image] }) },
  nameList: function() { return Collections.map(this.nameValues(), function(it) { return [it.name, it.image] }) },
  positionList: function() {
    return Collections.map(this.positionValues(), function(it) { return [it.name, it.image] })
  }
})

/**
 * DropDownList of ordering choices.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {Array} ordersCollection ordering options.
 */
function OrderingList(parent, ordersCollection) {
  var orders = []
  Collections.forEach(checkNotNull(ordersCollection), function(it, i) {
    orders = orders.concat(it)
    if (i !== Collections.lastIndex(ordersCollection)) {
      orders.push("-")
    }
  })

  var self = parent.dropDownList(undefined, orders).also(function(it) {
    it.helpTip = R.string.tip_orderby
    it.title = getString(R.string.order_by) + ":"
  })

  /**
   * Get a comparator for `Array.sort`.
   * @return {Function}
   */
  self.getComparator = function() {
    var ordering = Ordering.valueOf(self.selection)
    if (ordering === Ordering.LAYER_DEFAULT) return function() { return 1 }
    else if (ordering === Ordering.LAYER_REVERSED) return function() { return -1 }
    else if (ordering === Ordering.NAME_ASCENDING) return sortAscending
    else if (ordering === Ordering.NAME_DESCENDING) return sortDescending
    else if (ordering === Ordering.POSITION_HORIZONTAL) return sortHorizontal
    else if (ordering === Ordering.POSITION_VERTICAL) return sortVertical
    else if (ordering === Ordering.POSITION_HORIZONTALRTL) return sortHorizontalRtl
    else if (ordering === Ordering.POSITION_VERTICALRTL) return sortVerticalRtl
    else error("Ordering error")
  }

  function getRectangle(item) { return item.typename === "Artboard" ? item.artboardRect : item.geometricBounds }

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
    var aX = getRectangle(a).getLeft().floor()
    var aY = getRectangle(a).getTop().floor()
    var bX = getRectangle(b).getLeft().floor()
    var bY = getRectangle(b).getTop().floor()
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
    var aX = getRectangle(a).getLeft().floor()
    var aY = getRectangle(a).getTop().floor()
    var bX = getRectangle(b).getLeft().floor()
    var bY = getRectangle(b).getTop().floor()
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
    var aX = getRectangle(a).getLeft().floor()
    var aY = getRectangle(a).getTop().floor()
    var bX = getRectangle(b).getLeft().floor()
    var bY = getRectangle(b).getTop().floor()
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
    var aX = getRectangle(a).getLeft().floor()
    var aY = getRectangle(a).getTop().floor()
    var bX = getRectangle(b).getLeft().floor()
    var bY = getRectangle(b).getTop().floor()
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
