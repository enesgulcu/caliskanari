import React from 'react'
import styles from './styles.module.css';

export default function Input(props) {
  return (
    <>
        <label
        className={props?.class?.label ? props?.class?.label : styles.label }
        htmlFor={props.id}>

          {props.labelValue}

        </label>

        <input
        id={props.id}
        name={props.name}
        type={props.type ? props.type : 'text'}
        value={props.value}
        disabled={props?.disabled ? props?.disabled : false}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className={props?.class?.input ? props?.class?.input : styles.input}/>
    </>
  )
}