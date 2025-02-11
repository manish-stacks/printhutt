import React from 'react'

const page = () => {
    return (
        <section className="section-about py-[50px] max-[1199px]:py-[35px]">
            <div className="flex flex-wrap justify-between items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
                <div className="flex flex-wrap w-full mb-[-24px]">
                    <div className="p-6 bg-gray-100 min-h-screen">
                        <h1 className="text-3xl font-bold mb-4">Return Policy</h1>
                        <p className="mb-4">
                            All our products are custom-made and manufactured on order. We do not offer or accept any returns for Custom Order Products. If the Goods arrive to the Buyer in a damaged state, the Buyer must notify the delivery agent and us within 24 hours in writing inclusive of photography or a video evidence of the damage to the Goods and associated packaging to verify. Failure to comply with this request and timeframe will void the Seller's obligations.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default page