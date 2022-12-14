var SKIPPED_WORDS = {
  en: ['and', 'as', 'at', 'by', 'in', 'on', 'or', 'to'],
  id: ['atau', 'dan', 'di', 'ke', 'sebagai', 'yang', 'pada', 'dengan']
}

/** A collection of rules, return false to report violation. */
var Rules = new Enum({

  /** No leading and trailing whitespace. Whitespaces are ` `, `\t` and `\n`. */
  UNNECESSARY_WHITESPACE: {
    text: 'Unnecessary Whitespace',
    enforce: function(key, _, value) {
      if (key.startsWith('message_')) {
        return true
      }
      return !value.startsWith(' ') && !value.startsWith('\n') && !value.startsWith('\t') &&
        !value.endsWith(' ') && !value.endsWith('\n') && !value.endsWith('\t')
    }
  },

  /**
   * Confirmations and tooltips must have end punctuation. Errors, however, are automatically
   * suffixed with period by native dialog, just like when throwing `Error`. End punctuation are `.`
   * , `?` and `!`.
   */
  END_PUNCTUATION: {
    text: 'End Punctuation',
    enforce: function(key, _, value) {
      if (key.startsWith('confirm_') || key.startsWith('tip_')) {
        return value.endsWith('.') || value.endsWith('?') || value.endsWith('!')
      }
      if (key.startsWith('error_')) {
        return !value.endsWith('.') && !value.endsWith('?') && !value.endsWith('!')
      }
      return true
    }
  },

  /** All texts are title case, just like most Adobe's controls. */
  TITLE_CASE: {
    text: 'Title-Case',
    enforce: function(key, language, value) {
      if (key.startsWith('confirm_') || key.startsWith('error_') || key.startsWith('message_') ||
        key.startsWith('progress_') || key.startsWith('tip_')) {
        return true
      }
      var words = value.split(' ')
      for (var i = 0; i < words.length; i++) {
        var word = words[i]
        var skippedWords = SKIPPED_WORDS[language]
        for (var j = 0; j < skippedWords.length; j++) {
          if (word.startsWith(skippedWords[j])) {
            return true
          }
        }
        var firstChar = word[0]
        if (firstChar.toUpperCase() !== firstChar) {
          return false
        }
      }
      return true
    }
  }
})

function checkRules(key, language, value) {
  Collections.forEach(Rules.values(), function(rule) {
    check(rule.enforce(key, language, value),
      '%s\n%s (%s): %s'.format(rule.text, key, language, value))
  })
}
