import React, { Suspense } from "react";
import ListMessages from "./ListMessages";


export default async function FeedMessages(){
    

        return (

        <Suspense fallback={"loading.."}>
            <ListMessages/>
        </Suspense>
    )
}