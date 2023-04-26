export const dynamic = 'force-dynamic'
import VerifyEmailContainer from '@/containers/auth/verifyEmail';

interface Props {
  searchParams:{
    key: string;
    email: string;
    role: string;
    time:number
  }
}

const VerifyEmailPage = async ({searchParams}: Props) : Promise<JSX.Element> => {

  const verifyEmailContainer = await VerifyEmailContainer({ searchParams });
    
  return (
    <>
        {verifyEmailContainer}
    </>
  )
}

export default VerifyEmailPage