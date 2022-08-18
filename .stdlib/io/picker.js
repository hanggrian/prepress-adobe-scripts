/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var FILTERS_ADOBE_ILLUSTRATOR = ["Adobe Illustrator", "ai"]
var FILTERS_ADOBE_PDF = ["Adobe PDF", "pdf"]
var FILTERS_BMP = ["BMP", "bmp"]
var FILTERS_GIF89a = ["GIF89a", "gif"]
var FILTERS_JPEG = ["JPEG", "jpg", "jpe", "jpeg"]
var FILTERS_JPEG2000 = ["JPEG2000", "jpf", "jpx", "jp2", "j2k", "j2c", "jpc"]
var FILTERS_PNG = ["PNG", "png", "pns"]
var FILTERS_PHOTOSHOP = ["Photoshop", "psd", "psb", "pdd"]
var FILTERS_TIFF = ["TIFF", "tif", "tiff"]

var FilePicker = {
  /**
   * Pick a folder to select.
   * @param {String} prompt title of the picker.
   * @returns {Folder}
   */
  selectFolder: function(prompt) { return Folder.selectDialog(prompt) },

  /**
   * Pick single/multiple file to open.
   * @param {String} prompt title of the picker.
   * @param {Array} filters e.g.: [["Illustrator", "ai"], ["Photoshop", "psd", "psb", "pdd"]].
   * @param {Array} multiSelect set to true to pick multiple items, default is false.
   * @returns {File}
   */
  openFile: function(prompt, filters, multiSelect) {
    return File.openDialog(prompt, Internals.convertFileFilters(filters), multiSelect || false)
  },

  /**
   * Pick single file to save.
   * @param {String} prompt title of the picker.
   * @param {Array} filters e.g.: [["Illustrator", "ai"], ["Photoshop", "psd", "psb", "pdd"]].
   * @returns {File}
   */
  saveFile: function(prompt, filters) {
    return File.saveDialog(prompt, Internals.convertFileFilters(filters))
  }
}
