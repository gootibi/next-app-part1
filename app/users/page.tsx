import React from 'react'

interface Users {
  id: number;
  name: string;
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
      <ul>
        {users.map((user) =>
          <li key={user.id}>{user.name}</li>
        )}
      </ul>
    </>
  )
}

export default UsersPage