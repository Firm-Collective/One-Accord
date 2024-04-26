'use server';

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session || !session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId: string = session?.user?.name || ''; // Declare userId variable
  const { title, content } = req.body;

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { id: userId } }, // Assuming the author ID is stored in the session
      },
    });
    console.log('New post created:', newPost);
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
