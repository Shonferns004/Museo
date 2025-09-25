import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendBookingEmail = async (userEmail, ticketDetails) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Your Monument Tour Ticket Confirmation",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #1f2937;
                color: #f3f4f6;
              }
              .ticket-container {
                max-width: 600px;
                margin: 20px auto;
                background: linear-gradient(145deg, #374151, #1f2937);
                border-radius: 16px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                border: 1px solid #4b5563;
              }
              .ticket-header {
                background: #9333ea;
                color: white;
                padding: 20px;
                text-align: center;
              }
              .ticket-body {
                padding: 30px;
                position: relative;
              }
              .ticket-info {
                margin: 20px 0;
                border-left: 3px solid #9333ea;
                padding-left: 20px;
              }
              .ticket-detail {
                margin: 10px 0;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px dashed #4b5563;
                padding: 8px 0;
              }
              .ticket-footer {
                background: #374151;
                padding: 20px;
                text-align: center;
                font-size: 14px;
              }
              .qr-placeholder {
                width: 100px;
                height: 100px;
                background: #4b5563;
                margin: 20px auto;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                color: #9ca3af;
              }
              .ticket-number {
                font-family: monospace;
                font-size: 18px;
                color: #9333ea;
                text-align: center;
                margin: 20px 0;
                letter-spacing: 2px;
              }
            </style>
          </head>
          <body>
            <div class="ticket-container">
              <div class="ticket-header">
                <h1 style="margin: 0;">Monument Tour Ticket</h1>
                <p style="margin: 10px 0 0 0;">Your Adventure Awaits!</p>
              </div>
              
              <div class="ticket-body">
                <div class="ticket-number">
                  #${Math.random().toString(36).substr(2, 9).toUpperCase()}
                </div>
                
                <div class="ticket-info">
                  <div class="ticket-detail">
                    <strong>Date:</strong>
                    <span>${ticketDetails.visitDate.toDateString()}</span>
                  </div>
                  <div class="ticket-detail">
                    <strong>Time:</strong>
                    <span>${ticketDetails.visitTime}</span>
                  </div>
                  <div class="ticket-detail">
                    <strong>Ticket Type:</strong>
                    <span>${ticketDetails.ticketType}</span>
                  </div>
                  <div class="ticket-detail">
                    <strong>Adults:</strong>
                    <span>${ticketDetails.numAdults}</span>
                  </div>
                  <div class="ticket-detail">
                    <strong>Children:</strong>
                    <span>${ticketDetails.numChildren}</span>
                  </div>
                  <div class="ticket-detail">
                    <strong>Seniors:</strong>
                    <span>${ticketDetails.numSeniors}</span>
                  </div>
                  <div class="ticket-detail" style="border-bottom: 2px solid #9333ea;">
                    <strong>Total Price:</strong>
                    <span>$${ticketDetails.totalPrice}</span>
                  </div>
                </div>

                <div class="qr-placeholder">
                  QR Code
                </div>
                
                <p style="text-align: center; color: #9ca3af; font-size: 12px;">
                  Scan this QR code at the entrance
                </p>
              </div>

              <div class="ticket-footer">
                <p style="margin: 0;">
                  Thank you for choosing our service! We look forward to your visit.
                </p>
                <p style="margin: 10px 0 0 0; color: #9ca3af;">
                  Please arrive 15 minutes before your scheduled time.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Booking confirmation email sent to:", userEmail);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};