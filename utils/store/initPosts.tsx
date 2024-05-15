'use client';

import { User } from '@supabase/supabase-js';
import React, { useEffect, useRef } from 'react';
import { IPost, usePost } from './posts';

export default function InitPosts({ posts }: { posts: IPost[] }) {
  const initState = useRef(false);
  useEffect(() => {
    if (!initState.current) {
      usePost.setState({ posts });
    }

    initState.current = true;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
