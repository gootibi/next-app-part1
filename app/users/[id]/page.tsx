// http://localhost:3000/users/[id]
import { notFound } from 'next/navigation';
import React from 'react'

interface Props {
    params: { id: number };
}

const UserDetailPage = ({ params: { id } }: Props) => {
    if (id > 10) {
        notFound() // When 'id' greater than 10, then return not found page.
    }

    return (
        <div>UserDetailPage {id}</div>
    )
}

export default UserDetailPage