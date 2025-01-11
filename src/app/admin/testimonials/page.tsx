import Testimonials from "@/pages/admin/Testimonials";
import { Suspense } from "react";

const Page = () => {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Testimonials />
      </Suspense>
    </>
  )
}

export default Page;