import Sidebar from '@/components/dashboard/sidebar';
import Header from '@/components/dashboard/header';
import Content from '@/components/dashboard/content';

 const AdminContainer:React.FC = () => {
  return (
    <>
      <Header/>
      <div className='flex pt-16'>
        <Sidebar/>
        <Content/>
        
      </div>

    </>
  )
}

export default AdminContainer;

