import { createClient } from "@/utils/supabase/server";
import { NextApiRequest, NextApiResponse } from "next";
import { redirect } from 'next/navigation';
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';


export async function POST(request: Request) {
  const supabase = createClient();
  const prisma = new PrismaClient();
  const session = await supabase.auth.getSession()

  if(session) {

    const profileData = await request.json();

    // const user = await prisma.user.findUnique({
    //   where: { email: "hellok8ie@hello.com" },
    // });


    await prisma.$disconnect
    return NextResponse.json({ success: true }, profileData)
  }

  // TIM'S CODE HERE FOR REFERENCE FROM THE LIVE-FEED BRANCH

    //const userId: string = session?.user?.name || ''; // Declare userId variable
    //const { title, content } = req.body;
  
    // try {

        // const updateUser = await prisma.post.create({
    //       data: {
    //         username,
    //         country,
    //         city: { connect: { id: userId } },
    //         birthyear:
    //       },
    //     });
    //     console.log('New post created:', newPost);
    //     res.status(201).json(newPost);

    //   console.log('reached here')
    //   // const newPost = await prisma.post.create({
    //   //   data: {
    //   //     title,
    //   //     content,
    //   //     author: { connect: { id: userId } }, // Assuming the author ID is stored in the session
    //   //   },
    //   // });
    //   // console.log('New post created:', newPost);
    //   // res.status(201).json(newPost);
    // } catch (error) {
    //   console.error('Error creating post:', error);
    //   res.status(500).json({ error: 'Internal server error' });
    // }
  }
  