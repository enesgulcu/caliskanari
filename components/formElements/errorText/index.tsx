import React from 'react'
import styles from './styles.module.css';

interface functionProps{
  children: React.ReactNode
  className?: string
}

// ...props dememizin sebebi: children harici gele nher şeyi props ismi altında al ve kullan.
const ErrorText = ({children, className, ...props}: functionProps) => {
  return (
        <p className={className ? className : styles.error }>
            {children}
        </p>
  )
}

export default ErrorText
