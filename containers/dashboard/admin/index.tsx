'use client'
import Sidebar from '@/components/dashboard/sidebar';
import Content from '@/components/dashboard/content';

import { useState } from 'react';


 const AdminContainer:React.FC = () => {


  /*
  -> content içerisinde kullanılacak olan panel componentini state olarak tutuyoruz
  -> kullanımı aşağıdaki gibi olmalıdır!  
      { 
        name: "Genel Duyuru",
        component: <GeneralTopPageBanner />
      }
  */
  const [contentData, setContentData] = useState({});

  return (
    <>

      <div className='flex'>
        <Sidebar setContentData={setContentData} contentData={contentData}/>
        <Content setContentData={setContentData} contentData={contentData}/>
        
      </div>

    </>
  )
}

export default AdminContainer;

