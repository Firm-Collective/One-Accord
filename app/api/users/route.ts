import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// login user to supabase
export async function POST(request: Request) {


  try {
    const users = prisma.user.findMany();
    console.log('users', users);
  }
  catch (error) {
    console.error('Error fetching users:', error);
    return Response.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
  return Response.json({ success: true });
}
