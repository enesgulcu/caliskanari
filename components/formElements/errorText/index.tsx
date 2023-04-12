import styles from './styles.module.css';

interface Props{
  children: React.ReactNode
  className?: string
}

// ...props dememizin sebebi: children harici gele nher şeyi props ismi altında al ve kullan.
const ErrorText:React.FC<Props> = ({children, className, ...props}) => {
  return (
        <p className={className ? className : styles.error }>
            {children}
        </p>
  )
}

export default ErrorText
