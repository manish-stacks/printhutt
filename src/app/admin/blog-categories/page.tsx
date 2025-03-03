
import BlogCategory from "@/pages/admin/BlogCategory";
import { Suspense } from "react";

const Page = () => {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <BlogCategory />
      </Suspense>
    </>
  )
}

export default Page;