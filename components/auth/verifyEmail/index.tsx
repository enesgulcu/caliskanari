// {children} -> Notification componentini buraya alıyoruz.

interface Props {
  children: React.ReactNode;
}

  const VerifyEmailComponents:React.FC<Props> = ({children}) => {
    
    
  return (
    <div>
        {children}
    </div>
  )
}

export default VerifyEmailComponents