import React from 'react';
import { Field, ErrorMessage } from 'formik';
import DateView from 'react-datepicker';
import TextError from './TextError';
import { Calendar } from "feather-icons-react";

function DatePicker(props) {
  const { label, name, ...rest } = props;
  return (
    <div>
      <label htmlFor={name} className="form-label d-block">{label}</label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DateView
              showIcon
              icon={<Calendar size={18} color="#60697b" />}
              className='form-control'
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={val => setFieldValue(name, val)}
            />
          );
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default DatePicker;