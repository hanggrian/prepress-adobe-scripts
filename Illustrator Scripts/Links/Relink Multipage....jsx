//@target illustrator
//@include '../.lib/commons.js'

var PREDICATE_LINKS = function(it) { return it.typename === 'PlacedItem' }
var SIZE_INPUT = [120, 21]

checkAnySelection()
check(Collections.anyItem(selection, PREDICATE_LINKS),
  getString(R.string.error_notypes_document, R.plurals.link.plural))

var dialog = new Dialog(R.string.relink_multipage, 'relinking-files/#relink-multipage')
var pdfPanel, rangeGroup, orderingList
var keepSizeCheck, recursiveCheck
var collection
var prefs = preferences2.resolve('links/relink_multipage')

var files = FilePicker.openFile(dialog.text, FileExtension.values(), true)

if (files !== null && Collections.isNotEmpty(files)) {
  collection = new FileCollection(files)

  dialog.vgroup(function(main) {
    main.alignChildren = 'fill'
    if (collection.hasPDF) {
      pdfPanel = new OpenPDFPanel(main, SIZE_INPUT)
    }
    main.vpanel(R.string.pages, function(panel) {
      panel.alignChildren = 'right'
      panel.hgroup(function(group) {
        group.helpTips = R.string.tip_relink_pages
        group.leftStaticText(undefined, R.string.pages)
        rangeGroup = new RangeGroup(group, SIZE_INPUT).also(function(it) {
          it.startEdit.activate()
          it.endEdit.text = collection.length
        })
      })
    })
    orderingList = new OrderingList(main, [Ordering.layerList(), Ordering.positionList()]).also(
      function(it) {
        it.alignment = 'right'
        it.selection = prefs.getInt('order')
      })
    main.hgroup(function(group) {
      group.alignment = 'right'
      keepSizeCheck = new KeepSizeCheck(group).also(function(it) {
        it.value = prefs.getBoolean('keep_size')
      })
      recursiveCheck = new RecursiveCheck(group).also(function(it) {
        it.value = prefs.getBoolean('recursive')
      })
    })
  })
  dialog.setCancelButton()
  dialog.setDefaultButton(undefined, function() {
    if (!rangeGroup.isValid()) {
      return Windows.alert(R.string.error_range, dialog.text, true)
    }
    var current = rangeGroup.getStart()
    var end = rangeGroup.getEnd()
    var source = recursiveCheck.value
      ? Collections.filterItem(selection, PREDICATE_LINKS)
      : selection
    var progress = new ProgressPalette(source.length)

    source.sort(orderingList.getComparator())
    Collections.forEach(source, function(item, i) {
      progress.increment(R.string.progress_relink, i + 1)
      print('Item %d page %d.'.format(i, current))
      var file = collection.get(current)
      var relinked = false
      if (!recursiveCheck.value && item.typename === 'GroupItem') {
        Collections.forEachItem([item], function(innerItem) {
          if (PREDICATE_LINKS(innerItem)) {
            relinked = relink(innerItem, file)
          }
        })
      } else {
        relinked = relink(item, file)
      }
      if (relinked && ++current > end) {
        current--
      }
      println('Done.')
    })
    selection = source

    prefs.setInt('order', orderingList.selection.index)
    prefs.setBoolean('keep_size', keepSizeCheck.value)
    prefs.setBoolean('recursive', recursiveCheck.value)
  })
  dialog.show()
}

function relink(item, file) {
  var width = item.width
  var height = item.height
  var position = item.position
  if (file.isPdf() && Items.isLinkExists(item) && item.file.isPdf()) {
    print('Applying PDF fix, ')
    item.file = getImage('relink_fix')
  }
  item.file = file
  if (keepSizeCheck.value) {
    print('Keep size, ')
    item.width = width
    item.height = height
    item.position = position
  }
  return true
}
