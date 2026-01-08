const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- MIDDLEWARE ---
// CORS allows your React app (usually on port 3000) to talk to this server (port 5000)
app.use(cors()); 
app.use(express.json());

// --- GMAIL CONFIGURATION ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address from .env
    pass: process.env.EMAIL_PASS  // Your 16-character App Password from .env
  }
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Transporter Error:", error);
  } else {
    console.log("✅ Server is ready to send emails");
  }
});

// --- THE EMAIL ROUTE ---
app.post('/send-quote', async (req, res) => {
  const { sector, platform, budget, contact, visualIdentity, deliveryTime, techType } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Sending the email to yourself
    subject: `🚀 New Project Quote Request: ${sector}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #26AA87; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #1a1a1a; color: #26AA87; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">New Quote Request</h2>
        </div>
        <div style="padding: 20px; background-color: #0a0a0a; color: #ffffff;">
          <p><strong>Sector:</strong> ${sector}</p>
          <p><strong>Platform:</strong> ${platform}</p>
          <p><strong>Visual Identity:</strong> ${visualIdentity}</p>
          <p><strong>Expected Delivery:</strong> ${deliveryTime}</p>
          <p><strong>Preferred Technology:</strong> ${techType}</p>
          <p><strong>Estimated Budget:</strong> ${budget}</p>
          <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;">
          <p style="font-size: 1.1rem;"><strong>Client Contact:</strong> <span style="color: #26AA87;">${contact}</span></p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent successfully!");
    res.status(200).json({ message: "Email Sent Successfully" });
  } catch (error) {
    console.error("❌ Nodemailer Error:", error);
    res.status(500).json({ message: "Failed to send email", error: error.toString() });
  }
});



// --- NEW Route for Contact Form ---
app.post('/send-contact', async (req, res) => {
  const { name, email2, subject, message } = req.body; // Matches names in Contact.jsx

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Contact Form: ${subject}`,
    text: `Name: ${name}\nEmail: ${email2}\nMessage: ${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; border: 1px solid #26AA87; padding: 20px; border-radius: 10px; background-color: #0a0a0a; color: #fff;">
        <h2 style="color: #26AA87;">New Message from Website</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email2}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr style="border-top: 1px solid #333;">
        <p><strong>Message:</strong></p>
        <p style="background: #1a1a1a; padding: 15px; border-radius: 5px;">${message}</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});




// --- START THE SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});