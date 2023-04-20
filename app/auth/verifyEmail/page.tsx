import VerifyEmailContainer from '@/containers/auth/verifyEmail';



const VerifyEmailPage = async ({searchParams}: any) : Promise<JSX.Element> => {

  const verifyEmailContainer = await VerifyEmailContainer({ searchParams });
    
  return (
    <>
        {verifyEmailContainer}
    </>
  )
}

export default VerifyEmailPage