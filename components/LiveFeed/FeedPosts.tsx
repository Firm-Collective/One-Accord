import ListMessages from "./ListMessages";



import { Suspense } from "react";
import InitMessages from "@/utils/store/initMessages";
import { supabaseServer } from "@/utils/supabase/server";
import { LIMIT_MESSAGE } from "@/constant";

export default async function ChatMessages() {
	const supabase = await supabaseServer();

	const { data } = await supabase
		.from("Post")
		.select("*,users(*)")
		.range(0, LIMIT_MESSAGE)
		.order("created_at", { ascending: false });

	return (
		<Suspense fallback={"loading.."}>
			<ListMessages />
			<InitMessages messages={data?.reverse() || []} />
		</Suspense>
	);
}


