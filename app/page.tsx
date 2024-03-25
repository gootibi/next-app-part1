import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Image from "next/image";
import coffe from "@/public/images/coffe2.jpg"

export default async function Home() {

  const session = await getServerSession(authOptions)



  return (
    // <div>
    //   <h1>Hello {session && <span>{session.user?.name}</span>}</h1>
    //   <Link href='/users'>Users</Link>
    //   <ProductCard />
    // </div>
    <main className="relative h-screen"> {/* Set images position - relative - h-screean */}
      <Image
        src="https://bit.ly/react-cover"
        alt="Coffe"
        fill
        //style={{ objectFit: "contain" }}
        className="object-cover"
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw" // mobil, tablet, and desktop devices
        quality={100} // Quality of the image set
        priority
      />
    </main>
  )
}
