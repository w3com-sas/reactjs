import {
  Button,
  CloseButton,
  FormControl,
  Label,
  PanelContainer,
  PanelWrapper
} from './NewSurveyForm'
import { Title } from './Header'
import {
  addIndex,
  adjust,
  evolve,
  filter,
  map,
  not,
  pipe,
  prop,
} from 'ramda'
import { connect } from 'react-redux'
import { createAction, createReducer } from 'redux-starter-kit'
import { graphMutate } from './Util'
import React from 'react'


// Redux :


export const initialState = {
  id: '',
  name: '',
  answers: [],
  open: false,
}


export const TOGGLE_PANE = 'SurveyDetail: Open or close the survey detail pane'


export const togglePane = createAction(TOGGLE_PANE)


export const CHECK_ANSWER = 'SurveyDetail: Check or Uncheck a survey answer'


export const checkAnswer = createAction(CHECK_ANSWER)


export const reducer = createReducer(initialState, {
  [togglePane]: (state, { payload: survey }) =>  !survey
   ? ({
      ...state,
      open: !state.open,
    })
   : ({
     ...state,
     open: !state.open,
     name: survey.name,
     id: survey.id,
     answers: survey.answers.map(label => ({
       label,
       checked: false
      }))
    }),

  [checkAnswer]: (state, { payload: index }) => ({
    ...state,
    answers: adjust(index, evolve({ checked: not }), state.answers),
  })
})


// Thunks :


export const answerSurvey = (id, answers) => dispatch => {
  const imap = addIndex(map)
  const formatAnswers = pipe(
    imap((answer, index) => ({ ...answer, index })),
    filter(prop('checked')),
    map(prop('index')),
  )

  console.warn('hello')


  graphMutate(`
  mutation ($input: NewAnswer!) {
    sendAnswer(input: $input) {
      id
    }
  }
  `, { input: {
    survey: id,
    answers: formatAnswers(answers),
    by: 'Anonymous'
  } })
    .catch(console.error)
    .then(survey => dispatch(togglePane()))
}


// React


export const SurveyDetail = ({
  id = '',
  open = false,
  name = '',
  answers = [],
  dispatch,
}) =>
  <PanelWrapper open={open}>
    <PanelContainer open={open} direction="right">
      <CloseButton onClick={e => {
        e.preventDefault();

        dispatch(togglePane());
      }}>Fermer X</CloseButton>
      <Title>{ name }</Title>
      { answers.map((answer, index) =>
        <FormControl key={index}>
          <Label>{ answer.label }</Label>
          <input type="checkbox" checked={answer.checked} onChange={e => {
            dispatch(checkAnswer(index))
          }}/>
        </FormControl>
      ) }
      <Button onClick={e => {
        e.preventDefault();

        dispatch(answerSurvey(id, answers));
      }}>Answer this survey</Button>
    </PanelContainer>
  </PanelWrapper>


export default connect(
  state => ({
    open: state.surveyDetail.open,
    name: state.surveyDetail.name,
    answers: state.surveyDetail.answers,
    id: state.surveyDetail.id,
  })
)(SurveyDetail)
