"use client"
import Link from 'next/link'
import {useState, useEffect} from 'react'
import { BsXCircleFill } from "react-icons/bs";
import LoadingScreen from '@/components/other/loading';


interface Props {
  Title?: string;
  subTitle?: string;
  buttonUrl?: string;
  buttonText?: string;
  isVisible?: boolean;

  children?: React.ReactNode;
}


 const PopupScreen:React.FC<Props> = ({children, Title, subTitle, buttonUrl, buttonText, isVisible=false}) => {
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [isloading, setIsloading] = useState<boolean>(false);

  useEffect(() => {
    isVisible ? setShowPopup(true) : setShowPopup(false)
  }, [isVisible])
  
  
  
  return (
    <>
      { isloading && (<LoadingScreen isloading={isloading}/>) }
        {showPopup &&
          <div className='h-full'>
              <div className='absolute w-full min-h-[900px] md:min-h-screen h-full  min-w-screen  bg-black opacity-80 z-20 flex justify-center items-center flex-col gap-6'> 
              </div>
              <div className=' w-full min-h-[900px] md:min-h-screen flex justify-center  items-center absolute z-30 '>
                    <div className='rounded absolute p-6 bg-white flex justify-center flex-col items-center mx-[5%] max-w-5xl'>
                    <span className='absolute bg-white -right-4 -top-4 rounded-full border-red-600 hover:rotate-90 transition-all'>
                      < BsXCircleFill 
                      className='  text-4xl text-red-600  cursor-pointer' 
                      onClick={() => setShowPopup(false)}
                      />
                    </span>

                    { Title &&
                      <h2 className='text-gray-800 text-2xl font-semibold mb-2 text-center'>{Title}</h2>
                    }
                    {
                      subTitle &&
                      <h4 className='text-gray-700 mb-4 text-center'>{subTitle}</h4>
                    }
                    <div className={`text-center h-full w-full mb-2 ${!children && "block"}`}>
                    {children}
                    </div>

                    { buttonUrl && buttonText &&
                      <div>
                      <Link href={buttonUrl}>
                        <button className='bg-blue-600 py-2 px-4 rounded text-white text-2xl mt-2 hover:scale-110 transition-all'
                          onClick={() => setIsloading(true)}
                        >
                          {buttonText}
                        </button>
                      </Link>
                    </div>
                    }
                    </div>

                  </div>
          </div> 
        }
    </>
  )
}

export default PopupScreen
