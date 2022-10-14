var Rules = {

  /** Non-messages should be trimmed. */
  notTrimmed: function(key, _, value) {
    if (key.startsWith('message_')) {
      return true
    }
    return value.trim() === value
  },

  /** Confirmation messages and tooltips are sentences, therefore must ends with `.` or `?`. */
  tipAndConfirmIsSentence: function(key, _, value) {
    if (!key.startsWith('confirm_') && !key.startsWith('tip_')) {
      return true
    }
    return value.endsWith('.') || value.endsWith('?')
  },

  /** Error are automatically suffixed with period, just like when throwing `Error`. */
  errorIsNotSentence: function(key, _, value) {
    if (!key.startsWith('error_')) {
      return true
    }
    return !value.endsWith('.') && !value.endsWith('?')
  },

  /** All texts are title case, just like most Adobe's controls. */
  titleCase: function(key, language, value) {
    if (key.startsWith('confirm_') || key.startsWith('error_') || key.startsWith('message_') ||
      key.startsWith('progress_') || key.startsWith('tip_')) {
      return true
    }
    var words = value.split(' ')
    for (var i = 0; i < words.length; i++) {
      var word = words[i]
      var skippedWords = SkippedWords[language]
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
  },

  enforce: function(key, language, value) {
    var getExceptionMessage = function(ruleName) {
      return 'Rule error \'%s\' at \'%s (%s)\': %s'.format(ruleName, key, language, value)
    }
    check(this.notTrimmed(key, language, value), getExceptionMessage('notTrimmed'))
    check(this.tipAndConfirmIsSentence(key, language, value),
      getExceptionMessage('tipAndConfirmIsSentence'))
    check(this.errorIsNotSentence(key, language, value), getExceptionMessage('errorIsNotSentence'))
    check(this.titleCase(key, language, value), getExceptionMessage('titleCase'))
  },
}

var SkippedWords = {
  en: ['and', 'as', 'at', 'by', 'in', 'on', 'or', 'to'],
  id: ['atau', 'dan', 'di', 'ke', 'sebagai', 'yang'],
}
