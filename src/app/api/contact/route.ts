import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, service, budget, message, type } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    // Create Gmail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Format the email subject
    const subject = type === 'project'
      ? `🚀 New Project Inquiry from ${name}`
      : `📅 Consultation Request from ${name}`

    // Build email body
    const htmlBody = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0;">
        <div style="background: linear-gradient(135deg, #C45C3C, #E07A5F); padding: 32px; border-radius: 16px 16px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">
            ${type === 'project' ? '🚀 New Project Inquiry' : '📅 Consultation Request'}
          </h1>
          <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0 0; font-size: 14px;">
            Submitted via 22 Dstrct website
          </p>
        </div>
        
        <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e5e5; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #333; width: 140px; vertical-align: top;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #555;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #333; vertical-align: top;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #555;">
                <a href="mailto:${email}" style="color: #C45C3C; text-decoration: none;">${email}</a>
              </td>
            </tr>
            ${company ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #333; vertical-align: top;">Company</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #555;">${company}</td>
            </tr>` : ''}
            ${service ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #333; vertical-align: top;">Service</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #555;">${service}</td>
            </tr>` : ''}
            ${budget ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #333; vertical-align: top;">Budget</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #555;">${budget}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 12px 0; font-weight: 600; color: #333; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; color: #555; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
        </div>
        
        <div style="background: #fafafa; padding: 20px 32px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 16px 16px;">
          <p style="margin: 0; font-size: 12px; color: #999;">
            This email was sent from the 22 Dstrct website contact form.
          </p>
        </div>
      </div>
    `

    // Send the email
    await transporter.sendMail({
      from: `"22 Dstrct Website" <${process.env.GMAIL_ADDRESS}>`,
      to: process.env.GMAIL_ADDRESS,
      replyTo: email,
      subject,
      html: htmlBody,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    )
  }
}
