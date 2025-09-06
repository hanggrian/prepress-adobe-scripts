/*<javascriptresource><menu>hide</menu></javascriptresource>*/

var FileExtension =
    new Enum({
      ADOBE_ILLUSTRATOR: {text: 'Adobe Illustrator', value: ['ai']},
      ADOBE_PDF: {text: 'Adobe PDF', value: ['pdf']},
      BMP: {text: 'BMP', value: ['bmp']},
      GIF89a: {text: 'GIF89a', value: ['gif']},
      JPEG: {text: 'JPEG', value: ['jpg', 'jpe', 'jpeg']},
      JPEG2000: {text: 'JPEG2000', value: ['jpf', 'jpx', 'jp2', 'j2k', 'j2c', 'jpc']},
      PNG: {text: 'PNG', value: ['png', 'pns']},
      PHOTOSHOP: {text: 'Photoshop', value: ['psd', 'psb', 'pdd']},
      TIFF: {text: 'TIFF', value: ['tif', 'tiff']},
    });

var FilePicker = {
  /**
   * Pick a folder to select.
   * @param {?string} prompt
   * @return {?Folder}
   */
  selectFolder: function(prompt) {
    return Folder.selectDialog(prompt);
  },

  /**
   * Pick single/multiple file to open.
   * @param {?string} prompt
   * @param {!Array<!Object>} fileExtensions enum FileExtension.
   * @param {?boolean=} multiSelect default is false.
   * @return {?File|?Array<!File>}
   */
  openFile: function(prompt, fileExtensions, multiSelect) {
    multiSelect = multiSelect || false;
    return File.openDialog(prompt, Internals.getFileFilters(fileExtensions), multiSelect);
  },

  /**
   * Pick single file to save.
   * @param {?string} prompt
   * @param {!Array<!Object>} fileExtensions enum FileExtension.
   * @return {?File}
   */
  saveFile: function(prompt, fileExtensions) {
    return File.saveDialog(prompt, Internals.getFileFilters(fileExtensions));
  },
};
