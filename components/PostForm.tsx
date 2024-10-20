
'use client'
import { useRef, useState } from "react"
import { Avatar,AvatarFallback,AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { ImageIcon } from "lucide-react"
import { XIcon } from "lucide-react"
import createPostAction from "@/actions/createPostAction"


import { useUser } from "@clerk/nextjs"
const PostForm = () => {
    const ref=useRef<HTMLFormElement>(null);
    const fileInputRef=useRef<HTMLInputElement>(null);
    const {user} =useUser();
    const [preview,setPreview]= useState<string | null>(null);
    const handlePostAction= async (formData : FormData)=>{
        const copy=formData;
        ref.current?.reset();
        const text=copy.get("postInput") as string;
        if (!text.trim()){
            throw new Error("post Input is required  ");
        }
        setPreview(null);
        try{
    await createPostAction(copy);
        }
        catch(err){
            console.log(err);
        }
        
    }
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setPreview(URL.createObjectURL(file));
        }
      };
      
      
  return (
    <div className="mb-2" >
        <form ref={ref} action={(formData)=>{
            handlePostAction(formData)
        }} className="pt-2 bg-white rounded-lg">
            <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <input
          
            type="text"
            name="postInput"
            placeholder="Start writing a post..."
            className="flex-1 outline-none rounded-full py-3 px-4 border"
          />

          <input
          ref={fileInputRef}
          type="file"
        name="image"
        accept="image/*" hidden
        onChange={handleImageChange}/>

        <button
        type="submit" hidden >
            Post

        </button>


          </div>
          {preview && (
          <div className="mt-2">
            <img src={preview} alt="Preview" className="w-full object-cover" />
          </div>
        )}
        <div className="flex-justify-end mt-2 space-x-2">
                <Button type="button" onClick={ ()=> fileInputRef.current?.click()}>
                <ImageIcon className="mr-2" size={16} color="currentColor" />{ preview ? "Change " : "Add " }image
                </Button>

          
        {preview && (
           < Button variant="outline"  type="button" onClick={()=>
            setPreview(null)
           }>
           <XIcon className="mr-2" size={16} color="currentColor" />
           Remove image
           </Button>
        )}
          
          </div>
          </form>
          <hr className="mt-2 border-gray-300"/>
          </div>
  )
}

export default PostForm