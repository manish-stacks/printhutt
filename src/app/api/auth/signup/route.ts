import dbConnect from '@/dbConfig/dbConfig';
import UserModel from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { isEmail } from '@/helpers/helpers';  // Assuming you have an email validator helper


export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const { username, email, password, number } = reqBody;

        // Input validation
        if (!username || !email || !password || !number) {
            return NextResponse.json({
                message: "All fields are required",
                success: false,
            }, { status: 400 });
        }

        // Validate email format
        if (!isEmail(email)) {
            return NextResponse.json({
                message: "Invalid email format",
                success: false,
            }, { status: 400 });
        }

        // Check if the user already exists
        const userByEmail = await UserModel.findOne({ email });
        if (userByEmail) {
            return NextResponse.json({
                error: 'User with this email already exists',
                success: false,
            }, { status: 400 });
        }

        const userByNumber = await UserModel.findOne({ number });
        if (userByNumber) {
            return NextResponse.json({
                error: 'User with this number already exists',
                success: false,
            }, { status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = new UserModel({
            username,
            email,
            number,
            password: hashedPassword,
        });

        // Save the user to the database
        const saveUser = await newUser.save();

        // Optional: Send email for verification (You can implement this later)
        // await sendEmail({ email, emailType: 'VERIFY', userId: saveUser._id });

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            user: saveUser,
        }, { status: 201 });

    } catch (error: unknown) {
        console.error('Registration Error:', error);
        return NextResponse.json({
            error: (error instanceof Error) ? error.message : 'Internal server error',
            success: false,
        }, { status: 500 });
    }
}
