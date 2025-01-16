import Wishlist from "@/pages/Wishlist"
import { notFound } from "next/navigation"


export const metadata = {
  title: 'wishlist',
  description: 'wishlist-page',
}
const wishlistPage = () => {
  return (
    notFound()
  )
  //return <Wishlist />
}

export default wishlistPage