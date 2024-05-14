import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function insertPost(document: any) {
  const { data, error } = await supabase.from('Post').insert(document);

  if (error) {
    console.log('Error inserting blog:', error);
  } else {
    console.log('Blog inserted successfully:', data);
    return data;
  }
}

export async function getAllPosts() {
  try {
    const { data: posts, error } = await supabase.from('Post').select('*');
    if (error) {
      throw error;
    }
    console.log(posts);
    return posts;
  } catch (error) {
    console.log('Error getting posts');
    return []; // Return an empty array in case of error
  }
}


export async function getOnePost(id: number) {
  let { data, error } = await supabase.from('Post').select('*').eq('id', id).single();
  if (error) {
    console.log('Error getting blog:', error);
  } else {
    console.log('Post received successfully:', data);
    return data;
  }
}

export async function updatePost(post: any) {
  const { id, content } = post;

  const { data, error } = await supabase.from('Post').update({ content }).eq('id', id);

  if (error) {
    console.error('Error updating post:', error.message);
    return;
  }

  console.log('Post updated successfully:', data);
}

export async function deletePost(id: number) {
  const { data, error } = await supabase.from('Post').delete().eq('id', id);

  if (error) {
    console.log('Error deleting blog:', error);
  } else {
    console.log('Post deleted successfully:', data);
  }
}

//user

export async function getAllUsers() {
  let { data: Post, error } = await supabase.from('User').select('*');

  if (error) {
    console.log('Error getting users', error);
  } else {
    console.log(Post);
    return Post;
  }
}

export async function getOneUser(id: string) {
  let { data, error } = await supabase.from('User').select('*').eq('id', id).single();
  if (error) {
    console.log('Error getting user:', error);
  } else {
    console.log('User received successfully:', data);
    return data;
  }
}

export async function updateUser(user: any) {
  const { id, username } = user;

  const { data, error } = await supabase.from('Post').update({ username }).eq('id', id);

  if (error) {
    console.error('Error updating user:', error.message);
    return;
  }

  console.log('User updated successfully:', data);
}

export async function deleteUser(id: number) {
  const { data, error } = await supabase.from('User').delete().eq('id', id);

  if (error) {
    console.log('Error deleting user:', error);
  } else {
    console.log('User deleted successfully:', data);
  }
}
