import {
  CloseButton,
  FormControl,
  Label,
  PanelContainer,
  PanelWrapper
} from './NewSurveyForm'
import { Title } from './Header'
import { connect } from 'react-redux'
import { createAction, createReducer } from 'redux-starter-kit'
import React from 'react'


// Redux :


export const initialState = {
  name: '',
  answers: [],
  open: false,
}


export const TOGGLE_PANE = 'SurveyDetail: Open or close the survey detail pane'


export const togglePane = createAction(TOGGLE_PANE)


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
     answers: survey.answers.map(label => ({
       label,
       checked: false
      }))
    }),
})


// Thunks :


// React


export const SurveyDetail = ({
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
      { answers.map(answer =>
        <FormControl>
          <Label>{ answer.label }</Label>
          <input type="checkbox" checked={answer.checked} />
        </FormControl>
      ) }
    </PanelContainer>
  </PanelWrapper>


export default connect(
  state => ({
    open: state.surveyDetail.open,
    name: state.surveyDetail.name,
    answers: state.surveyDetail.answers,
  })
)(SurveyDetail)
