import React from 'react'
import styled from 'styled-components'

export default () =>
  <Footer>
    <Trademark>
      © Knoodle - <SubTrademark>By Someone</SubTrademark>
    </Trademark>
  </Footer>


export const Footer = styled.footer`
  display: flex;
  border-top: 1px solid #DADADA;
  color: #8DDF7E;
  text-align: center;
  background-color: #393939;
`

export const Trademark = styled.p`
  text-align: center;
  font-size: .8rem;
  margin: 1.5rem auto;
`

export const SubTrademark = styled.span`
  color: #AEAEAE;
  font-size: .6rem;
`
