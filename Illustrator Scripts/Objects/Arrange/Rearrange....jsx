#target Illustrator
#include "../../.lib/commons.js"

checkMultipleSelection()

var initialPositions = [selection[0].absoluteZOrderPosition]
for (var i = 1; i < selection.length; i++) {
  check(selection[i - 1].absoluteZOrderPosition - selection[i].absoluteZOrderPosition === 1,
    "Objects to arrange must be connected to each other")
  initialPositions.push(selection[i].absoluteZOrderPosition)
}

var dialog = new Dialog(R.string.rearrange_objects)
var orderByList
var config = configs.resolve("objects/rearrange")

dialog.vgroup(function(main) {
  orderByList = new OrderByList(main, [OrderBy.positions()]).also(function(it) {
    it.selection = config.getInt("order")
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  // the idea is to keep pusing item to bottommost
  orderByList.forEach(selection, function(it) {
    var times = it.absoluteZOrderPosition - Collections.last(initialPositions)
    println("Moving %s %d times.", Items.getName(it), times)
    repeat(times, function() {
      it.zOrder(ZOrderMethod.SENDBACKWARD)
    })
  })

  config.setInt("order", orderByList.selection.index)
})
dialog.show()
