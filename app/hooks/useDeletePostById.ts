/* eslint-disable react-hooks/rules-of-hooks */
import {database, storage} from "@/libs/AppWritClient"
import useGetLikeByPostId from "./useGetLikeByPostId"
import useDeleteLike from "./useDeleteLike"
import useGetCommentByPostId from "./useGetCommentByPostId"
import useDeleteComment from "./useDeleteComment"

const useDeletePostById = async (postId:string, currentImage: string) => {
    try {
        const likes = await useGetLikeByPostId(postId)
        likes.forEach(async (like)=> {await useDeleteLike(like?.id)} );

        const comments = await useGetCommentByPostId(postId)
        comments.forEach(async (comment)=> {await useDeleteComment(comment?.id)} );

        await database.deleteDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST),
            postId
        )

        await storage.deleteFile(
            String(process.env.NEXT_PUBLIC_BUCKET_ID), 
            currentImage
        )
        
    } catch (error) {
        throw error
    }
}

export default useDeletePostById