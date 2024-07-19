import data from './../data/verb-init.js'
import _ from 'lodash';

export const createVerbObject = () => {
   const Verbs = {}
   for (const [index, verb] of data.entries()) {
       const objectName = createObjectName(verb)
      if (_.has(verb, 'id')) {
        Verbs[objectName] = verb
      } else {
        const objectData = extractData(verb, index)
        Verbs[objectName] = objectData
      }
      
  }
   return Verbs
}

const createObjectName = (verb) => {
  if (verb.innerId > 51) return _.camelCase([verb.tense, verb.infinitiveP, verb.pronounP, 'neg'])
  else return _.camelCase([verb.tense, verb.infinitiveP, verb.pronounP])
}
const extractData = (verb, i) => {
  if (verb.tense === 'imperative') {
    verb.fullP = `${verb.conjugationP} ${verb.pronounP}!`
    verb.fullE = `${verb.conjugationE}!`
  } else {
    verb.fullP = `${verb.pronounP} ${verb.conjugationP}`
    verb.fullE = `${verb.pronounE} ${verb.conjugationE}`
  }
  verb.id = i
  return verb
}

export const filterSelectedVerbTense = (tense, verbs) => {
  let filteredVerbs = []
  if (tense.length === 0) return filteredVerbs
  else if (tense[0] === 'all') {
    for (let verb in verbs) {
      filteredVerbs.push(verbs[verb])
    }
    return filteredVerbs
  }
  else {    
    for (let verb in verbs) {
      let isIncluded = tense.includes(verbs[verb].tense)
      if (isIncluded) filteredVerbs.push(verbs[verb])
    }
    return filteredVerbs
  }
}

export const shuffleVerbIds = (verbs) => {
  let array = verbs.map(verb => verb.id)
  for (let i = array.length - 1; i > 0; i-- ) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; 
 }
 return array
}