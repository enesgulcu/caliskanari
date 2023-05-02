'use client'
import React from 'react'
import GeneralTopPageBanner from '@/components/dashboard/panels/admin/generalTopPageBanner'

interface Props {
  contentData: ContentData;
  setContentData: React.Dispatch<React.SetStateAction<ContentData>>;
}
interface ContentData {
  name?: string;
  component?: JSX.Element;
}


const Content:React.FC<Props> = ({setContentData, contentData}) => {
  return (
    <div className='col-span-2 px:0 sm:px-2 bg-gray-200 h-20 w-full inline-block min-h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] overflow-y-scroll pt-2'>
        Content
        <div className=' h-20 bg-gray-100 mt-4 w-full'>
        {contentData.component && contentData.component}
        </div>
    </div>
  )
}

export default Content