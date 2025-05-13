import { redirect } from 'next/navigation'
import React from 'react'
import { api } from '../../../../api/api'
import { getServerSession } from '@/lib/getServerSession'
import DashboardAdmin from '@/components/dashboard/DashboardAdmin'

const DashboardPage = async ({ params }) => {
    const role = (await params).role
    const session = await getServerSession()
   
    if(!session) redirect('/')

    const user = await api.getUserByEmail(session.email)

    if (role != 'admin' && role != 'user') {
        redirect('/')
    }

 


    return (
        <div>
            {user && user.role === 'admin' && (
               <div>
                <DashboardAdmin/>
               </div>

            )}
            {user && user.role === 'user' && (
                <p>Hola, User</p>
            )}
        </div>
    )
}

export default DashboardPage