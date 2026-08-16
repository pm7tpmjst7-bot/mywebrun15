import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendVerificationEmail(email: string, name: string, token: string) {
  const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000'
  const url = `${baseUrl}/api/auth/verify?token=${token}`
  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? 'noreply@rootpromptxai.life',
    to: email,
    subject: 'Verify your email',
    html: `<p>Hi ${name},</p><p>Click <a href="${url}">here</a> to verify your email.</p>`,
  })
}
