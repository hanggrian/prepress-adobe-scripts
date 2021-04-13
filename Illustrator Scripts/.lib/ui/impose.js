function ImposePanel(parent, textBounds, editBounds) {
    var self = this
    this.main = parent.addVPanel('Impose Options')

    this.pages = this.main.addHGroup()
    this.pages.addText(textBounds, 'Pages:', 'right')
    this.pagesEdit = this.pages.addEditText(editBounds, '4')
    this.pagesEdit.validateDigits()
    this.pagesEdit.active = true
    this.pages.setTooltip('Number of pages.')

    this.width = this.main.addHGroup()
    this.width.addText(textBounds, 'Width:', 'right')
    this.widthEdit = this.width.addEditText(editBounds, '210 mm')
    this.widthEdit.validateUnits()

    this.height = this.main.addHGroup()
    this.height.addText(textBounds, 'Height:', 'right')
    this.heightEdit = this.height.addEditText(editBounds, '297 mm')
    this.heightEdit.validateUnits()

    this.bleed = this.main.addHGroup()
    this.bleed.addText(textBounds, 'Bleed:', 'right')
    this.bleedEdit = this.bleed.addEditText(editBounds, '0 mm')
    this.bleedEdit.validateUnits()

    this.getPages = function() {
        return parseUnit(self.pagesEdit.text)
    }

    this.getWidth = function() {
        return parseUnit(self.widthEdit.text)
    }

    this.getHeight = function() {
        return parseUnit(self.heightEdit.text)
    }

    this.getBleed = function() {
        return parseUnit(self.bleedEdit.text)
    }

    this.getDocumentPreset = function() {
        var preset = new DocumentPreset()
        preset.width = self.getWidth() * 2
        preset.height = self.getHeight()
        preset.numArtboards = self.getPages() / 2
        preset.rasterResolution = DocumentRasterResolution.HighResolution
        if (self.getBleed() > 0) {
            preset.documentBleedLink = true
            preset.documentBleedOffset = [
                self.getBleed(),
                self.getBleed(),
                self.getBleed(),
                self.getBleed()
            ]
        }
        return preset
    }
}