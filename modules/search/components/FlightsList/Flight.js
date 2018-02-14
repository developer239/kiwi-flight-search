import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { formatDateTime } from 'common/helpers'


const Container = styled.div`
  margin: 0.5rem;
  padding: 0.75rem 1.1rem 1.1rem 0.75rem;
`

const AirlinesContainer = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`

const Label = styled.span`
  font-weight: bolder;
  margin-left: 0.6rem;
`

const StyledButton = styled.button`
  margin: 0.6rem 0;
`

const Flight = ({ flight }) => (
  <Container>
    {flight.airlines.map((airline, airlineIndex) => (
      <AirlinesContainer key={airlineIndex}>
        <img src={airline.logoUrl} />
        <div>
          <Label>Name:</Label> {airline.name} <br />
          <Label>Code:</Label> {airline.code} <br />
        </div>
      </AirlinesContainer>
    ))}
    <strong>Price:</strong> € {flight.price.amount} <br />
    <strong>Departure:</strong> {formatDateTime(flight.departure.localTime)} <br />
    <strong>Arrival:</strong> {formatDateTime(flight.arrival.localTime)} <br />
    <a href={flight.bookingUrl}>
      <StyledButton>book flight</StyledButton>
    </a>
  </Container>
)

Flight.propTypes = {
  flight: PropTypes.object.isRequired,
}

export default Flight
