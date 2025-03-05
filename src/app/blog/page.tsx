import Blog from "@/pages/Blog";
import { Suspense } from "react";


export const metadata = {
  title: "Blog : Shop made for everyone’s dream Decoration - Print Hutt",
  description: "We are India No.1 neon light makers. We make customized neon lights and signs for your home, business or events. If you’re looking for a high-quality, custom neon sign maker, contact us at PrintHutt.",
};

const BlogPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Blog />
    </Suspense>
  )

};

export default BlogPage;
