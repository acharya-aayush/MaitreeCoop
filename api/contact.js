import { createClient } from '@sanity/client';

// Server-side Sanity client with write permissions
const writeClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'w4d9v3bc',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN, // Server-only token
});

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, subject, and message are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Get client IP and user agent
    const ipAddress = req.headers['x-forwarded-for'] || 
                     req.headers['x-real-ip'] || 
                     req.connection.remoteAddress || 
                     req.socket.remoteAddress || 
                     (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
                     'unknown';

    const userAgent = req.headers['user-agent'] || 'unknown';

    // Create the document
    const doc = {
      _type: 'contactMessage',
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      subject: subject.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      status: 'new',
      isRead: false,
      priority: 'medium',
      ipAddress: Array.isArray(ipAddress) ? ipAddress[0] : ipAddress,
      userAgent
    };

    // Save to Sanity
    const result = await writeClient.create(doc);

    // Return success response (without exposing internal data)
    res.status(200).json({ 
      success: true, 
      message: 'Contact message submitted successfully',
      id: result._id 
    });

  } catch (error) {
    console.error('Error creating contact message:', error);
    res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    });
  }
}