import React, { Suspense } from "react";
import { useQuery } from "react-query";
import { supabaseServer } from "@/utils/supabase/server";
import { LIMIT_MESSAGE } from "@/constant";
import ListPosts from "./ListPosts";
import AddPosts from "./AddPosts";
import InitPosts from "@/utils/store/initPosts";

async function fetchData() {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("Post")
    .select("*,users(*)")
    .range(0, LIMIT_MESSAGE)
    .order("created_at", { ascending: false });
  return data;
}

export default function FeedPosts() {
  const { data: posts, refetch } = useQuery("posts", fetchData);

  return (
    <>
      <Suspense fallback={"loading.."}>
        <ListPosts />
        <InitPosts posts={posts?.reverse() || []} />
      </Suspense>
      <AddPosts refetch={refetch} />
    </>
  );
}



