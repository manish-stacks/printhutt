import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Headerlocation = () => {

    const [location, setLocation] = useState({ city: '', country: '' });
    //const [error, setError] = useState('');


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
                        // console.log(data)
                        const city = data.address?.state || data.address?.city || data.address?.town || 'Unknown City';
                        const country = data.address?.country || 'Unknown Country';
                        setLocation({ city, country });
                    } catch {
                        toast.error('Unable to fetch location data');
                    }
                },
                () => {
                    toast.error('Location permission denied');
                }
            );
        } else {
            toast.error('Geolocation is not supported by this browser');
        }
    }, []);

    return (
        <>
            {location.city}
        </>
    )
}

export default Headerlocation