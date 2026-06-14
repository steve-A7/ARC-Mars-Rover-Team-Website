import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/api/broadcast", async (req, res) => {
  const { orgName, message } = req.body;

  if (!orgName || !message) {
    return res.status(400).json({ error: "Organization Name and Transmission message are required." });
  }

  const targetEmail = "23-54439-3@student.aiub.edu";

  // Embedded user SMTP credentials for local & direct execution
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "465");
  const smtpSecure = process.env.SMTP_SECURE !== "false"; // default to true
  const smtpUser = process.env.SMTP_USER || "steve900032@gmail.com";
  const smtpPass = process.env.SMTP_PASS || "tdscotwmdqxkkwgb";

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    console.log(`Using SMTP Gateway: ${smtpHost} (${smtpSecure ? 'SSL' : 'TLS'}) authenticated as ${smtpUser}`);

    const info = await transporter.sendMail({
      from: `"ARC Partner Uplink" <${smtpUser}>`,
      to: targetEmail,
      replyTo: smtpUser,
      subject: `🚨 Transmission Received from ${orgName}`,
      text: `A new transmission has been broadcasted by ${orgName}.\n\nOrganization Name: ${orgName}\n\nMessage:\n${message}\n\nTimestamp: ${new Date().toISOString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0c0a09; color: #fafaf9; padding: 40px; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(239, 68, 68, 0.2); box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <div style="text-align: center; margin-bottom: 25px;">
            <p style="color: #ef4444; font-size: 11px; font-weight: bold; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 5px 0;">TRANS-LINK SATELLITE SYSTEM</p>
            <h2 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Transmission Signal Decoded</h2>
          </div>
          
          <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
            <p style="margin: 0 0 8px 0; font-size: 11px; color: #f59e0b; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">Organization Name:</p>
            <p style="margin: 0; font-size: 15px; color: #ffffff; font-family: monospace;">${orgName}</p>
          </div>

          <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 12px; margin-bottom: 25px;">
            <p style="margin: 0 0 8px 0; font-size: 11px; color: #ef4444; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">Message Content Decoded:</p>
            <p style="margin: 0; font-size: 15px; color: #e7e5e4; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px; text-align: center; font-size: 10px; color: #78716c;">
            <p style="margin: 4px 0;">© 2026 AIUB Robotics Crew. All Systems Nominal.</p>
            <p style="margin: 4px 0;">Port 3000 Secure Tunnel • Encryption Key Decrypted</p>
          </div>
        </div>
      `,
    });

    console.log(`Transmission successfully dispatched to 23-54439-3@student.aiub.edu! MessageId: ${info.messageId}`);
    res.json({ success: true, message: "Transmission successfully beamed to Mission Control." });
  } catch (err: any) {
    console.error("Transit delivery failure:", err);
    res.status(500).json({ error: `Satellite Link Offline: ${err.message}` });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server launched on http://localhost:${PORT}`);
  });
}

startServer();
