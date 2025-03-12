import axios from "axios";

export function isEmail(input: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
}


export const generateSlug = (text: string) => {
    return text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
};


export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(amount);
}

export function formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(date));
}


let cachedToken = null;

export async function shiprocketAuth() {
    if (cachedToken) {
        return cachedToken;
    }
    try {
        const authResponse = await axios.post(`https://apiv2.shiprocket.in/v1/external/auth/login`, {
            email: process.env.SHIPROCKET_EMAIL,
            password: process.env.SHIPROCKET_PASSWORD,
        });
        cachedToken = authResponse.data.token;
        return cachedToken;
    } catch (error) {
        console.error('Error authenticating with Shiprocket:', error);
        throw error;  
    }
}
