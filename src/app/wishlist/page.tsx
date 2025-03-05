"use client"
import { wishlistService } from "@/_services/common/wishlist";
import Wishlist from "@/pages/Wishlist"
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

import { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";

const WishlistPage = () => {

  const router = useRouter();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);


  const [wishlist, setWishlist] = useState([]);
  
  const getWishlist = async () => {
    const response = await wishlistService.getAll();
    setWishlist(response.data);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      return router.push('/login');
    }
    getWishlist();
  }, [])

  const deleteWishlist = async (productId: string) => {
    const response = await wishlistService.deleteWishlist(productId);
    toast(response.message)
    getWishlist();
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Wishlist data={wishlist?.items} deleteWishlist={deleteWishlist} />
    </Suspense>
  )

}

export default WishlistPage