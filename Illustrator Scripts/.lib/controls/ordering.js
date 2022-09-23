var Ordering = new Enum({
  LAYER_DEFAULT: {
    name: R.string.default,
    image: "ic_order_layer_default",
    get: function(_, _) { return 1 }
  },
  LAYER_REVERSED: {
    name: R.string.reversed,
    image: "ic_order_layer_reversed",
    get: function(_, _) { return -1 }
  },
  NAME_ASCENDING: {
    name: R.string.ascending,
    image: "ic_order_name_ascending",
    get: function(a, b) {
      if (a.name > b.name) return 1
      else if (a.name < b.name) return -1
      return 0
    }
  },
  NAME_DESCENDING: {
    name: R.string.descending,
    image: "ic_order_name_descending",
    get: function(a, b) {
      if (a.name < b.name) return 1
      else if (a.name > b.name) return -1
      return 0
    }
  },
  POSITION_HORIZONTAL: {
    name: R.string.horizontal,
    image: "ic_order_position_horizontal",
    get: function(a, b) {
      var aX = Ordering.getRectangle(a).getLeft().floor()
      var aY = Ordering.getRectangle(a).getTop().floor()
      var bX = Ordering.getRectangle(b).getLeft().floor()
      var bY = Ordering.getRectangle(b).getTop().floor()
      if (aY < bY) return 1
      else if (aY > bY) return -1
      if (aX > bX) return 1
      else if (aX < bX) return -1
      return 0
    }
  },
  POSITION_VERTICAL: {
    name: R.string.vertical,
    image: "ic_order_position_vertical",
    get: function(a, b) {
      var aX = Ordering.getRectangle(a).getLeft().floor()
      var aY = Ordering.getRectangle(a).getTop().floor()
      var bX = Ordering.getRectangle(b).getLeft().floor()
      var bY = Ordering.getRectangle(b).getTop().floor()
      if (aX > bX) return 1
      else if (aX < bX) return -1
      if (aY < bY) return 1
      else if (aY > bY) return -1
      return 0
    }
  },
  POSITION_HORIZONTALRTL: {
    name: R.string.horizontal_rtl,
    image: "ic_order_position_horizontalrtl",
    get: function(a, b) {
      var aX = Ordering.getRectangle(a).getLeft().floor()
      var aY = Ordering.getRectangle(a).getTop().floor()
      var bX = Ordering.getRectangle(b).getLeft().floor()
      var bY = Ordering.getRectangle(b).getTop().floor()
      if (aY < bY) return 1
      else if (aY > bY) return -1
      if (aX > bX) return -1
      else if (aX < bX) return 1
      return 0
    }
  },
  POSITION_VERTICALRTL: {
    name: R.string.vertical_rtl,
    image: "ic_order_position_verticalrtl",
    get: function(a, b) {
      var aX = Ordering.getRectangle(a).getLeft().floor()
      var aY = Ordering.getRectangle(a).getTop().floor()
      var bX = Ordering.getRectangle(b).getLeft().floor()
      var bY = Ordering.getRectangle(b).getTop().floor()
      if (aX > bX) return -1
      else if (aX < bX) return 1
      if (aY < bY) return 1
      else if (aY > bY) return -1
      return 0
    }
  },

  getRectangle: function(item) { return item.typename === "Artboard" ? item.artboardRect : item.geometricBounds },

  layerValues: function() { return [Ordering.LAYER_DEFAULT, Ordering.LAYER_REVERSED] },
  nameValues: function() { return [Ordering.NAME_ASCENDING, Ordering.NAME_DESCENDING] },
  positionValues: function() {
    return [Ordering.POSITION_HORIZONTAL, Ordering.POSITION_VERTICAL,
      Ordering.POSITION_HORIZONTALRTL, Ordering.POSITION_VERTICALRTL]
  },
  layerList: function() { return Collections.map(Ordering.layerValues(), function(it) { return [it.name, it.image] }) },
  nameList: function() { return Collections.map(Ordering.nameValues(), function(it) { return [it.name, it.image] }) },
  positionList: function() {
    return Collections.map(Ordering.positionValues(), function(it) { return [it.name, it.image] })
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
  self.getComparator = function() { return Ordering.valueOf(self.selection).get }

  return self
}
