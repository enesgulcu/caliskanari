'use client'
import HomeContainer from "@/containers/home/index";
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth'

interface Props {
  session: Session | null
}

const Home: React.FC<Props> = ({ session } ) => {
  return (
    <>
    {/* SessionProvider ile sarmallarız ki tüm route lara erişebilelim diye / yukarıda "use client" tanımlamayı unutma! */}
    <SessionProvider session={session}>
      <HomeContainer />
    </SessionProvider>
    </>
  );
};

export default Home;
