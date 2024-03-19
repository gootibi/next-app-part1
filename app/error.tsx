// For example in UserTable.tsx page fetch url wrong writes. fetch('https://jsonplaceholder.typicode.com/usersXXXXX') => not found
'use client'

import React from 'react'

interface Props {
    error: Error;
    reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
    return (
        <>
            {/* Own error message. */}
            <div>An unexpected error has occurred.</div>

            {/* Write client error meassage */}
            <div>Found error: {error.message}</div>

            {/* Try reload page */}
            <button className="btn" onClick={() => reset()}>Retry</button>
        </>
    )
}

export default ErrorPage