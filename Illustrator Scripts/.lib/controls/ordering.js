var Ordering = new Enum({
  LAYER_DEFAULT: {
    text: R.string.default,
    image: 'ic_order_layer_default',
    get: function(_, _) { return 1 },
  },
  LAYER_REVERSED: {
    text: R.string.reversed,
    image: 'ic_order_layer_reversed',
    get: function(_, _) { return -1 },
  },
  NAME_ASCENDING: {
    text: R.string.ascending,
    image: 'ic_order_name_ascending',
    get: function(a, b) {
      if (a.name > b.name) return 1
      else if (a.name < b.name) return -1
      return 0
    },
  },
  NAME_DESCENDING: {
    text: R.string.descending,
    image: 'ic_order_name_descending',
    get: function(a, b) {
      if (a.name < b.name) return 1
      else if (a.name > b.name) return -1
      return 0
    },
  },
  POSITION_HORIZONTAL: {
    text: R.string.horizontal,
    image: 'ic_order_position_horizontal',
    get: function(a, b) {
      var aX = Math.floor(Ordering.getRectangle(a).getLeft())
      var aY = Math.floor(Ordering.getRectangle(a).getTop())
      var bX = Math.floor(Ordering.getRectangle(b).getLeft())
      var bY = Math.floor(Ordering.getRectangle(b).getTop())
      if (aY < bY) return 1
      else if (aY > bY) return -1
      if (aX > bX) return 1
      else if (aX < bX) return -1
      return 0
    },
  },
  POSITION_VERTICAL: {
    text: R.string.vertical,
    image: 'ic_order_position_vertical',
    get: function(a, b) {
      var aX = Math.floor(Ordering.getRectangle(a).getLeft())
      var aY = Math.floor(Ordering.getRectangle(a).getTop())
      var bX = Math.floor(Ordering.getRectangle(b).getLeft())
      var bY = Math.floor(Ordering.getRectangle(b).getTop())
      if (aX > bX) return 1
      else if (aX < bX) return -1
      if (aY < bY) return 1
      else if (aY > bY) return -1
      return 0
    },
  },
  POSITION_HORIZONTALRTL: {
    text: R.string.horizontal_rtl,
    image: 'ic_order_position_horizontalrtl',
    get: function(a, b) {
      var aX = Math.floor(Ordering.getRectangle(a).getLeft())
      var aY = Math.floor(Ordering.getRectangle(a).getTop())
      var bX = Math.floor(Ordering.getRectangle(b).getLeft())
      var bY = Math.floor(Ordering.getRectangle(b).getTop())
      if (aY < bY) return 1
      else if (aY > bY) return -1
      if (aX > bX) return -1
      else if (aX < bX) return 1
      return 0
    },
  },
  POSITION_VERTICALRTL: {
    text: R.string.vertical_rtl,
    image: 'ic_order_position_verticalrtl',
    get: function(a, b) {
      var aX = Math.floor(Ordering.getRectangle(a).getLeft())
      var aY = Math.floor(Ordering.getRectangle(a).getTop())
      var bX = Math.floor(Ordering.getRectangle(b).getLeft())
      var bY = Math.floor(Ordering.getRectangle(b).getTop())
      if (aX > bX) return -1
      else if (aX < bX) return 1
      if (aY < bY) return 1
      else if (aY > bY) return -1
      return 0
    },
  },

  getRectangle: function(item) {
    return item.typename === 'Artboard'
      ? item.artboardRect
      : item.geometricBounds
  },

  layerValues: function() { return [Ordering.LAYER_DEFAULT, Ordering.LAYER_REVERSED] },
  nameValues: function() { return [Ordering.NAME_ASCENDING, Ordering.NAME_DESCENDING] },
  positionValues: function() {
    return [
      Ordering.POSITION_HORIZONTAL, Ordering.POSITION_VERTICAL,
      Ordering.POSITION_HORIZONTALRTL, Ordering.POSITION_VERTICALRTL]
  },
  layerList: function() {
    return Collections.map(Ordering.layerValues(), function(it) { return [it.text, it.image] })
  },
  nameList: function() {
    return Collections.map(Ordering.nameValues(), function(it) { return [it.text, it.image] })
  },
  positionList: function() {
    return Collections.map(Ordering.positionValues(), function(it) { return [it.text, it.image] })
  },
})

/**
 * DropDownList of ordering choices.
 * @param {!Group|!Panel|!Window} parent
 * @param {!Array<!Object>} ordersCollection
 */
function OrderingList(parent, ordersCollection) {
  checkNotNull(parent)
  checkNotNull(ordersCollection)

  var orders = []
  Collections.forEach(ordersCollection, function(it, i) {
    orders = orders.concat(it)
    if (i !== Collections.lastIndex(ordersCollection)) {
      orders.push('-')
    }
  })

  var self = parent.dropDownList(undefined, orders).also(function(it) {
    it.helpTip = R.string.tip_orderby
    it.title = getString(R.string.order_by) + ':'
  })

  /**
   * Get a comparator for `Array.sort`.
   * @return {function(number, number): number}
   */
  self.getComparator = function() { return Ordering.find(self.selection).get }

  return self
}
