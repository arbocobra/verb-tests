import { createSlice } from '@reduxjs/toolkit';
import { createVerbObject, filterSelectedVerbTense, shuffleVerbIds } from '../functions/loadingFunctions';

const initialState = {
  isActive: false,
  filteredVerbs: [],
  tenseSelection: [],
  questions: {
    currentQuestion: null,
    shuffledIds: [],
    correctAnswers: [],
    incorrectAnswers: []
  }
 }

export const verbsSlice = createSlice({
   name: 'verbs',
   initialState: initialState,
   reducers: {
      startTest: (state, action) => {
        let filters = action.payload
        let allVerbs = createVerbObject()
        let filteredVerbs = filterSelectedVerbTense(filters, allVerbs)
        let shuffledIds = shuffleVerbIds(filteredVerbs)
        let firstQuestion = filteredVerbs.find(verb => verb.id === shuffledIds[0])

        state.tenseSelection = action.payload
        state.filteredVerbs = filteredVerbs
        state.questions.shuffledIds = shuffledIds
        state.questions.currentQuestion = firstQuestion
        state.isActive = true
      },
      setQuestion: (state, action) => {
        let questionId = action.payload
        let nextQuestion = state.filteredVerbs.find(verb => verb.id === questionId)
        state.questions.currentQuestion = nextQuestion
      },
      addCorrect: (state) => {
        state.questions.correctAnswers.push(state.questions.currentQuestion.fullP)
      },
      addIncorrect: (state) => {
        state.questions.incorrectAnswers.push(state.questions.currentQuestion.fullP)
      },
      endTest: (state) => {
        return state.isActive = false
      },
      resetTest: () => {
        return initialState
      }
   }
})

export const selectFilteredVerbs = (state) => state.verbs.filteredVerbs

export const selectShuffledIds = (state) => state.verbs.questions.shuffledIds

export const selectNextQuestion = (state) => state.verbs.questions.currentQuestion

export const selectFinalResults = (state) => state.verbs.questions.incorrectAnswers

export const { startTest, setQuestion, addCorrect, addIncorrect, resetTest } = verbsSlice.actions;

export default verbsSlice.reducer;