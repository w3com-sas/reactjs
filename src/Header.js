import React from 'react'
import styled from 'styled-components'

export default ({ title = 'Knoodle' }) =>
  <Header>
    <Title>{ title }</Title>
  </Header>

export const Header = styled.header`
  display: flex;
  margin: 0 auto;
  width: 100vw;
  background-color: #8DDF7E;
  border-bottom: 1px solid #DADADA;
  color: #404040;
`

export const Title = styled.h1`
  font-size: 2.5rem;
  margin: 1rem auto;
  text-align: center;
`

