import OrderPage from "@/pages/admin/OrderPage";
import { Suspense } from "react";

const Page = () => {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <OrderPage />
      </Suspense>
    </>
  )
}

export default Page;