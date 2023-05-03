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
    <div className='col-span-2 h-20 w-full inline-block min-h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] overflow-y-auto'>
        
        <div className='h-full w-full'>
        {contentData.component && contentData.component}
        
        </div>
    </div>
  )
}

export default Content