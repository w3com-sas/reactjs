import { RECEIVE_SURVEY, receiveSurvey, togglePane } from './NewSurveyForm'
import { connect } from 'react-redux'
import { createReducer } from 'redux-starter-kit'
import { graphQuery } from './Util'
import { prepend } from 'ramda'
import { socket } from './'
import { togglePane as toggleDetailPane } from './SurveyDetail'
import React, { useEffect } from 'react'
import styled from 'styled-components'


// Redux:


export const initialState = {
  surveys: [],
  loading: true,
}


export const FETCH_SURVEYS = 'SurveyList: Fetch data from the graphql api'


export const fetchSurveys = () => ({
  type: FETCH_SURVEYS,
  payload: null,
})


export const RECEIVE_SURVEYS = 'SurveyList: Receive surveys data from the graphql api'


export const receiveSurveys = surveys => ({
  type: RECEIVE_SURVEYS,
  payload: surveys,
})


export const reducer = createReducer(initialState, {
  [FETCH_SURVEYS]: (state, action) => ({
    ...state,
    loading: true,
  }),

  [RECEIVE_SURVEYS]: (state, action) => ({
    ...state,
    loading: false,
    surveys: action.payload,
  }),

  [RECEIVE_SURVEY]: (state, { payload: survey }) => ({
    ...state,
    surveys: prepend(survey, state.surveys),
  }),
})


// Thunks:


export const fetch = () => dispatch => {
  dispatch(fetchSurveys());

  graphQuery(`{ surveys { id, name, nbAnswers, createdAt, by, answers } }`)
    .then(({ surveys }) => {
      dispatch(receiveSurveys(surveys));
    })
}


// React Components:


export const SurveyList = ({
  surveys = [],
  loading = true,
  dispatch,
}) => {
  useEffect(() => dispatch(fetch()), [true]);
  useEffect(() => {
    socket.on('newSurvey', survey => {
      dispatch(receiveSurvey(survey))
    })
  }, [true])

  return (
    <SurveyListContainer>
      { loading
        ? <p>Chargement ...</p>
        : surveys.map((survey, index) => <Survey
          key={index}
          survey={survey}
          onClick={e => dispatch(toggleDetailPane(survey))}
        />)
      }
      <FloatingButton onClick={e => dispatch(togglePane())}>+</FloatingButton>
    </SurveyListContainer>
  )
}


export default connect(
  state => ({
    surveys: state.surveyList.surveys,
    loading: state.surveyList.loading,
  }),
)(SurveyList)


export const SurveyListContainer = styled.aside`
  display: flex;
  flex-direction: column;
`

export const Survey = ({
  survey: {
    id = '',
    name = '',
    by = '',
    nbAnswers = 0,
  },
  onClick = () => null,
}) =>
  <SurveyThumbnail onClick={onClick}>
    <h3>{ name }</h3>
    <SurveyInfo by={by} answers={nbAnswers} />
  </SurveyThumbnail>


export const SurveyThumbnail = styled.article`
  border: 1px solid #DADADA
  background-color: #393939;
  text-align: center;
  color: white;
  margin: .5rem 1.2rem;
  padding: 1rem;
  border-radius: 5px;
`


export const SurveyInfo = ({
  by = '',
  answers = 0,
}) => <Author>By { by } - <Answers>{ answers } answers</Answers></Author>


export const Author = styled.span`
  color: #8DDF7E;
  font-size: .8rem;
`


export const Answers = styled.span`
  color: #878787;
  font-size: .6rem;
`


export const FloatingButton = styled.button`
  outline: none;
  cursor: pointer;
  background-color: #393939;
  color: #8DDF7E;
  font-weight: bold;
  margin: 0;
  padding: .6rem 1rem;
  font-size: 2rem;
  border-radius: 100%;
  position: fixed;
  bottom: 10px;
  right: 10px;
  border: 2px solid #DADADA;
`
