import VerifyEmailContainer from '@/containers/auth/verifyEmail';

interface Props {
  searchParams:{
    key: string;
    email: string;
    role: string;
    time?:number
  }
}

const VerifyEmailPage = async ({searchParams}: Props) : Promise<JSX.Element> => {
  console.log("test searchParams");
  console.log(searchParams);
  console.log("test searchParams");
  const verifyEmailContainer = await VerifyEmailContainer({ searchParams });
    
  return (
    <>
        {verifyEmailContainer}
    </>
  )
}

export default VerifyEmailPage