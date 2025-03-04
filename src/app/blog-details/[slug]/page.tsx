import { blogFrontService } from '@/_services/common/blogService';
import BlogDetails from '@/pages/BlogDetails';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    slug: string;
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: Props) {
  const { slug } = await params;

  try {
    const blog = await blogFrontService.getBlogDetails(slug);
  
    if (!blog) {
      return { notFound: true };
    }

    return {
      props: { blog },
      revalidate: 10,
    };
  } catch {
    return { notFound: true };
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const blog = await blogFrontService.getBlogDetails(slug);

    if (!blog) {
      return {
        title: 'Blog Details',
        description: 'Blog information',
      };
    }

    return {
      title: blog?.blogPost?.metaTitle || 'Blog Details',
      description: blog?.blogPost?.metaDescription || '',
      keywords: blog?.blogPost?.metaKeywords || '',
      openGraph: {
        images: blog.blogPost?.image?.url || '',
      },
    };
  } catch {
    return {
      title: 'Blog Details',
      description: 'Blog information',
    };
  }
}

export default async function BlogDetailsPage({ params }: Props) {
  try {
    const { slug } = await params;
    const blog = await blogFrontService.getBlogDetails(slug);

    if (!blog) {
      return notFound();
    }

    return <BlogDetails blogData={blog?.blogPost} relatedBlog={blog?.relatedBlogs} />;
  } catch {
    return notFound();
  }
}
