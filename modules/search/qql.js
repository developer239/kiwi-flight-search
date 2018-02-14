import gql from 'graphql-tag'


export const createSearchVariable = ({ date, from, to }) => ({
  from: {
    location: from,
    radius: {
      lat: 0.1,
      lng: 0.1,
      radius: 15,
    },
  },
  to: {
    location: to,
    radius: {
      lat: 0.1,
      lng: 0.1,
      radius: 15,
    },
  },
  date: {
    exact: date,
  },
})

export const searchFlights = gql`query SearchFlights($search: FlightsSearchInput!, $after: String) {
  allFlights(search: $search, first: 5, after: $after) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        airlines {
          name
          code
          logoUrl
          isLowCost
        }
        departure {
          time
          localTime
        }
        arrival {
          time
          localTime
        }
        duration
        legs {
          id
        }
        price {
          amount
          currency
        }
        bookingUrl
      }
    }
  }
}
`

export const searchLocations = gql`query searchAllLocations($search: String!) {
  allLocations(search: $search) {
    edges {
      node {
        locationId
        name
      }
    }
  }
}
`
