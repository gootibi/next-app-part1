// http://localhost:3000/admin
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
    return (
        <div className='flex'>
            <aside className='p-5 mr-5 bg-slate-300'>Admin Sidebar (only)</aside>
            <div>{children}</div>
        </div>
    )
}

export default AdminLayout