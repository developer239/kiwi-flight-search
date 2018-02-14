import React, { Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


const StyledLabel = styled.label`
  display: inline-block;
  width: 4.3rem;
  font-weight: bolder;
`

const TextInput = ({
  id,
  label,
  placeholder,
  type,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  ...rest
}) => (
  <Fragment>
    {label && (
      <StyledLabel htmlFor={id}>
        {label}
      </StyledLabel>
    )}
    <input
      id={id}
      placeholder={placeholder}
      type={type}
      value={values[id]}
      onChange={handleChange}
      onBlur={handleBlur}
      {...rest}
    />
    {errors[id] && touched[id] && <div>{errors[id]}</div>}
  </Fragment>
)

TextInput.defaultProps = {
  type: 'text',
  placeholder: '',
  label: '',
  id: '',
  handleChange: null,
}

TextInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func.isRequired,
}

export default TextInput
