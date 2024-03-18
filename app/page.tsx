import Link from "next/link";
import ProductCart from "./components/ProductCart";

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <Link href='/users'>Users</Link>
      <ProductCart />
    </div>
  )
}
