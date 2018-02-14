import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose } from 'recompose'
import { withFormik } from 'formik'
import yup from 'yup'
import { DatePicker } from 'components/InputTypes'
import { Button } from 'components'
import PlacesAutocomplete from '../../components/PlacesAutocomplete'


const SubmitButton = styled(Button)`
  background-color: #00838F;
  color: #ffffff;
`

const FlightSearchForm = ({
  values,
  touched,
  errors,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  isLoading,
}) => (
  <form onSubmit={handleSubmit}>
    <DatePicker
      id="date"
      label="Date"
      placeholder="Date"
      values={values}
      touched={touched}
      errors={errors}
      handleBlur={handleBlur}
      setFieldValue={setFieldValue}
    />
    <PlacesAutocomplete
      onSelect={value => setFieldValue('from', value)}
      defaultInputValue={values.from}
      id="from"
      label="From"
      placeholder="From"
      values={values}
      touched={touched}
      errors={errors}
      handleChange={handleChange}
      handleBlur={handleBlur}
    />
    <PlacesAutocomplete
      onSelect={value => setFieldValue('to', value)}
      defaultInputValue={values.to}
      id="to"
      label="To"
      placeholder="To"
      values={values}
      touched={touched}
      errors={errors}
      handleChange={handleChange}
      handleBlur={handleBlur}
    />
    <SubmitButton isDisabled={isSubmitting || isLoading}>{isSubmitting || isLoading ? 'Submitting...' : 'Submit'}</SubmitButton>
  </form>
)

FlightSearchForm.defaultProps = {
  isLoading: false,
}

FlightSearchForm.propTypes = {
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  submit: PropTypes.func, // eslint-disable-line
}

const enhance = compose(
  withFormik({
    mapPropsToValues: () => ({ from: 'Prague', to: 'Barcelona', date: '2018-03-16' }),
    validationSchema: yup.object().shape({
      from: yup.string().required('From is required'),
      to: yup.string().required('To is required'),
      date: yup.string().required('Date is required'),
    }),
    handleSubmit: (values, other) => other.props.submit(
      values,
      { setSubmitting: other.setSubmitting },
    ),
    displayName: 'FlightSearchForm',
  }),
)

export default enhance(FlightSearchForm)
