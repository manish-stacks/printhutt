"use client";
import { blogFrontService } from "@/_services/common/blogService";
import { Pagination } from "@/components/admin/Pagination";
import Breadcrumb from "@/components/Breadcrumb";
import { PaginationData } from "@/lib/types";
import { BlogFormData } from "@/lib/types/blog";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogFormData[]>([]);
  const [pagination, setPagination] = useState<PaginationData>();
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = searchParams?.get('page') || '1';
  const search = searchParams?.get('search') || '';

  useEffect(() => {
    fetchBlogs();
  }, [page, search]);

  async function fetchBlogs() {
    try {
      setIsLoading(true);
      const response = await blogFrontService.getAll(page, search);

      setBlogs(response?.data);
      setPagination(response?.pagination);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      toast.error('Failed to fetch blogs');
    } finally {
      setIsLoading(false);
    }
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams!);
    params.set('page', newPage.toString());
    return router.push(`?${params.toString()}`);
  };
  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams!);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  }

  // console.log(blogs)
  return (
    <>
      <Breadcrumb title={"Blog"} />

      <section className="section-blog py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px]">

            {
              isLoading ?
                Array(6).fill(null).map((_, i) => (
                  <div
                    key={i}
                    className="min-[992px]:w-[33.33%] min-[768px]:w-[50%] w-full px-[12px] mb-[24px]"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                    data-aos-delay={200}
                  >
                    <div className="bb-blog-card bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px] animate-pulse">
                      <div className="blog-image bg-gray-300 h-[200px] w-full rounded-tl-[20px] rounded-tr-[20px]"></div>
                      <div className="blog-contact p-[20px]">
                        <div className="h-[20px] bg-gray-300 rounded w-[70%] mb-[12px]"></div>
                        <div className="h-[14px] bg-gray-300 rounded w-[90%] mb-[12px]"></div>
                        <div className="h-[14px] bg-gray-300 rounded w-[85%] mb-[12px]"></div>
                        <div className="h-[35px] bg-gray-300 rounded w-[30%] mt-[12px]"></div>
                      </div>
                    </div>
                  </div>
                )
                ) : (
                  blogs.length > 0 ? (
                    blogs.map((blog, index) => (
                      <div
                        key={index}
                        className="min-[992px]:w-[33.33%] min-[768px]:w-[50%] w-full px-[12px] mb-[24px]"
                        data-aos="fade-up"
                        data-aos-duration={1000}
                        data-aos-delay={200}
                      >
                        <div className="bb-blog-card bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px]">
                          <div className="blog-image">
                            <Image
                              width={800}
                              height={500}
                              src={blog?.image?.url}
                              alt="blog-1"
                              className="w-full rounded-tl-[20px] rounded-tr-[20px]"
                            />
                          </div>
                          <div className="blog-contact p-[20px]">
                            <h5 className="mb-[12px] text-[18px] leading-[1.2]">
                              <a

                                className="font-Poppins leading-[28px] tracking-[0.03rem] text-[18px] font-medium text-[#3d4750]"
                              >
                                {blog?.title}
                              </a>
                            </h5>
                            <p className="font-Poppins tracking-[0.03rem] mb-[12px] text-[14px] leading-[26px] font-light">
                              {blog?.short_description}
                            </p>
                            <div className="blog-btn flex">
                              <Link
                                href={`/blog-details/${blog?.slug}`}
                                className="bb-btn-2 transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[2px] px-[14px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                              >
                                Read More
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (

                    <div className="text-center text-2xl">
                      Blog not Found
                    </div>
                  )

                )
            }



            <div className="w-full px-[12px]">
              {pagination && (
                <Pagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
