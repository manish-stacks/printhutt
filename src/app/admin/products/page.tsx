import ProductListPage from "@/pages/admin/ProductListPage";
import { Suspense } from "react";

const Page = () => {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductListPage />
      </Suspense>
    </>
  )
}

export default Page;