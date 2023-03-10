import React from 'react'
import styles from './styles.module.css';

export default function Select({children, Class, optionLabel, labelValue,  ...props}) {
  return (
    <>
        <label
        className={Class?.label ? Class?.label : styles.label }
        htmlFor={props.id}>

          {labelValue}

        </label>

        <select
        {...props}
        className={Class?.select ? Class?.select : styles.select}>
          <option label={optionLabel}></option>
          {children}
          
        </select>
    </>
  )
}

