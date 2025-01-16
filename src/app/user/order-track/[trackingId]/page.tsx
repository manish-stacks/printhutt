"use client"
import { get_order_by_id } from '@/_services/common/order';
import { shiprocketAuth } from '@/helpers/helpers';
import { IOrder } from '@/lib/types/order';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const OrderTrack = () => {
    const params = useParams();
    const trackingId = params?.trackingId as string | undefined;
    const [shipping, setShipping] = useState([]);

    console.log(trackingId)

    const getShipping = async () => {
        const token = await shiprocketAuth()
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${trackingId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };

        const response = await axios(config);
        console.log(response)
        //setShipping()

    }

    useEffect(() => {
        getShipping();
    }, [])



    // const [order, setOrder] = useState<IOrder | null>(null);

    // const fetchOrder = async () => {
    //     try {
    //         const response = await get_order_by_id(trackingId as string);
    //         setOrder(response);
    //     } catch (error) {
    //         toast.error('Error fetching order:');
    //     }
    // }
    // useEffect(() => {
    //     fetchOrder();
    // }, [trackingId]);


    return (
        <>

        </>
    )
}

export default OrderTrack