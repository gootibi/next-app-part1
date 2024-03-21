import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    return (
        <div className='flex bg-slate-300 p-5 space-x-3'>
            <Link href='/' className='mr-5'>Next.js</Link>
            <Link href='/users'>Users</Link>
            {/* SignIn button add */}
            <Link href='/api/auth/signin'>Login</Link>
        </div>
    )
}

export default NavBar