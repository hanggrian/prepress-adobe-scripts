#target Illustrator
#include '../.lib/commons.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename === 'PlacedItem' })
check(items.isNotEmpty(), 'No links found in selection')

var dialog = new Dialog('Relink Multipage')
var pdfPanel, rangeGroup, orderByGroup, maintainSizeGroup

var files = openFile(dialog.title, [
    FILTERS_ADOBE_ILLUSTRATOR, FILTERS_ADOBE_PDF,
    FILTERS_BMP, FILTERS_GIF89a, FILTERS_JPEG, FILTERS_JPEG2000, FILTERS_PNG, FILTERS_PHOTOSHOP, FILTERS_TIFF
], true)

if (files !== null && files.isNotEmpty()) {
    var collection = new FileCollection(files)

    dialog.vgroup(function(main) {
        main.alignChildren = 'right'
        if (collection.hasPDF) {
            pdfPanel = new OpenPDFPanel(main, BOUNDS_TEXT, BOUNDS_EDIT)
        }
        main.vpanel('Pages', function(panel) {
            panel.hgroup(function(group) {
                group.tips('Which pages should be used when opening a multipage document')
                group.staticText(BOUNDS_TEXT, 'Pages:').also(JUSTIFY_RIGHT)
                rangeGroup = new RangeGroup(group, BOUNDS_EDIT).also(function(it) {
                    it.startEdit.activate()
                    it.endEdit.text = collection.length
                })
            })
        })
        orderByGroup = new OrderByGroup(main, [ORDERS_DEFAULTS, ORDERS_POSITIONS]).also(function(group) {
            group.list.selectText('Reversed')
        })
        maintainSizeGroup = new MaintainSizeGroup(main)
    })
    dialog.setCancelButton()
    dialog.setDefaultButton(undefined, function() {
        var current = rangeGroup.getStart()
        var end = rangeGroup.getEnd()

        var progress = new ProgressDialog(items.length, 'Linking files')
        orderByGroup.forEach(items, function(item, i) {
            $.write(i + '. ')
            var width = item.width
            var height = item.height
            var position = item.position
            var file = collection.get(current)
            if (file.isPDF() && item.isFileExists() && item.file.isPDF()) {
                progress.increment('Linking page {0}', current)
                $.write('Appling PDF fix, ')
                item.file = getResource('relink_fix.png')
            } else {
                progress.increment('Linking file {0}', unescape(file.name))
            }
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
}