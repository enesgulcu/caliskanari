import { ChangeEvent } from 'react'
import styles from './styles.module.css';

interface Props{
  labelValue?: string
  disabled?: boolean
  Class?: any
  id?: string
  name?: string
  type: 'text' | 'password' | 'email' | 'number';
  value?: string
  onChange?: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined
  placeholder?: string
}


 const Input:React.FC<Props> = ({Class, labelValue, disabled, type,   ...props}) => {
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