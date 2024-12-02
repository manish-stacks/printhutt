import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';  

export const getDataFromToken = async (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || '';

        const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!);  
        const { payload } = await jwtVerify(token, secret);  
        return payload.id;  
    } catch (error: any) {
        throw new Error(error.message);  
    }
};

