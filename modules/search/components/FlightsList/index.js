import React from 'react'
import { compose } from 'recompose'
import { withNoData } from 'common/hocs'
import PropTypes from 'prop-types'
import Flight from './Flight'


const FlightsList = ({ allFlights }) => (
  <div>
    {allFlights.edges.map((edge, index) => (
      <Flight
        key={`${edge.node.flightId}${index}`}
        flight={edge.node}
      />
    ))}
  </div>
)


FlightsList.propTypes = {
  allFlights: PropTypes.object.isRequired,
}

const enhance = compose(
  withNoData(props => !props.allFlights.edges.length)('There are no results.'),
)

export default enhance(FlightsList)
