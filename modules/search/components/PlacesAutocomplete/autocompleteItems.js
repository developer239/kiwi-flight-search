import React from 'react'
import styled from 'styled-components'


export const ItemsContainer = styled.div`
  border: 1px solid #cccccc;
`

export const Item = styled.div`
  font-size: 1.25rem;
  padding-left: 1rem;
  background-color: ${props => props.isHighlighted ? 'grey' : 'white'};
  color: ${props => props.isHighlighted ? 'white' : 'black'};
  font-weight: ${props => props.isBold ? 'bold' : 'normal'};
`

export const renderItems = (getItemProps, selectedItem, highlightedIndex) => (item, index) => (
  <Item
    {...getItemProps({ item: item.node.name })}
    key={item.node.locationId}
    isHighlighted={highlightedIndex === index}
    isBold={selectedItem && (selectedItem.toLowerCase() === item.node.name.toLowerCase())}
  >
    {item.node.name}
  </Item>
)
