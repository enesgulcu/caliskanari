import VerifyEmailContainer from '@/containers/auth/verifyEmail';

interface Props {
  searchParams:{
    map(arg0: (item: any, index: number) => JSX.Element): unknown;
    key: string;
    email: string;
    role: string;
    time?:number
  }
}

const VerifyEmailPage = async ({searchParams}: Props) : Promise<JSX.Element> => {
  
  const verifyEmailContainer = await VerifyEmailContainer({ searchParams });
    
  return (
    <>
        {
          searchParams && searchParams.map((item:any, index:number) => {
            return (
              <div key={index}>
                TEST: {item}
              </div>
            )
          })

        }
        {verifyEmailContainer}
    </>
  )
}

export default VerifyEmailPage