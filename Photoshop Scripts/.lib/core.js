// Core libraries are base of all scripts,
// providing tools for creating new document or modifying current document.

//@include '../../.stdlib/stdlib.js'

//@include 'core-resources.js'

//@include 'core-preferences.js'
//@include 'core-units.js'

Scripts.PATH_LIB = new File($.fileName).path

Language.set(Language.valueOfCode(preferences2.getString('language_code', Language.EN.code)))
