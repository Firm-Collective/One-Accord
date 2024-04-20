import { PrismaClient } from '@prisma/client';
import { any, string } from 'zod';
import { User } from '../types';

const prisma = new PrismaClient();

export async function createPost(title: string, content: string) {
  try {
    const newPost = await prisma.post.create({
      data: {
        id: "",
        title: "",
        content: "",
  createdAt: "",
  updatedAt: "",
  authorId: ""
      },
    });
    console.log('New post created:', newPost);
  } catch (error) {
    console.error('Error creating post:', error);
  }
}

// Add more database operation functions as needed
