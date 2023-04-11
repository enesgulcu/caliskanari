import ResetPasswordContainer from '@/containers/auth/resetPassword';

interface Props {
  searchParams: URLSearchParams;
}

 const resetPassword = async ({ searchParams }: Props) => {

    const resetPasswordComponent = await ResetPasswordContainer({ searchParams });

    return (
      <div>
        {resetPasswordComponent}
      </div>
    );
}

export default resetPassword;