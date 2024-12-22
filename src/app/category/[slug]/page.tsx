"use client"
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// export const metadata = {
//   title: 'Product-details',
//   description: 'Product-details',
// }

const Page = () => {

    const params = useParams();
    const slug = params?.slug as string | undefined;


    const [location, setLocation] = useState({ city: '', country: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    // Use Nominatim (OpenStreetMap free reverse geocoding API)
                    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
                    // const url = 'http://ip-api.com/json'
                    try {
                        const response = await fetch(url);
                        const data = await response.json();
                        console.log(data)
                        const city = data.address?.state || data.address?.city || data.address?.town || 'Unknown City';
                        const country = data.address?.country || 'Unknown Country';
                        setLocation({ city, country });
                    } catch (err) {
                        setError('Unable to fetch location data');
                    }
                },
                (err) => {
                    setError('Location permission denied');
                }
            );
        } else {
            setError('Geolocation is not supported by this browser');
        }
    }, []);

    return (
        <>
            {error ? <p>{error}</p> : <p>{location.city}, {location.country}</p>}

        </>
    )
}

export default Page