// http://localhost:3000/users/[id]/photos/[photoId]
import React from 'react'
import UserTable from './UserTable'

const UsersPage = async () => {
  return (
    <>
      <h1>Users</h1>
      <UserTable />
    </>
  )
}

export default UsersPage