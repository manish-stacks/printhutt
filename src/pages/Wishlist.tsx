import WishListcart from "@/components/products/WishListcart";
import { Product } from "@/lib/types/product";
import React from "react";

interface PopupProps {
  products: {
    items: { productId: Product }[];
  }
  deleteWishlist: (productId: string) => void;

}

const Wishlist = ({ data, deleteWishlist }: PopupProps) => {
  
 
  return (
    <>
      <section className="section-wishlist py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px] bb-wish-rightside">
            {
              data && data?.length > 0 ? (
                data.map((product, index) => (
                  <div key={index} className="min-[992px]:w-[25%] min-[768px]:w-[50%] w-full px-[12px] mb-[24px] bb-wishlist">
                    <WishListcart product={product} deleteWishlist={deleteWishlist} />
                  </div>
                ))
              ) : (
                <div className="flex justify-center">
                  <p>Loading...</p>
                </div>
              )
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default Wishlist;
