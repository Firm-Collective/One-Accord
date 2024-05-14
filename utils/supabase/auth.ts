// import { CookieMethods, createServerClient, type CookieOptions } from '@supabase/ssr';
// import { cookies as nextCookies } from 'next/headers';

// export const getUser = async () => {
//   const auth = getSupabaseAuth({ isComponent: true });
//   const user = (await auth.getUser()).data.user;

//   return user;
// };

// export const protectAction = async () => {
//   const auth = getSupabaseAuth({ isComponent: true });
//   const user = (await auth.getUser()).data.user;
//   if (!user) throw new Error('Not authorized');
// };

// export const getServerActionAuth = () => {
//   return getSupabaseAuth({ isComponent: false });
// };

// const getSupabaseAuth = ({ isComponent = true }: { isComponent: boolean }) => {
//   const cookieStore = nextCookies();

//   let cookies: CookieMethods = {
//     get(name: string) {
//       return cookieStore.get(name)?.value;
//     },
//   };

//   if (!isComponent) {
//     cookies = {
//       ...cookies,
//       set(name: string, value: string, options: CookieOptions) {
//         cookieStore.set({ name, value, ...options });
//       },
//       remove(name: string, options: CookieOptions) {
//         cookieStore.set({ name, value: '', ...options });
//       },
//     };
//   }

//   const client = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
//     cookies,
//   });

//   return client.auth;
// };
