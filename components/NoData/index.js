import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


const Container = styled.div`
  margin: 0.5rem;
  padding: 0.75rem 1.1rem 1.1rem 0.75rem;
  background-color: #B2DFDB;
`

const NoData = ({ message }) => (
  <Container>
    {message}
  </Container>
)

NoData.propTypes = {
  message: PropTypes.string.isRequired,
}

export default NoData
