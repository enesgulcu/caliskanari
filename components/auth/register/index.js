import React from 'react'
import StudentRegisterComponent from '@/components/auth/register/teacher/index.js'
import TeacherRegisterComponent from '@/components/auth/register/teacher'
import Link from 'next/link'

export default function RegisterComponent() {
  return (
    <div>
        <Link href="/auth/register/student">
            <div>
                <h4>Öğrenci Kayıt</h4>
            </div>
        </Link>
        <Link href="/auth/register/teacher">
            <div>
                <h4>Öğretmen Kayıt</h4>
            </div>
        </Link>
    </div>
  )
}