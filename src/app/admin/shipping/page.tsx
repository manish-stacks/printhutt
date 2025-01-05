
import ShippingPage from "@/pages/admin/ShippingPage";
import { Suspense } from "react";

const Page = () => {

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <ShippingPage />
            </Suspense>
        </>
    )
}

export default Page;