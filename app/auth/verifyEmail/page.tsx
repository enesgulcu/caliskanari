import VerifyEmailContainer from '@/containers/auth/verifyEmail';
interface Props {
  searchParams: {
    [key: string]: any;
    key: string;
    email: string;
    role: string;
    time: number;
  };
}

const VerifyEmailPage = async ({searchParams}: Props) : Promise<JSX.Element> => {

  const verifyEmailContainer = await VerifyEmailContainer({ searchParams });
    
  return (
    <>
        {Object.keys(searchParams).map((key: string, index: number) => (
        <div key={index}>
          {key}: {searchParams[key]}
        </div>
      ))}
    </>
  )
}

export default VerifyEmailPage