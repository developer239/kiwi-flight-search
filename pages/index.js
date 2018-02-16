import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { compose, withHandlers, withState } from 'recompose'
import { graphql } from 'react-apollo'
import { withApollo } from 'common/hocs'
import Form from 'modules/search/forms/FlightSearch'
import { createSearchVariable, searchFlights } from 'modules/search/qql'
import FlightsList from 'modules/search/components/FlightsList'
import { Button } from 'components'


const LoadMoreButton = styled(Button)`
  background-color: #00838F;
  color: #ffffff;
`

const HomePage = ({ handleOnSubmit, data: { loading, allFlights }, handleLoadMore }) => (
  <div>
    <Form isLoading={loading} submit={handleOnSubmit} />
    {allFlights && <FlightsList allFlights={allFlights} />}
    {allFlights && allFlights.pageInfo.hasNextPage && (
      <LoadMoreButton
        isDisabled={loading}
        onClick={handleLoadMore}
      >{loading ? 'Loading...' : 'Load more'}
      </LoadMoreButton>
    )}
  </div>
)

HomePage.defaultProps = {
  data: {
    loading: false,
    allFlights: null,
    error: null,
  },
}

HomePage.propTypes = {
  data: PropTypes.object,
  handleOnSubmit: PropTypes.func.isRequired,
  handleLoadMore: PropTypes.func.isRequired,
  search: PropTypes.object, // eslint-disable-line
}

const enhance = compose(
  withApollo,
  withState('search', 'setSearch', null),
  graphql(searchFlights, {
    skip: ownProps => !ownProps.search,
    options: ({ search: { date, from, to } }) => ({
      notifyOnNetworkStatusChange: true,
      errorPolicy: 'all',
      variables: {
        search: createSearchVariable({
          date,
          from,
          to,
        }),
      },
    }),
  }),
  withHandlers({
    handleOnSubmit: ({ setSearch }) =>
      (values, other) => {
        other.setSubmitting(false)
        setSearch(values)
      },
    handleLoadMore: ({ data: { fetchMore, allFlights }, search: { date, from, to } }) =>
      () => fetchMore({
        query: searchFlights,
        variables: {
          search: createSearchVariable({
            date,
            from,
            to,
          }),
          after: allFlights.pageInfo.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newEdges = fetchMoreResult.allFlights.edges
          const pageInfo = fetchMoreResult.allFlights.pageInfo
          if (newEdges.length) {
            return {
              allFlights: {
                __typename: previousResult.allFlights.__typename, // eslint-disable-line
                edges: [...previousResult.allFlights.edges, ...newEdges],
                pageInfo,
              },
            }
          }
          return previousResult
        },
      }),
  }),
)

export default enhance(HomePage)
