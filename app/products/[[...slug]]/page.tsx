// For exemple: http://localhost:3000/products/grocery/dairy/milk
import React from 'react'

interface Props {
    params: { slug: string[] }
}

const ProductPage = ({ params: { slug } }: Props) => {

    return (
        <div>ProductPage: {slug && slug.map(item => `${item } `)}</div>
    )
}

export default ProductPage