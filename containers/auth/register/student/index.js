import React from 'react'
import StudentRegisterComponent from '@/components/auth/register/student'
import CitiesData from '@/mocks/cities.json'
export default function StudentRegisterContainer() {
 

  return (
    <>
      <StudentRegisterComponent CitiesData={CitiesData}/>
    </>
  )
}
