"use client";

import React, { useEffect, useState } from "react";
import { fetchMessages } from "@/utils/supabase/server";
// import { userCooke } from 'next-cooke'


export default function ListMessages() {

    const [messages, setMessages] = useState([]);
   

    // useEffect(() => {
    //   async function loadMessages() {
    //     const fetchedMessages = await fetchMessages();
    //     setMessages(fetchedMessages);
    //   }
    //   loadMessages();
    // }, []);

    return (
        <div className='flex-1 flex flex-col p-5 h-full overflow-y-auto'>
        <div className='flex-1 '></div>
        <div className='space-y-7'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => {
            return (
              <div className='flex gap-2' key={value}>
                <div className='h-10 w-10 bg-green-500 rounded-full'></div>
                <div className='flex-1'>
                  <div className='flex items-center gap-1'>
                    <h1 className='font-bold'>Mario</h1>
                    <h1 className='text-sm text-gray-400'>{new Date().toDateString()}</h1>
                  </div>
                  <p>
                    {' '}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto cum, dolorem non molestiae
                    temporibus, a odit dicta perferendis natus voluptates, hic dolore earum corporis veritatis sit
                    debitis illum obcaecati asperiores!
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        </div>  

    );
}