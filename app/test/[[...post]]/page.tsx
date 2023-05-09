import React from 'react'

const Posts:React.FC<any> = ({params}) => {
    const pages = [...params.post]
    

    return (
        <div>
            <div>merhaba bu header</div>
            {pages.includes('genelduyrular') && <div>genel duyurular</div>}
            {pages.includes('genelduyrular2') && <div>genel duyurular2</div>}
            {pages.includes('genelduyrular3') && <div>genel duyurular3</div>}
            {pages.includes('genelduyrular4') && <div>genel duyurular4</div>}
            <div>merhaba bu footer</div>
        </div>
    )
}

export default Posts
