"use client"
import { wishlistService } from "@/_services/common/wishlist";
import Wishlist from "@/pages/Wishlist"
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

import { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";

const wishlistPage = () => {

  const router = useRouter();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);


  const [wishlist, setWishlist] = useState([]);
  // const wishlist = useUserStore((state) => state.wishlist);
  // const { data, error, isLoading } = useQuery(
  //   ["wishlist", wishlist],
  //   async () => {
  //     const response = await fetch("/api/wishlist");
  //     return response.json();
  //   },
  //   {
  //     cacheTime: 1000 * 60 * 60, // 1 hour
  //   }
  // );

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

export default wishlistPage