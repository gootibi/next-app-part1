// This component use only users pages.tsx. Go component folder, then use global.
import React from 'react'
import { sort } from "fast-sort";
import Link from 'next/link';

interface Users {
    id: number;
    name: string;
    email: string;
}

interface Props {
    sortOrder: string;
}

const UserTable = async ({sortOrder}: Props) => {
    const res = await fetch(
        'https://jsonplaceholder.typicode.com/usersXXXXXX',
        { cache: 'no-store' } // { cache: 'no-store' } is the data no strore => dynamic page and render server side. "npm run build" see the results
    )
    const users: Users[] = await res.json()
    
    const sortedUser = sort(users).asc(sortOrder === 'email' ? user => user.email : user => user.name)

    return (
        <table className='table table-zebra'>
            <thead>
                <tr>
                    <th><Link href="/users?sortOrder=name">Name</Link></th>
                    <th><Link href="/users?sortOrder=email">Email</Link></th>
                </tr>
            </thead>
            <tbody>
                {sortedUser.map(user =>
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                    </tr>
                )}
            </tbody>

        </table>
    )
}

export default UserTable