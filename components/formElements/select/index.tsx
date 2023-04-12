import styles from './styles.module.css';

interface Props{
  children: React.ReactNode
  Class?: {
    select?: string
    label?: string
  }
  optionLabel?: string
  labelValue?: string
  name : string
  id?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  disabled ?: boolean
}

 const Select = ({children, Class, optionLabel, labelValue,  ...props}:Props) => {
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

export default Select

