#target Illustrator
#include '../.lib/commons.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [120, 21]

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename === 'PlacedItem' && it.isFileExists() && it.file.isPDF() })
check(items.isNotEmpty(), 'No PDF links found in selection')

var dialog = new Dialog('Change Page', 'relinking-files#change-page-f7')
var pdfPanel, rangeGroup, orderByGroup, maintainSizeGroup

dialog.vgroup(function(main) {
    main.alignChildren = 'right'
    pdfPanel = new OpenPDFPanel(main, BOUNDS_TEXT, BOUNDS_EDIT).also(function(panel) {
        panel.main.hgroup(function(group) {
            group.tips('Which pages should be used when opening a multipage document')
            group.staticText(BOUNDS_TEXT, 'Pages:').also(JUSTIFY_RIGHT)
            rangeGroup = new RangeGroup(group, BOUNDS_EDIT).also(function(it) {
                it.startEdit.activate()
            })
        })
    })
    orderByGroup = new OrderByGroup(main, [ORDER_LAYERS, ORDER_POSITIONS]).also(function(group) {
        group.list.selectText('Reversed')
    })
    maintainSizeGroup = new MaintainSizeGroup(main)
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
    var current = rangeGroup.getStart()
    var end = rangeGroup.getEnd()

    var progress = new ProgressPalette(items.length)
    orderByGroup.forEach(items, function(item, i) {
        progress.increment('Linking page {0}', current + 1)
        $.write(i + '. ')
        var width = item.width
        var height = item.height
        var position = item.position
        var file = item.file
        item.file = getImage('relink_fix') // Apply PDF fix
        preferences.setPDFPage(current)
        item.file = file
        current++
        if (current > end) {
            current--
        }
        if (maintainSizeGroup.isSelected()) {
            $.write('Keep size, ')
            item.width = width
            item.height = height
            item.position = position
        }
        $.writeln('Done')
    })
    selection = items
})
dialog.show()