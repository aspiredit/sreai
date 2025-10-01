import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function registerRoutes(app: Express): Promise<Server> {
  console.log('🚀 Registering API routes...');

  // Test endpoint
  app.get("/api/test", (req, res) => {
    console.log('✅ GET /api/test endpoint hit!');
    res.json({ message: "API is working!", timestamp: new Date().toISOString() });
  });

  console.log('📝 Registered GET /api/test');

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    console.log('✅ GET /api/health endpoint hit!');
    res.json({
      status: "ok",
      message: "Server is running",
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV
    });
  });

  console.log('📝 Registered GET /api/health');

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    console.log('✅ POST /api/contact endpoint hit!');
    console.log('Request body:', req.body);

    // Set proper JSON response headers
    res.setHeader('Content-Type', 'application/json');

    try {
      const { name, email, company, message, inquiryType } = req.body;

      console.log('Contact form submission received:', { name, email, company, inquiryType });

      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({
          error: "Missing required fields: name, email, and message are required"
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          error: "Invalid email address format"
        });
      }

      // Validate message length
      if (message.length < 10) {
        return res.status(400).json({
          error: "Message must be at least 10 characters long"
        });
      }

      // Send email using Resend
      if (resend) {
        try {
          const emailResult = await resend.emails.send({
            from: "YESRE Contact Form <contact@yesre.ai>", // Using your verified domain
            to: ["krand03@gmail.com"], // Your Gmail for receiving emails
            subject: `New Contact Form Submission - ${inquiryType || 'General'}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
                  New Contact Form Submission
                </h2>

                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #495057; margin-top: 0;">Contact Details</h3>
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
                  <p><strong>Inquiry Type:</strong> ${inquiryType || 'General'}</p>
                </div>

                <div style="background: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
                  <h3 style="color: #495057; margin-top: 0;">Message</h3>
                  <p style="line-height: 1.6; color: #212529;">${message.replace(/\n/g, '<br>')}</p>
                </div>

                <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px;">
                  <p style="margin: 0; color: #1565c0; font-size: 14px;">
                    <strong>Reply to:</strong> ${email}
                  </p>
                </div>
              </div>
            `,
            reply_to: email
          });

          console.log(`✅ Contact form email sent successfully! Email ID: ${emailResult.id}, From: ${email}`);
        } catch (emailError) {
          console.error("Failed to send email:", emailError);
          // Don't fail the request if email fails - still store the submission
        }
      } else {
        console.log("RESEND_API_KEY not configured - email sending skipped");
        console.log("Contact form submission:", { name, email, company, message, inquiryType });
      }

      // Respond with success
      res.json({
        success: true,
        message: "Your message has been sent successfully. We'll get back to you within 24 hours!"
      });

    } catch (error) {
      console.error("Contact form error:", error);

      // Ensure we always send JSON response
      if (!res.headersSent) {
        res.status(500).json({
          error: "Failed to send message. Please try again later.",
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      }
    }
  });

  console.log('📝 Registered POST /api/contact');
  console.log('🎯 All API routes registered successfully!');

  const httpServer = createServer(app);

  return httpServer;
}
