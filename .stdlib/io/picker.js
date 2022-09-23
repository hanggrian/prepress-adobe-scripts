/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var FileExtension = new Enum({
  ADOBE_ILLUSTRATOR: { name: "Adobe Illustrator", value: ["ai"] },
  ADOBE_PDF: { name: "Adobe PDF", value: ["pdf"] },
  BMP: { name: "BMP", value: ["bmp"] },
  GIF89a: { name: "GIF89a", value: ["gif"] },
  JPEG: { name: "JPEG", value: ["jpg", "jpe", "jpeg"] },
  JPEG2000: { name: "JPEG2000", value: ["jpf", "jpx", "jp2", "j2k", "j2c", "jpc"] },
  PNG: { name: "PNG", value: ["png", "pns"] },
  PHOTOSHOP: { name: "Photoshop", value: ["psd", "psb", "pdd"] },
  TIFF: { name: "TIFF", value: ["tif", "tiff"] }
})

var FilePicker = {
  /**
   * Pick a folder to select.
   * @param {String} prompt title of the picker.
   * @return {Folder}
   */
  selectFolder: function(prompt) { return Folder.selectDialog(prompt) },

  /**
   * Pick single/multiple file to open.
   * @param {String} prompt title of the picker.
   * @param {Array} fileExtensions array of `FileExtension` enum.
   * @param {Array} multiSelect set to true to pick multiple items, default is false.
   * @return {File}
   */
  openFile: function(prompt, fileExtensions, multiSelect) {
    return File.openDialog(prompt, Internals.getFileFilters(fileExtensions), multiSelect || false)
  },

  /**
   * Pick single file to save.
   * @param {String} prompt title of the picker.
   * @param {Array} fileExtensions array of `FileExtension` enum.
   * @return {File}
   */
  saveFile: function(prompt, filters) { return File.saveDialog(prompt, Internals.getFileFilters(fileExtensions)) }
}
