
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Handle the form submission logic here
    const formData = req.body;
    // Make requests to your backend, Prisma, or Supabase here
    // Example: Use Axios to make a POST request
    try {
      const response = await axios.post('/api/submitForm', formData);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
