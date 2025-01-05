import UserOrdersPage from "@/pages/user/UserOrdersPage";
import { Suspense } from "react";

const Page = () => {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <UserOrdersPage />
      </Suspense>
    </>
  )
}

export default Page;