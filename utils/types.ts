export interface User {
  id: string;
  email: string;
  username?: string;
  password: string;
  country?: string;
  city?: string;
  birthYear?: number;
  createdAt: Date;
  updatedAt: Date;
  posts: Post[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  authorId: string;
}
