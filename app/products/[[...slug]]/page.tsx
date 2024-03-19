// For exemple: part 1:  http://localhost:3000/products/grocery/dairy/milk
//              part 2: http://localhost:3000/products?sortOrder=Tibi
import React from 'react'

interface Props {
    params: { slug: string[] };
    searchParams: { sortOrder: string };
}

const ProductPage = ({ params: { slug }, searchParams: { sortOrder } }: Props) => {

    return (
        <>
            <div>ProductPage slug: {slug && slug.map(item => `${item} `)}</div> {/* For exemple: http://localhost:3000/products/grocery/dairy/milk */}
            <div>ProductPage sortOrder: {sortOrder}</div> {/* For exemple: http://localhost:3000/products?sortOrder=Tibi */}
        </>
    )
}

export default ProductPage