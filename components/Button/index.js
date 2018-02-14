import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const StyledButton = styled.button`
  display: block;
`

const Button = ({ className, onClick, isDisabled, children }) => (
  <StyledButton
    className={className}
    disabled={isDisabled}
    onClick={onClick}
  >
    {children}
  </StyledButton>
)

Button.defaultProps = {
  onClick: () => {},
  isDisabled: false,
  className: '',
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

export default Button
