var NUP_MODES = [
    ['Simplex', 'ic_nup_simplex.png'],
    ['Duplex', 'ic_nup_duplex.png'],
    ['Duplex Stacked', 'ic_nup_duplexstacked.png']
]

function NUpModes(parent, n) {
    var self = this
    this.list

    this.main = parent.hgroup(function(group) {
        group.tips('How should the pages be organized')
        self.list = group.dropDownList(undefined, NUP_MODES).also(function(it) {
            it.title = 'Layout Mode:'
        })
    })

    this.isSimplex = function() { return self.list.selection.text === 'Simplex' }
    this.isDuplex = function() { return self.list.selection.text === 'Duplex' }
    this.isDuplexStacked = function() { return self.list.selection.text === 'Duplex Stacked' }

    this.checkPages = function(pages) {
        var pagesDivisor = self.isSimplex() ? n : n * 2
        if (pages % pagesDivisor !== 0) {
            errorWithAlert('Pages must be divisible by ' + pagesDivisor)
        }
    }
}