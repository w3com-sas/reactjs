import { __, path, pipe, then, update } from 'ramda'
import { graphMutate, preventDefault } from './Util'
import React, { useState, Fragment } from 'react'
import styled from 'styled-components'


export default () => {
  const [ panelOpen, setPanelOpen ] = useState(false)

  return (
    <Fragment>
      <FloatingButton onClick={event => setPanelOpen(!panelOpen)}>+</FloatingButton>
      <Panel open={panelOpen} onClose={() => setPanelOpen(false)} />
    </Fragment>
  )
}


export const Panel = ({
  open = false,
  onClose = () => null,
}) =>
  <PanelWrapper open={open}>
    <PanelContainer open={open}>
      <CloseButton onClick={onClose}>Fermer X</CloseButton>
      <Form onSubmit={onClose} />
    </PanelContainer>
  </PanelWrapper>


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


export const Form = ({
  onSubmit = () => null,
}) => {
  const [ answers, setAnswers ] = useState([])
  const [ name,  setName ] = useState('')
  const addAnswer = event => setAnswers([ ...answers, '' ])
  const addNewSurveyMutation = `
    mutation ($input: NewSurvey!) {
      addNewSurvey(input: $input) {
        id
      }
    }
  `
  const variables = () => ({ input: { name, answers } })
  const updateAnswers = index => pipe(
    path([ 'currentTarget', 'value' ]),
    update(index, __, answers),
  )

  return (
    <FormContainer>
      <FormControl>
        <label>Your survey:</label>
        <input
          type="text"
          placeholder="The survey question ?"
          value={name}
          onChange={pipe(
            path(['currentTarget', 'value']),
            setName,
          )}
        />
      </FormControl>
      { answers.map((answer, index) => 
        <FormControl key={index}>
          <label>Answer:</label>
          <input type="text" value={answer} onChange={pipe (
            preventDefault,
            updateAnswers(index),
            setAnswers,
          )} />
        </FormControl>
      ) }

      <FormControl>
        <button onClick={pipe(
          preventDefault,
          addAnswer,
        )}>Add an answer</button>
      </FormControl>

      <button onClick={pipe(
        preventDefault,
        variables,
        graphMutate(addNewSurveyMutation),
        then(onSubmit),
      )}>Ok</button>
    </FormContainer>
  )
}


export const FormContainer = styled.form`
  margin: .5rem;
  margin-top: 2.4rem;
`


export const FormControl = styled.div`
  display: flex;

  :first-child {
    flex-basis: 30%;
  }
`
