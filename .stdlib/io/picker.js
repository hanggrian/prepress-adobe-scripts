/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var FILTERS_ADOBE_ILLUSTRATOR = ['Adobe Illustrator', 'ai']
var FILTERS_ADOBE_PDF = ['Adobe PDF', 'pdf']
var FILTERS_BMP = ['BMP', 'bmp']
var FILTERS_GIF89a = ['GIF89a', 'gif']
var FILTERS_JPEG = ['JPEG', 'jpg', 'jpe', 'jpeg']
var FILTERS_JPEG2000 = ['JPEG2000', 'jpf', 'jpx', 'jp2', 'j2k', 'j2c', 'jpc']
var FILTERS_PNG = ['PNG', 'png', 'pns']
var FILTERS_PHOTOSHOP = ['Photoshop', 'psd', 'psb', 'pdd']
var FILTERS_TIFF = ['TIFF', 'tif', 'tiff']

/**
 * Pick a folder.
 * @param {String} prompt title of the picker.
 * @returns {Folder}
 */
function openFolder(prompt) {
  return Folder.selectDialog(prompt)
}

/**
 * Pick single/multiple file.
 * @param {String} prompt title of the picker.
 * @param {Array} filters e.g.: [['Illustrator', 'ai'], ['Photoshop', 'psd', 'psb', 'pdd']].
 * @param {Array} multiSelect set to true to pick multiple items, default is false.
 * @returns {File}
 */
function openFile(prompt, filters, multiSelect) {
  var nativeFilters
  if (OS_MAC) {
    nativeFilters = function(file) {
      var condition = file instanceof Folder // required to go through directory
      filters.forEach(function(array) {
        array.slice(1).forEach(function(ext) {
          condition = condition || file.getExtension() === ext.toLowerCase()
        })
      })
      return condition
    }
  } else {
    // expected filters = 'Adobe Illustrator:*.ai;Photoshop:*.psd,*.psb,*.pdd;'
    nativeFilters = ''
    var allExtensions = []
    filters.forEach(function(array) {
      check(array.length > 1, 'File extension required')
      var name = array.first()
      var extensions = array.slice(1)
      nativeFilters += name + ':*.' + extensions.join(';*.') + ','

      allExtensions = allExtensions.concat(extensions)
    })
    nativeFilters = 'All Formats:*.' + allExtensions.join(';*.') + ',' + nativeFilters
    if (nativeFilters.endsWith(',')) {
      nativeFilters = nativeFilters.substringBeforeLast(',')
    }
    println('Native filters = ' + nativeFilters)
  }
  return File.openDialog(prompt, nativeFilters, multiSelect || false)
}