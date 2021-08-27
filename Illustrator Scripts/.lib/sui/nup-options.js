function NUpOptionsGroup(parent, showRotate, showDuplex, showPerfectBound) {
    var self = this
    this.rotateCheck, this.duplexCheck, this.perfectBoundCheck

    this.main = parent.hgroup(function(group) {
        group.alignment = 'right'
        if (showRotate) {
            self.rotateCheck = group.checkBox(undefined, 'Rotate Pages').also(function(it) {
                it.tip('Should the page be rotated?')
            })
        }
        if (showDuplex) {
            self.duplexCheck = group.checkBox(undefined, 'Duplex Printing').also(function(it) {
                it.tip('Should the page be printed on both sides?')
            })
        }
        if (showPerfectBound) {
            self.perfectBoundCheck = group.checkBox(undefined, 'Perfect Bound Layout').also(function(it) {
                it.tip('Should the pages stacked on top of each other?')
            })
        }
    })

    this.isRotate = function() { return self.rotateCheck.value }
    this.isDuplex = function() { return self.duplexCheck.value }
    this.isPerfectBound = function() { return self.perfectBoundCheck.value }
}

function showNUpHelp(showRotate, showDuplex, showPerfectBound) {
    var dialog = new Dialog('Help')
    dialog.vgroup(function(main) {
        if (showRotate) {
            main.hpanel('Rotate Pages', function(panel) {
                panel.spacing = 20
                panel.image(undefined, 'nup_rotate.png')
                panel.staticText([200, 50],
                    'Rotate the pages 90 or 270 degree depending whether duplex printing is enabled.',
                    { multiline: true })
            })
        }
        if (showDuplex) {
            main.hpanel('Duplex Printing', function(panel) {
                panel.spacing = 20
                panel.image(undefined, 'nup_duplex.png')
                panel.staticText([200, 50],
                    'Duplex printing means that both sides of the paper should be printed.',
                    { multiline: true })
            })
        }
        if (showPerfectBound) {
            main.hpanel('Perfect Bound Layout', function(panel) {
                panel.spacing = 20
                panel.image(undefined, 'nup_perfectbound.png')
                panel.staticText([200, 50],
                    'When activated, the pages can be stacked to allow for easier perfect bound arrangement.',
                    { multiline: true })
            })
        }
    })
    dialog.setCancelButton('Close')
    dialog.show()
    return true
}