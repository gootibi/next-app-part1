'use client'

import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Image from "next/image";
import coffe from "@/public/images/coffe2.jpg"
import { Metadata } from "next";
// import HeavyComponent from "./components/HeavyComponent"; // Static import not not dynamically imported
import { useState } from "react";
import dynamic from "next/dynamic"; // Lazy loading
const HeavyComponent = dynamic(() => import('./components/HeavyComponent'), { ssr: false, loading: () => <p>Loading...</p> })
import _ from "lodash"

export default function Home() {

  // const session = await getServerSession(authOptions)

  // Lazy loading
  const [isVisible, setIsVisible] = useState(false)


  return (
    <div>
      {/* <h1>Hello {session && <span>{session.user?.name}</span>}</h1> */}
      <Link href='/users'>Users</Link>
      <ProductCard />
    
      <button className="btn btn-outline my-3" onClick={() => setIsVisible(true)}>Show 1</button>  {/* Lazy loading */}
      {isVisible && <HeavyComponent />}

      {/* Static loadnig */}
      <button className="btn btn-outline my-3" onClick={() => {
        const user = [
          { name: 'c' },
          { name: 'b' },
          { name: 'a' },
        ]

        const sorted = _.orderBy(user, 'name')

        console.log(sorted)
      }}>Show 2</button>  {/* Static loading */}

      {/* Dynamic loading */}
      <button className="btn btn-outline my-3" onClick={async () => {

        const _ = (await import('lodash')).default

        const user = [
          { name: 'c' },
          { name: 'b' },
          { name: 'a' },
        ]

        const sorted = _.orderBy(user, 'name')

        console.log(sorted)
      }}>Show 2</button>  {/* Lazy loading */}

    </div>
    // <main className="relative h-screen"> {/* Set images position - relative - h-screean */}
    //   <Image
    //     src="https://bit.ly/react-cover"
    //     alt="Coffe"
    //     fill
    //     //style={{ objectFit: "contain" }}
    //     className="object-cover"
    //     sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw" // mobil, tablet, and desktop devices
    //     quality={100} // Quality of the image set
    //     priority
    //   />
    // </main>
  )
}

// Give metadata about the page
// export const metadata: Metadata = {
//   title: '...'
// }

// Give metadata about the page autogenerated
// export async function generateMetadata(): Promise<Metadata> {
//   const product = await fetch('')
//   ...
//   return {
//     title: product.title,
//     description: product.description,
//   }
// }