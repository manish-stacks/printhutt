
import BlogList from "@/pages/admin/blog/BlogList";
import { Suspense } from "react";

const Page = () => {

  return (
    <>
      <Suspense fallback={<div>Loading categories...</div>}>
        <BlogList />
      </Suspense>
    </>
  )
}

export default Page;