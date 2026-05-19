import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, company, email, budget, message } = await request.json();

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactReceiver = process.env.CONTACT_RECEIVER || smtpUser;

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      console.warn("⚠️ SMTP environment variables are not fully configured. Logging submission to console:");
      console.log("Contact Form Submission:", { name, company, email, budget, message });
      
      return NextResponse.json({
        success: true,
        message: "Submission logged successfully (SMTP credentials not configured in environment variables)."
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: smtpPort === '465', // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${smtpUser}>`,
      replyTo: email,
      to: contactReceiver,
      subject: `New TRXS Lead: Project inquiry from ${name}`,
      text: `
Name: ${name}
Company: ${company || 'N/A'}
Email: ${email}
Budget: ${budget || 'N/A'}

Message:
${message}
      `,
      html: `
        <h3>New Project Inquiry from TRXS Contact Form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!"
    });
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
