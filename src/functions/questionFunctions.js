import hints from './../data/hints'

// export const tallyResponse = (state) => {
//   console.log(state)
// }

export const checkAnswer = (submitted, correct) => {
  if (submitted === correct) return 0
  else {
    const normalizeSubmit = removeDiacritics(submitted)
    const normalizeCorrect = removeDiacritics(correct)
    if (normalizeSubmit === normalizeCorrect) return 1
    else return 2
  }
}

const removeDiacritics = str => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export const pullHints = (tense, infinitive) => {
  if (hints[tense]) {
    if (hints[tense][infinitive]) return hints[tense][infinitive]
    else return null
  } else return null
}