import VerifyEmailContainer from '@/containers/auth/verifyEmail';

interface Props {
  searchParams: URLSearchParams;
}

const VerifyEmailPage = async ({searchParams}: Props) => {

  const verifyEmailContainer = await VerifyEmailContainer({ searchParams });
    
  return (
    <>
        {verifyEmailContainer}
    </>
  )
}

export default VerifyEmailPage