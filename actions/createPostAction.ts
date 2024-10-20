'user server'

import { currentUser } from "@clerk/nextjs/server"
import { error } from "console";

export default async function createPostAction(formData : FormData) {
    const user= await currentUser();
    if (!user){
        throw new Error(" user not authenticated")
    }
    const postInput=formData.get("postInput") as  string;
    const image=formData.get("image") as File;
    let imageUrl:string | undefined;
    if (!postInput){
        throw new Error("put post input")
    }
}