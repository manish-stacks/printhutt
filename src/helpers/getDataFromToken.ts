import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';  

export const getDataFromToken = async (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || '';

        const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!);  
        const { payload } = await jwtVerify(token, secret);  
        return payload;  
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('An unknown error occurred');
    }
};

