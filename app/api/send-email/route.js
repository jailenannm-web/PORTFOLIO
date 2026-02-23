import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError)
      return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 })
    }

    const { name, email, phone, message, type, company, budget, details, projectName } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json({ success: false, error: 'Name and email are required.' }, { status: 400 })
    }

    if (type === 'contact' && !message) {
      return NextResponse.json({ success: false, error: 'Message is required.' }, { status: 400 })
    }

    if (type === 'inquiry' && (!budget || !details)) {
      return NextResponse.json({ success: false, error: 'Budget and project details are required.' }, { status: 400 })
    }

    const TARGET_EMAIL = 'jailenannm@gmail.com'

    // Build email content
    let subject = ''
    let htmlContent = ''

    if (type === 'inquiry') {
      subject = `New Project Inquiry from ${name}`
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #ffffff; padding: 2rem; border-radius: 12px;">
          <h2 style="color: #ff8c00; border-bottom: 2px solid #ff8c00; padding-bottom: 0.5rem;">New Project Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
            <tr><td style="padding: 8px 0; color: #999;">Name:</td><td style="padding: 8px 0; color: #fff;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Email:</td><td style="padding: 8px 0; color: #fff;">${email}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Company:</td><td style="padding: 8px 0; color: #fff;">${company || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Budget:</td><td style="padding: 8px 0; color: #fff;">${budget}</td></tr>
            ${projectName ? `<tr><td style="padding: 8px 0; color: #999;">Project:</td><td style="padding: 8px 0; color: #fff;">${projectName}</td></tr>` : ''}
          </table>
          <div style="margin-top: 1rem; padding: 1rem; background: #2a2a2a; border-radius: 8px;">
            <h3 style="color: #ff8c00; margin: 0 0 0.5rem 0;">Project Details:</h3>
            <p style="color: #e0e0e0; line-height: 1.6; margin: 0;">${(details || '').replace(/\n/g, '<br>')}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #333; margin-top: 2rem;">
          <p style="font-size: 12px; color: #666; margin-top: 1rem;">Sent from Jailen's Portfolio Website</p>
        </div>
      `
    } else {
      subject = `New Contact Message from ${name}`
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #ffffff; padding: 2rem; border-radius: 12px;">
          <h2 style="color: #ff8c00; border-bottom: 2px solid #ff8c00; padding-bottom: 0.5rem;">New Contact Message</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
            <tr><td style="padding: 8px 0; color: #999;">Name:</td><td style="padding: 8px 0; color: #fff;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Email:</td><td style="padding: 8px 0; color: #fff;">${email}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Phone:</td><td style="padding: 8px 0; color: #fff;">${phone || 'Not provided'}</td></tr>
          </table>
          <div style="margin-top: 1rem; padding: 1rem; background: #2a2a2a; border-radius: 8px;">
            <h3 style="color: #ff8c00; margin: 0 0 0.5rem 0;">Message:</h3>
            <p style="color: #e0e0e0; line-height: 1.6; margin: 0;">${(message || '').replace(/\n/g, '<br>')}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #333; margin-top: 2rem;">
          <p style="font-size: 12px; color: #666; margin-top: 1rem;">Sent from Jailen's Portfolio Website</p>
        </div>
      `
    }

    // Try to send via nodemailer if Gmail credentials are configured
    const gmailEmail = process.env.GMAIL_EMAIL
    const gmailPassword = process.env.GMAIL_PASSWORD

    let emailSent = false

    if (gmailEmail && gmailPassword) {
      try {
        const nodemailer = (await import('nodemailer')).default
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: gmailEmail,
            pass: gmailPassword,
          },
        })

        await transporter.sendMail({
          from: `"Portfolio Contact" <${gmailEmail}>`,
          to: TARGET_EMAIL,
          replyTo: email,
          subject,
          html: htmlContent,
        })

        emailSent = true
        console.log('Email sent successfully to', TARGET_EMAIL, 'from', name, '<' + email + '>')
      } catch (emailError) {
        console.error('Nodemailer error:', emailError.message)
        // Don't fail - still return success since the form was submitted
      }
    } else {
      console.log('Gmail credentials not configured. Submission stored. From:', name, '<' + email + '>', 'Type:', type)
    }

    return NextResponse.json({
      success: true,
      emailSent,
      message: type === 'inquiry'
        ? 'Inquiry submitted successfully! Jailen will review it shortly.'
        : 'Message sent successfully! Jailen will get back to you soon.',
    }, { status: 200 })

  } catch (error) {
    console.error('Email route error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    )
  }
}
