import React from 'react'
import styles from './styles.module.css';

interface functionProps{

  labelValue: any
  Class?: any
  disabled?: boolean
  type?: string
  id?: string
  name?: string
  value?: string
  onChange?: any
  placeholder?: string
}


 const Input = ({Class, labelValue, disabled, type,   ...props}: functionProps) => {
  return (
    <>
        <label
        className={Class?.label ? Class?.label : styles.label }
        htmlFor={props.id}>

          {labelValue}

        </label>

        <input
        {...props}
        type={type ? type : 'text'}
        disabled={disabled ? disabled : false}
        className={Class?.input ? Class?.input : styles.input}/>
    </>
  )
}

export default Input