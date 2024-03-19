import React from 'react'

interface Props {
    params: { id: number, photoId: number };
}

const PhotoPage = ({ params: { id, photoId } }: Props) => {
    return (
        <>
            <div>UserDetailPage {id}</div>
            <div>PhotoPage {photoId}</div>
        </>
    )
}

export default PhotoPage