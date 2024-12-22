"use client"
import { useParams } from 'next/navigation';

// export const metadata = {
//   title: 'Product-details',
//   description: 'Product-details',
// }

const Page = () => {

    const params = useParams();
    const slug = params?.slug as string | undefined;

    return (
        <>
            {slug}
        </>
    )
}

export default Page