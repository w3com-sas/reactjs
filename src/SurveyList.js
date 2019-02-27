import { createAction, createReducer } from 'redux-starter-kit'
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'


// Redux:

export const initialState = {
  surveys: [],
  loading: true,
}


export const FETCH_SURVEYS = 'SurveyList: Fetch data from the graphql api'


export const fetchSurveys = createAction(FETCH_SURVEYS)


export const RECEIVE_SURVEYS = 'SurveyList: Receive surveys data from the graphql api'


export const receiveSurveys = createAction(RECEIVE_SURVEYS)


export const reducer = createReducer(initialState, {
  [fetchSurveys]: (state, action) => ({
    ...state,
    loading: true,
  }),

  [receiveSurveys]: (state, action) => ({
    ...state,
    loading: false,
    surveys: action.payload,
  })
})


// React Components:


export const SurveyList = ({
  surveys = []
}) =>
  <SurveyListContainer>
    { surveys.map((survey, index) => <Survey key={index} survey={survey} />) }
  </SurveyListContainer>


export default connect(
  state => ({ surveys: state.surveyList.surveys }),
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
  }
}) =>
  <SurveyThumbnail>
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
