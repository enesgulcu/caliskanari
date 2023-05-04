'use client'
import { useState } from 'react';
import Button from '@/components/other/sidebarButton';
import Link from 'next/link';
import { CgMenu } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import Image from 'next/image'

// ##################################################################
//  KULLANILACAK OLAN PANELLERİN İMPORTLARI AŞAĞIDA YAPILMIŞTIR. ####
import GeneralTopPageBanner from '@/components/dashboard/panels/admin/generalTopPageBanner';

// ##################################################################




interface Props {
  contentData: ContentData;
  setContentData: React.Dispatch<React.SetStateAction<ContentData>>;
}
interface ContentData {
  name?: string;
  component?: JSX.Element;
}

const Sidebar:React.FC<Props> = ({setContentData, contentData}) => {

  // sidebarın açılıp kapanmasını sağlayan state
  const [collapsedSidebar, setCollapsedSidebar] = useState<boolean>(false);

  // butona tıklandığında çalışacak fonksiyon.
  const handeButtonClick = (name:string, component:JSX.Element) => {
    setContentData({name: name,component: component}); 
    setCollapsedSidebar(!collapsedSidebar);
  }

  return (
    <>
      {/* side barın açılıp kapanmasını sağlayan buton */}
      <button onClick={()=>setCollapsedSidebar(!collapsedSidebar)} className={`${collapsedSidebar ? "text-secondary  bg-white rounded" : "text-white bg-secondary rounded"} hover:scale-110 transition-all ml-12 absolute left-0 top-[12px] z-50 flex gap-4 p-2`}><span className='hidden sm:block'>İşlem Paneli</span><CgMenu size={25}/></button>
      



      {/* Sidebar button yapısının ana yapısı aşağıdadır */}
      {
        !collapsedSidebar &&
        <div onClick={()=> collapsedSidebar && setCollapsedSidebar(!collapsedSidebar)} className={`${collapsedSidebar ? "absolute hidden" : " absolute z-50 sm:relative sm:block"} w-full sm:w-[300px]`}>
      <div className={` ${collapsedSidebar ? "bg-primary" : "bg-white"} min-w-300px  sm:max-w-[300px] w-full min-h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] overflow-y-auto`}>
        
        <div onClick={()=> setCollapsedSidebar(!collapsedSidebar)} className={`${collapsedSidebar ? "bg-primary" : "bg-secondary"} cursor-pointer w-full  h-12 flex justify-center p-2 items-center`}>
          <div className='text-white font-bold flex justify-center items-center content-center'>YÖNETİCİ PANELİ</div>
        </div>

        <div className='flex justify-between flex-col content-between w-full min-h-[calc(100vh-130px)]'>
          <div className={`${collapsedSidebar ? "hidden" : "block"}`}>


            {/* Buttonları ve çağıracakları componentleri burada tanımlarız
            BURADAN TIKLANILAN BUTON -> CONTENT İÇERİSİNE COMPONENTİ GÖNDERİR.*

            Attributes:
            text: butonun üzerinde yazacak olan yazı
            icon: butonun sol tarafında gözükecek olan icon
            onClick: butona tıklandığında çalışacak fonksiyon
            label: butonun üzerinde yazacak olan arkası koyu renkli yazı
            buttonDisabled: butonun tıklanabilirliğini kapatır
            children: butonun içerisine başka bir buton eklemek için kullanılır -> (<Button>  <Button/>  </Button>)
            */            }

            <Button text={"Anasayfa İşlemleri"} icon={<AiFillHome/>}>
              
              <div onClick={()=>handeButtonClick("Genel Duyuru", <GeneralTopPageBanner/>)}>
                <Button text={"Genel Duyuru"}/>
              </div>
              

            </Button>
          </div>












          {/* Alt Logo ve Link bölümü */}
          <div className={`${collapsedSidebar ? "hidden" : "block"} flex flex-col gap-4 justify-center items-center content-center border-t-2 py-4`}>
            <Link href={"/"}><Image src={'/logo.png'} width={80} height={80} alt={'logo'}/></Link>
            <Link href={"/"}>{process.env.NEXT_PUBLIC_URL}</Link>
          </div>
        </div>                  
      </div>            
        </div>
      }
    </>
  ) 
}

export default Sidebar