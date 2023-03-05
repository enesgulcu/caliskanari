import React from 'react'
import StudentRegisterComponent from '@/components/auth/register/studenty'
import data from '@/mocks/cities.json'
export default function StudentRegisterContainer() {
 

  return (
    <>
      <StudentRegisterComponent CitiesData={data}/>
    </>
  )
}
