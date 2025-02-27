import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';


export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { id } = await getDataFromToken(req)
    if (!id) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    const { number, email, password } = await req.json();
   
    const user = await User.findById(id);
    if (!user) { return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 }); }
    if (number) user.number = number;
    if (email) user.email = email;
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      user.password = hashedPassword;
    }

    await user.save();

    const userResponse = user.toObject();
    if (userResponse.password) delete userResponse.password;

    return NextResponse.json({ success: true, message: 'User updated successfully', user: userResponse }, {
      status: 200
    });

  } catch (error: unknown) {
    return NextResponse.json({
      error: (error as Error).message
    },
      { status: 500 });
  }
}
