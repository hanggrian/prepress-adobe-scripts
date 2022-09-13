/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * @param {Array} extension file extensions that can be categorized as this file type.
 */
var FileType = Enums.of({
  ADOBE_ILLUSTRATOR: { name: "Adobe Illustrator", extensions: ["ai"] },
  ADOBE_PDF: { name: "Adobe PDF", extensions: ["pdf"] },
  BMP: { name: "BMP", extensions: ["bmp"] },
  GIF89a: { name: "GIF89a", extensions: ["gif"] },
  JPEG: { name: "JPEG", extensions: ["jpg", "jpe", "jpeg"] },
  JPEG2000: { name: "JPEG2000", extensions: ["jpf", "jpx", "jp2", "j2k", "j2c", "jpc"] },
  PNG: { name: "PNG", extensions: ["png", "pns"] },
  PHOTOSHOP: { name: "Photoshop", extensions: ["psd", "psb", "pdd"] },
  TIFF: { name: "TIFF", extensions: ["tif", "tiff"] }
})

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
    return File.openDialog(prompt, Internals.getFileFilters(filters), multiSelect || false)
  },

  /**
   * Pick single file to save.
   * @param {String} prompt title of the picker.
   * @param {Array} filters e.g.: [["Illustrator", "ai"], ["Photoshop", "psd", "psb", "pdd"]].
   * @returns {File}
   */
  saveFile: function(prompt, filters) { return File.saveDialog(prompt, Internals.getFileFilters(filters)) }
}
