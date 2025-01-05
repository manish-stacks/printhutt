import ReturnPolicyPage from "@/pages/admin/ReturnPolicyPage";
import { Suspense } from "react";

const Page = () => {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ReturnPolicyPage />
      </Suspense>
    </>
  )
}

export default Page;