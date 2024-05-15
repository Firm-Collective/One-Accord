import React from "react";
import CreateForm from "./components/CreateForm";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import SignOut from "./components/SignOut";
import { readTodo } from "./actions";
import readUserSession from "@/lib/actions";
import { deleteTodoById, updateTodoById } from "./actions";

export default async function Page() {
    const { data } = await readUserSession();
    // if (!data.session) {
    if (!data) {
        console.log("-------todo page ---------");
        console.log("redirect to auth-server-action");
        console.log("+++");
        console.log("+++");
        console.log("+++");
        console.log("data: ", data);
        return redirect("/auth-server-action");
    }

    const { data: todos } = await readTodo();

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 space-y-5">
                <SignOut />

                <CreateForm />

                {todos?.map((todo, index) => {
                    const deleteTodo = deleteTodoById.bind(null, todo.id);
                    const updateTodo = updateTodoById.bind(
                        null,
                        todo.id,
                        !todo.completed
                    );
                    return (
                        <div key={index} className="flex items-center gap-6">
                            <h1
                                className={cn({
                                    "line-through": todo.completed,
                                })}
                            >
                                {todo.title}
                            </h1>
                            <form action={deleteTodo}>
                                <Button>delete</Button>
                            </form>
                            <form action={updateTodo}>
                                <Button>Update</Button>
                            </form>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// import React from "react";
// import CreateForm from "./components/CreateForm";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import readUserSession from "@/lib/actions";
// import { redirect } from "next/navigation";
// import SignOut from "./components/SignOut";

// export default async function Page() {
//     const todos = [
//         {
//             title: "Subscribe",
//             created_by: "091832901830",
//             id: "101981908",
//             completed: false,
//         },
//     ];

//     const { data } = await readUserSession();
//     // if (!data.session) {
//     if (!data) {
//         console.log("-------todo page ---------");
//         console.log("redirect to auth-server-action");
//         console.log("+++");
//         console.log("+++");
//         console.log("+++");
//         console.log("data: ", data);
//         return redirect("/auth-server-action");
//     }

//     return (
//         <div className="flex justify-center items-center h-screen">
//             <div className="w-96 space-y-5">
//                 <SignOut />
//                 <CreateForm />

//                 {todos?.map((todo, index) => {
//                     return (
//                         <div key={index} className="flex items-center gap-6">
//                             <h1
//                                 className={cn({
//                                     "line-through": todo.completed,
//                                 })}
//                             >
//                                 {todo.title}
//                             </h1>

//                             <Button>delete</Button>
//                             <Button>Update</Button>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }
