import { NextRequest, NextResponse } from 'next/server';
import  dbConnect  from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import User from '@/models/userModel';


export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { id } = await getDataFromToken(req)
    if (!id) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });


    const { number, email, userId } = await req.json();

    const user = await User.findById(userId);
    console.log(userId)

    if (!user) { return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 }); }
    user.number = number;
    user.email = email;

    await user.save();
    return NextResponse.json({ success: true, message: 'User updated successfully', user }, {
      status: 200
    });

  } catch (error: unknown) {
    return NextResponse.json({
      error: (error as Error).message
    },
      { status: 500 });
  }
}
