/* eslint-disable react-hooks/rules-of-hooks */
import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { CommentWithProfile } from "../types";
import useGetCommentByPostId from "../hooks/useGetCommentByPostId";

interface CommentStore {
  commentsByPost: CommentWithProfile[];
  setCommentsByPost: (postId: string) => void;
}

export const useCommentStore = create<CommentStore>()(
  devtools(
    persist(
      (set) => ({
        commentsByPost: [],
        setCommentsByPost: async (postId: string) => {
          const result = await useGetCommentByPostId(postId);
          set({ commentsByPost: result });
        },
      }),
      {
        name: "store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
