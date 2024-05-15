import React from "react";
import { AuthForm } from "./components/AuthForm";
import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function page() {
    const { data } = await readUserSession();
    // if (data.session) {
    if (data.user) {
        console.log("-------auth-server-action page---------");
        console.log("redirect to todo");
        console.log("+++");
        console.log("+++");
        console.log("+++");
        console.log("data: ", data);

        return redirect("/todo");
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96">
                <AuthForm />
            </div>
        </div>
    );
}
