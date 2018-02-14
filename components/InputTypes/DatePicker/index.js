import React, { Fragment } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import PropTypes from 'prop-types'


const StyledLabel = styled.label`
  display: inline-block;
  position: relative;
  float: left;
  width: 4.3rem;
  font-weight: bolder;
  margin-top: 0.25rem;
`

const DatePickerWrapper = ({
  id,
  label,
  values,
  touched,
  errors,
  setFieldValue,
  handleBlur,
}) => (
  <Fragment>
    {label && (
      <StyledLabel htmlFor={id}>
        {label}
      </StyledLabel>
    )}
    <DatePicker
      id={id}
      onBlur={handleBlur}
      selected={values[id] ? moment(values[id]) : null}
      onChange={value => setFieldValue(id, value.format('YYYY-MM-DD'))}
    />
    {errors[id] && touched[id] && <div>{errors[id]}</div>}
  </Fragment>
)

DatePickerWrapper.defaultProps = {
  label: '',
  id: '',
}

DatePickerWrapper.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
}

export default DatePickerWrapper
