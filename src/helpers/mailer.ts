const nodemailer = require("nodemailer");


interface mallerType {
    email: String,
    emailType: String,
    userId: String
}


export const sendEmail = async ({ email, emailType, userId }: mallerType) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: "maddison53@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
            },
        });


        const mailOption = {
            from: '"Maddison Foo Koch 👻" mks@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: "<b>Hello world?</b>", // html body
        }


        const mailResponce = await transporter.sendMail(mailOption)

    } catch (error: any) {
        throw new Error(error.message)
    }
}