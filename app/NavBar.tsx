'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {

    const { status, data: session } = useSession()

    return (
        <div className='flex bg-slate-300 p-5 space-x-3'>
            <Link href='/' className='mr-5'>Next.js</Link>
            <Link href='/users'>Users</Link>
            {status === 'loading' && <div>Loading...</div>}
            {/* SignIn success -> give it user name */}
            {status === 'authenticated' &&
                <div>
                    {session.user!.name}
                    <Link href='/api/auth/signout' className='ml-3'>Sign Out</Link>
                </div>
            }
            {/* SignIn button add when status is unauthenticated, give providers http://localhost:3000/api/auth/providers */}
            {status === 'unauthenticated' && <Link href='/api/auth/signin'>Login</Link>}
        </div>
    )
}

export default NavBar