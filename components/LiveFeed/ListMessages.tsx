'use client';


import React, { useState, useEffect, ReactElement } from 'react';
import { getAllPosts } from '@/utils/supabase/db';

interface Post {
  activity_id: string
  category_id: string
  content: string
  created_at: string
  event_id: string
  id: string
  is_offensive: boolean
  is_visible: boolean
  keywords_id: string
  media_type_id: string
  sentiment_id: string
  tag_id: string | null
  user_id: string
}

interface ListMessagesProps {
  posts?: Post[]; // Make the prop optional
}

export default function ListMessages({ posts: propPosts }: ListMessagesProps): ReactElement  {
  const [posts, setPosts] = useState<Post[]>([]);


  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchData();
  }, [posts]);



  return (
    <>
      {posts.map((post: Post) => (
        <div className='post' key={post.id}>
      
          <p className='postDesc'>{post.content}</p>
          <div className='postButtons'></div>
        </div>
      ))}
    </>
  );
}






// interface User {
//   id: string;
//   username: string;
//   birth_year: string;
// }

// export default function Post(): ReactElement {
//   
//   const [users, setUsers] = useState<User[]>([]);



//   useEffect(() => {
//     async function fetchData() {
//       await getAllUsers().then((response) => setUsers(response as User[]));
//       // console.log(blogs);
//     }
//     fetchData();
//   }, []);

  // This is how you get one user data based on user id
  // useEffect(() => {
  //   async function fetchData() {
  //    const data= await getOneUser('e636d844-6a9d-4efe-a98d-69c3aef382f5');
  //     console.log(data);
  //   }
  //   fetchData();
  // }, []);



 
