import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import UserModel from '@/models/userModel'

import { getDataFromToken } from '@/helpers/getDataFromToken'
connect()

export const POST = async (request: NextRequest) => {
    try {
        const userId = await getDataFromToken(request)
        const user = await UserModel.findOne({ _id: userId }).select("-password")
        return NextResponse.json({
            message: "User Found",
            data: user
        }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message || 'Internal server error',
        }, { status: 500 });
    }
}