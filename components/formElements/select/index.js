import React from 'react'
import styles from './styles.module.css';

export default function Select({clidren, ...props}) {
  return (
    <>
        <label
        className={props?.class?.label ? props?.class?.label : styles.label }
        htmlFor={props.id}>

          {props.labelValue}

        </label>

        <select
        id={props.id}
        name={props.name}
        disabled={props?.disabled ? props?.disabled : false}
        value={props.value}
        onChange={props.onChange}
        className={props?.class?.select ? props?.class?.select : styles.select}>
          <option label={props.optionLabel}></option>
          {props.children}
          
        </select>
    </>
  )
}