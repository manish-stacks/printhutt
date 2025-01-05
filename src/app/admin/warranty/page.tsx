import Warranty from "@/pages/admin/warranty/Warranty";
import { Suspense } from "react";

const Page = () => {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Warranty />
      </Suspense>
    </>
  )
}

export default Page;