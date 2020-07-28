#target Illustrator
#include '../.lib/preconditions.jsx'
#include '../.lib/units.jsx'

const DISTANCES = ['0 cm', '1 cm', '2 cm', '3 cm', '4 cm', '5 cm', '6 cm', '7 cm', '8 cm', '9 cm']

checkActiveDocument()

var document = app.activeDocument

var dialog = new Window('dialog', 'Rename plate')
dialog.alignChildren = 'fill'

var textBounds = [0, 0, 90, 21]
var editSmallBounds = [0, 0, 80, 21]
var editLargeBounds = [0, 0, 200, 21]

dialog.dateGroup = dialog.add('group')
dialog.dateGroup.add('statictext', textBounds, 'Date:').justify = 'right'
dialog.dateEdit = dialog.dateGroup.add('edittext', editSmallBounds, getToday())

dialog.printerGroup = dialog.add('group')
dialog.printerGroup.add('statictext', textBounds, 'Printer:').justify = 'right'
dialog.printerEdit = dialog.printerGroup.add('edittext', editSmallBounds)

dialog.customerGroup = dialog.add('group')
dialog.customerGroup.add('statictext', textBounds, 'Customer:').justify = 'right'
dialog.customerEdit = dialog.customerGroup.add('edittext', editLargeBounds)
dialog.customerEdit.active = true

dialog.jobGroup = dialog.add('group')
dialog.jobGroup.add('statictext', textBounds, 'Job:').justify = 'right'
dialog.jobEdit = dialog.jobGroup.add('edittext', editLargeBounds)

dialog.distanceGroup = dialog.add('group')
dialog.distanceGroup.add('statictext', textBounds, 'Distance:').justify = 'right'
dialog.distanceList = dialog.distanceGroup.add('dropdownlist', editSmallBounds, DISTANCES)
dialog.distanceList.selection = 0

dialog.lpiGroup = dialog.add('group')
dialog.lpiGroup.add('statictext', textBounds, 'LPI:').justify = 'right'
dialog.lpi133Radio = dialog.lpiGroup.add('radiobutton', undefined, '133')
dialog.lpi150Radio = dialog.lpiGroup.add('radiobutton', undefined, '150')
dialog.lpi175Radio = dialog.lpiGroup.add('radiobutton', undefined, '175')
dialog.lpi175Radio.value = true

var panelTextBounds = [0, 0, 60, 21]
dialog.objectPanel = dialog.add('panel', undefined, 'Text object')
dialog.objectPanel.alignChildren = 'fill'
dialog.objectTypeGroup = dialog.objectPanel.add('group')
dialog.objectTypeGroup.add('statictext', panelTextBounds, 'Type:').justify = 'right'
dialog.objectTypeFrameRadio = dialog.objectTypeGroup.add('radiobutton', undefined, 'TextFrameItem')
dialog.objectTypeFrameRadio.value = true
dialog.objectTypeStoryRadio = dialog.objectTypeGroup.add('radiobutton', undefined, 'Story')
dialog.objectNameGroup = dialog.objectPanel.add('group')
dialog.objectNameGroup.add('statictext', panelTextBounds, 'Name:').justify = 'right'
dialog.objectNameEdit = dialog.objectNameGroup.add('edittext', editSmallBounds, 'Title')

dialog.buttons = dialog.add('group')
dialog.buttons.alignment = 'right'
dialog.buttons.add('button', undefined, 'Cancel')
dialog.buttons.add('button', undefined, 'OK').onClick = function() {
    var words
    if (dialog.objectTypeFrameRadio.value) {
        words = document.textFrames.getByName(dialog.objectNameEdit.text).words
    } else {
        words = document.stories.getByName(dialog.objectNameEdit.text).words
    }
    words.removeAll()
    words.add(
        dialog.dateEdit.text + '_' +
        dialog.printerEdit.text + '_' +
        dialog.customerEdit.text + '_' +
        dialog.jobEdit.text + '_T' +
        dialog.distanceList.selection.text.substring(0, 1) + '#' +
        getLPI()
    )

    dialog.close()
}

var width = parseInt(document.width / MULTIPLIER_MM)
var height = parseInt(document.height / MULTIPLIER_MM)
if (width == 457 && height == 381) {
    dialog.printerEdit.text = 'GTO46'
    dialog.distanceList.selection = 4
} else if (width == 510 && height == 400) {
    dialog.printerEdit.text = 'GTO52'
    dialog.distanceList.selection = 4
} else if (width == 650 && height == 550) {
    dialog.printerEdit.text = 'MO65'
    dialog.distanceList.selection = 5
} else if (width == 254 && height == 381) {
    dialog.printerEdit.text = 'Multilith'
    dialog.lpi133Radio.value = true
} else if (width == 570 && height == 508) {
    dialog.printerEdit.text = 'OL58'
    dialog.distanceList.selection = 5
} else if (width == 670 && height == 560) {
    dialog.printerEdit.text = 'OL66'
    dialog.distanceList.selection = 5
} else if (width == 724 && height == 605) {
    dialog.printerEdit.text = 'OL72'
    dialog.distanceList.selection = 6
} else if (width == 770 && height == 605) {
    dialog.printerEdit.text = 'RYO75'
    dialog.distanceList.selection = 3
} else if (width == 525 && height == 459) {
    dialog.printerEdit.text = 'SM52'
    dialog.distanceList.selection = 6
} else if (width == 724 && height == 615) {
    dialog.printerEdit.text = 'SM72'
    dialog.distanceList.selection = 6
} else if (width == 730 && height == 600) {
    dialog.printerEdit.text = 'SM73'
    dialog.distanceList.selection = 6
} else if (width == 745 && height == 605) {
    dialog.printerEdit.text = 'SM74'
    dialog.distanceList.selection = 6
} else if (width == 1020 && height == 770) {
    dialog.printerEdit.text = 'SORS102'
} else if (width == 1030 && height == 790) {
    dialog.printerEdit.text = 'SORS103'
} else if (width == 254 && height == 394) {
    dialog.printerEdit.text = 'Toko'
    dialog.lpi133Radio.value = true
}

dialog.show()

function getToday() {
    var today = new Date()
    var year = today.getFullYear().toString()
    var month = (today.getMonth() + 1).toString()
    var date = today.getDate().toString()
    year = year.slice(-2)
    if (month.length == 1) month = '0' + month
    if (date.length == 1) date = '0' + date
    return year + month + date
}

function getLPI() {
    if (dialog.lpi133Radio.value) {
        return 133
    } else if (dialog.lpi150Radio.value) {
        return 150
    } else if (dialog.lpi175Radio.value) {
        return 175
    }
}