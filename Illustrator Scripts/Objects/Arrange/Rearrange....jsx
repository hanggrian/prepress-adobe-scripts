#target Illustrator
#include "../../.lib/commons.js"

checkMultipleSelection()

var initialPositions = [selection[0].absoluteZOrderPosition]
for (var i = 1; i < selection.length; i++) {
  check(selection[i - 1].absoluteZOrderPosition - selection[i].absoluteZOrderPosition === 1,
    "Objects to arrange must be connected to each other")
  initialPositions.push(selection[i].absoluteZOrderPosition)
}

var dialog = new Dialog("Rearrange Objects")
var orderByList
var config = configs.resolve("objects/rearrange")

dialog.vgroup(function(main) {
  orderByList = new OrderByList(main, [ORDER_POSITIONS]).also(function(it) {
    it.selectText(config.getString("order", "Horizontal"))
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

  config.setString("order", orderByList.selection.text)
})
dialog.show()
