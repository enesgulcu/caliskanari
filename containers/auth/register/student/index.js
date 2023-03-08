import React from 'react'
import StudentRegisterComponent from '@/components/auth/register/student/index'
import data from '@/mocks/cities.json'
export default function StudentRegisterContainer() {
 

  return (
    <>
      <StudentRegisterComponent CitiesData={data}/>
    </>
  )
}
