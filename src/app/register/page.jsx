import RegisterForm from '@/components/auth/RegisterForm/RegisterForm'
import React from 'react'

const RegisterPage = () => {
  return (
 <main
       className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
       <div className="w-full max-w-md">
         <RegisterForm />
       </div>
     </main>
  )
}

export default RegisterPage