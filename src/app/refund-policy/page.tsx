import React from 'react'

const page = () => {
    return (
        <section className="section-about py-[50px] max-[1199px]:py-[35px]">
            <div className="flex flex-wrap justify-between items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
                <div className="flex flex-wrap w-full mb-[-24px]">
                    <div className="p-6 bg-gray-100 min-h-screen">
                        <h1 className="text-3xl font-bold mb-4">Refund Policy</h1>
                        <ol className="list-decimal list-inside space-y-4">
                            <li>
                                All our products are custom made and manufactured on the order of customer. We do not offer any refunds or accept any returns for Custom Order Products.
                            </li>
                            <li>
                                If the Goods arrive to the Buyer in a damaged state, the Buyer must notify the delivery agent and us within 24 hours in writing inclusive of photography or a video evidence of the damage to the Goods and associated packaging to verify. Failure to comply with this request and timeframe will void the Seller's obligations.
                            </li>
                            <li>
                                Due to the hand-rendered nature of the Goods, they can be subject to variations and slight discolorations. Some colour variations can also occur due to the computer screen and printer calibration. The Buyer acknowledges that these variations and discolorations are not a fault of the Products and accepts the potential of such occurrence.
                            </li>
                            <li>
                                The Buyer shall inspect the Goods on delivery and shall within 24 hours of delivery inform us in writing of any alleged defect, shortage in quantity or damage. The Buyer shall afford the us an opportunity to inspect the Goods within a reasonable time following delivery. If the Buyer shall fail to comply with these provisions the Goods shall be conclusively presumed to be in accordance with the terms and conditions and free from any defect or damage.
                            </li>
                            <li>
                                Customer need to contact us in case of technical problems.
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default page