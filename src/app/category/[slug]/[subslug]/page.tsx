"use client"
import { useParams } from 'next/navigation';

// export const metadata = {
//   title: 'Product-details',
//   description: 'Product-details',
// }

const Page = () => {

    const params = useParams();
    const slug = params?.slug as string | undefined;
    const subslug = params?.subslug as string | undefined;
    console.log(params)
    return (
        <>
            {subslug}
        </>
    )
}

export default Page