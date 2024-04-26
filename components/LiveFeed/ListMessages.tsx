'use client';

// import React, { useEffect, useState } from 'react';

// import { useMessage } from '@/utils/store/messages';
// import Message from './Message';

// export default function ListMessages() {
//   const messsages = useMessage((state) => state.messages);

//   return (
//     <div className='flex-1 flex flex-col p-5 h-full overflow-y-auto'>
//       <div className='flex-1 '></div>
//       <div className='space-y-7'>
//         {messsages.map((value, index) => {
//           return <Message key={index} message={value} />;
//         })}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect, ReactElement } from 'react';

import { getAllPosts, getAllUsers, getOneUser } from '@/utils/supabase/db';
// import { useRouter } from "next/router";
import { supabase } from '@/utils/supabase/db';

interface Post {
  id: number;
  content: string;
  updated_at: string;
}

interface User {
  id: string;
  username: string;
  birth_year: string;
}

export default function Post(): ReactElement {
  const [posts, setBlogs] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      await getAllPosts().then((response) => setBlogs(response as Post[]));
      // console.log(blogs);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      await getAllUsers().then((response) => setUsers(response as User[]));
      // console.log(blogs);
    }
    fetchData();
  }, []);

  // This is how you get one user data based on user id
  // useEffect(() => {
  //   async function fetchData() {
  //    const data= await getOneUser('e636d844-6a9d-4efe-a98d-69c3aef382f5');
  //     console.log(data);
  //   }
  //   fetchData();
  // }, []);

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {posts.map((b: Post) => {
        return (
          <div className='post' key={b.id}>
            <div className='postInfo'>{/* <p className="postDesc">{b.id}</p> */}</div>
            <p className='postDesc'>{b.content}</p>

            <div className='postButtons'></div>
          </div>
        );
      })}
      {users.map((u: User) => {
        return (
          <div className='post' key={u.id}>
            <div className='postInfo'>
              <p className='postDesc'>{u.id}</p>
              <p className='postDesc'>{u.username}</p>
              <p className='postDesc'>{u.birth_year}</p>
            </div>

            <div className='postButtons'></div>
          </div>
        );
      })}
    </>
  );
}
