import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { createAction, createReducer } from 'redux-starter-kit'


export const initialState = {
  name: "",
  answers: [],
  sending: false,
  open: false
}


export const TOGGLE_PANE = 'NewSurveyForm: Open or Close the form pane'


export const togglePane = createAction(TOGGLE_PANE)


export const reducer = createReducer(initialState, {
  [togglePane]: (state, action) => ({
    ...state,
    open: !state.open,
  })
})


// React Components:


export const FormPane = ({
  open = false,
  dispatch,
}) =>
  <Fragment>
    <button onClick={e => dispatch(togglePane())}>Toggle Pane</button>
    { open ? <p>OPEN!</p> : <p>NOT OPEN!</p> }
  </Fragment>


export default connect(
  state => ({ open: state.newSurveyForm.open }),
)(FormPane)
