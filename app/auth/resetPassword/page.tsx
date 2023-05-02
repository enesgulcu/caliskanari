export const dynamic = 'force-dynamic'
import ResetPasswordContainer from '@/containers/auth/resetPassword';

interface Props {
    searchParams: {
    key: string;
    email: string;
  }
}


 const resetPassword = async ({ searchParams }: Props): Promise<JSX.Element> => {

    const resetPasswordComponent = await ResetPasswordContainer({ searchParams });

    return (
      <div>
        {resetPasswordComponent}
      </div>
    );
}

export default resetPassword;