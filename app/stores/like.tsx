/* eslint-disable react-hooks/rules-of-hooks */
import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { Like } from "../types";
import useGetLikeByPostId from "../hooks/useGetLikeByPostId";

interface LikeStore {
  likesByPost: Like[];
  setLikesByPost: (postId: string) => void;
}

export const useLikeStore = create<LikeStore>()(
  devtools(
    persist(
      (set) => ({
        likesByPost: [],
        setLikesByPost: async (postId: string) => {
          const result = await useGetLikeByPostId(postId);
          set({ likesByPost: result });
        },
      }),
      {
        name: "store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
