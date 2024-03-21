'use client'
import React, { useState } from 'react'
import { CldImage, CldUploadWidget } from 'next-cloudinary'

interface CloudinaryResult {
    public_id: string
}

const UploadPage = () => {

    const [publicId, setPublicId] = useState('')

    return (
        <>
            {/* Image is visible, when upload success */}
            {publicId && <CldImage src={publicId} width={270} height={180} alt='Image' />}

            {/* Upload image whith "CldUploadWidget" and set the public_id (onSuccess) */}
            <CldUploadWidget
                uploadPreset='xbror44s'
                // Set uploded inage public_id
                onSuccess={(result, option) => {
                    if (result.event != 'success') return
                    const info = result.info as CloudinaryResult
                    setPublicId(info.public_id)
                }}
            >
                {({ open }) =>
                    <button
                        className='btn btn-primary'
                        onClick={() => open()}
                    >
                        Upload
                    </button>}
            </CldUploadWidget>
        </>
    )
}

export default UploadPage