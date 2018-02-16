import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import { graphql } from 'react-apollo'
import { withApollo } from 'common/hocs'
import { throttle } from 'common/helpers'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import { TextInput } from 'components/InputTypes'
import { searchLocations } from 'modules/search/qql'
import { ItemsContainer, Item, renderItems } from './autocompleteItems'


const Autocomplete = ({
  onSelect,
  defaultInputValue,
  data,
  handleInputValueChange,
  searchQuery, // eslint-disable-line
  setSearchQuery, // eslint-disable-line
  ...rest
}) => (
  <Downshift
    onChange={onSelect}
    defaultInputValue={defaultInputValue}
    onInputValueChange={(value => throttle(handleInputValueChange(value), 500))}
    render={({
      getInputProps,
      getItemProps,
      isOpen,
      selectedItem,
      highlightedIndex,
    }) => (
      <div>
        <TextInput {...getInputProps(rest)} />
        {isOpen && data.loading &&
        <ItemsContainer><Item>Loading...</Item></ItemsContainer>}
        {
          isOpen && !data.loading && data.allLocations && (data.allLocations.edges.length
            ? (
              <ItemsContainer>
                {data.allLocations.edges.map(renderItems(getItemProps, selectedItem, highlightedIndex))}
              </ItemsContainer>
            )
            : <ItemsContainer><Item>No items found</Item></ItemsContainer>)
        }
      </div>
    )}
  />
)

Autocomplete.defaultProps = {
  type: 'text',
  placeholder: '',
  label: '',
  id: '',
  data: {
    loading: false,
    allPlaces: null,
    error: null,
  },
}

Autocomplete.propTypes = {
  data: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  defaultInputValue: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleInputValueChange: PropTypes.func.isRequired,
}

const enhance = compose(
  withState('searchQuery', 'setSearchQuery', ''),
  withApollo,
  graphql(searchLocations, {
    skip: ({ searchQuery }) => !searchQuery,
    options: ({ searchQuery }) => ({
      errorPolicy: 'all',
      variables: {
        search: searchQuery,
      },
    }),
  }),
  withHandlers({
    handleInputValueChange: ({ setSearchQuery }) => value => setSearchQuery(value),
  }),
)

export default enhance(Autocomplete)
