import React from 'react'
import styles from './styles.module.css';

// ...props dememizin sebebi: children harici gele nher şeyi props ismi altında al ve kullan.
export default function ErrorText({children,className, ...props}) {
  return (
        <p className={className ? className : styles.error }>
            {children}
        </p>
  )
}
