import ResetPasswordContainer from '@/containers/auth/resetPassword';

interface SearchParams {
  key: string;
  email: string;
}

interface Props {
  searchParams: SearchParams;
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