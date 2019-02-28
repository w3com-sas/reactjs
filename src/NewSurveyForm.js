import { connect } from 'react-redux'
import { createAction, createReducer } from 'redux-starter-kit'
import { graphMutate } from './Util'
import { update, remove } from 'ramda'
import React from 'react'
import styled from 'styled-components'


export const initialState = {
  name: "",
  answers: [],
  sending: false,
  open: false
}


export const TOGGLE_PANE = 'NewSurveyForm: Open or Close the form pane'


export const togglePane = createAction(TOGGLE_PANE)


export const CHANGE_NAME = 'NewSurveyForm: Change the survey name'


export const changeName = createAction(CHANGE_NAME)


export const CHANGE_ANSWER = 'NewSurveyForm: Change a survey answer'


export const changeAnswer = createAction(CHANGE_ANSWER)


export const ADD_ANSWER = 'NewSurveyForm: Add a new survey answer'


export const addAnswer = createAction(ADD_ANSWER)


export const REMOVE_ANSWER = 'NewSurveyForm: Remove an answer'


export const removeAnswer = createAction(REMOVE_ANSWER)


export const SEND_SURVEY = 'NewSurveyForm: Send the new survey to the graph api'


export const sendSurvey = createAction(SEND_SURVEY)


export const RECEIVE_SURVEY = 'NewSurveyForm: Received a newly created survey'


export const receiveSurvey = createAction(RECEIVE_SURVEY)


export const reducer = createReducer(initialState, {
  [togglePane]: (state, action) => ({
    ...state,
    open: !state.open,
  }),

  [changeName]: (state, { payload: name }) => ({
    ...state,
    name,
  }),

  [changeAnswer]: (state, { payload: { index, value } }) => ({
    ...state,
    answers: update(index, value, state.answers),
  }),

  [addAnswer]: (state, action) => ({
    ...state,
    answers: [ ...state.answers, '' ],
  }),

  [removeAnswer]: (state, { payload: index }) => ({
    ...state,
    answers: remove(1, index, state.answers),
  }),

  [sendSurvey]: (state, action) => ({
    ...state,
    sending: true,
  }),

  [receiveSurvey]: (state, action) => ({
    ...state,
    sending: false,
  })
})


// Thunks:


export const saveSurvey = survey => dispatch => {
  dispatch(sendSurvey())

  graphMutate(`
  mutation ($input: NewSurvey!) {
    addNewSurvey(input: $input) {
      id,
      name,
      nbAnswers,
      by,
      createdAt,
    }
  }
  `, { input: survey })
    .then(response => {
      dispatch(receiveSurvey(response.addNewSurvey))
    })
    .then(() => dispatch(togglePane()))
}


// React Components:


export const FormPane = ({
  open = false,
  name = '',
  answers = [],
  dispatch,
}) =>
  <PanelWrapper open={open}>
    <PanelContainer open={open}>
      <CloseButton onClick={e => dispatch(togglePane())}>Fermer X</CloseButton>
      <Form>
        <FormControl>
          <Label>The survey title:</Label>
          <TextInput placeholder="What is the meaning of life ?" value={name} onChange={e => {
            e.preventDefault();

            dispatch(changeName(e.currentTarget.value));
          }} />
        </FormControl>
        <FormControl>
          <Label>The answers:</Label>
          { answers.map((answer, index) => 
            <FormControl oneLined={true} key={index}>
              <TextInput placehold="Yes / No / Maybe" value={answer} onChange={e => {
                e.preventDefault();

                dispatch(changeAnswer({
                  index,
                  value: e.currentTarget.value
                }));
              }} />
              <Button onClick={e => {
                e.preventDefault();

                dispatch(removeAnswer(index));
              }}>⛌</Button>
            </FormControl>
          ) }
          <Button onClick={e => {
            e.preventDefault();

            dispatch(addAnswer());
          }}>Add answer</Button>
        </FormControl>
        <Button onClick={e => {
          e.preventDefault();

          dispatch(saveSurvey({
            name,
            answers,
          }))
        }}>Send</Button>
      </Form>
    </PanelContainer>
  </PanelWrapper>


export const Form = styled.form`
  margin-top: 2rem;
  padding: .5rem;
  display: flex;
  flex-direction: column;
`


export const FormControl = styled.div`
  padding: .5rem;
  ${props => props.oneLined && `
    display: flex;
    flex-direction: row;

    input {
      flex-basis: 85%;
    }

    button {
      flex-basis: 15%;
      padding: .6rem;
      border: 2px solid #DADADA;
      margin: .3rem 0;
      border-radius: 0;
    }
  `}
`


export const Label = styled.label`
  display: block;
  text-align: center;
  border-bottom: 1px solid #DADADA;
  color: #353535;
  font-size: 1.2rem;
`


export const Button = styled.button`
  display: block;
  font-size: 1.2rem;
  color: #353535;
  border: 1px solid #DADADA;
  border-radius: 5px;
  outline: none;
  background-color: white;
  padding: .8rem;
`


export const TextInput = styled.input`
  display: block;
  padding: 1rem;
  font-size: 1rem;
  margin: .3rem 0;
  width: 100%;
  box-sizing: border-box;
`


export const PanelWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: auto;
  height: auto;
  max-width: 100vw;
  max-height: 100vh;
`


export const PanelContainer = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  background-color: white;
  transition: all .3s;
  transform: ${({ open }) =>
    open
      ? 'translateX(0)'
      : 'translateX(100vw)'
  }
`


export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  outline: none;
  border: none;
  color: #B2B2B2;
  font-size: 1.2rem;
  background-color: transparent;
`


export default connect(
  state => ({
    open: state.newSurveyForm.open,
    name: state.newSurveyForm.name,
    answers: state.newSurveyForm.answers,
  }),
)(FormPane)
