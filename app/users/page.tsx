import React from 'react'

interface Users {
  id: number;
  name: string;
  email: string;
}

const UsersPage = async () => {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/users',
    { cache: 'no-store' } // { cache: 'no-store' } is the data no strore => dynamic page and render server side. "npm run build" see the results
  )
  const users: Users[] = await res.json()

  return (
    <>
      <h1>Users</h1>
      <table className='table table-zebra'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          )}
        </tbody>

      </table>
    </>
  )
}

export default UsersPage