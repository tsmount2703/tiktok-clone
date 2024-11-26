/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prefer-const */
/* eslint-disable @next/next/no-img-element */
"use client";

import ClientOnly from "@/app/components/ClientOnly";
import Comments from "@/app/components/post/Comments";
import CommentsHeader from "@/app/components/post/CommentsHeader";
import useCreateBucketURL from "@/app/hooks/useCreateBucketURL";
import { useCommentStore } from "@/app/stores/comment";
import { useLikeStore } from "@/app/stores/like";
import { usePostStore } from "@/app/stores/post";
import { PostPageTypes } from "@/app/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export default function Post({ params: paramsPromise }: PostPageTypes) {
  const params = React.use(paramsPromise);
  const router = useRouter();
  let { postById, postsByUser, setPostById, setPostsByUser } = usePostStore();
  let { setLikesByPost } = useLikeStore();
  let { setCommentsByPost } = useCommentStore();

  useEffect(() => {
    setPostById(params.postId);
    setCommentsByPost(params.postId);
    setLikesByPost(params.postId);
    setPostsByUser(params.userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const lookThroughPostsUp = () => {
    postsByUser.forEach((post) => {
      if (post.id > params.postId) {
        router.push(`/post/${post.id}/${params.userId}`);
      }
    });
  };

  const lookThroughPostsDown = () => {
    postsByUser.forEach((post) => {
      if (post.id < params.postId) {
        router.push(`/post/${post.id}/${params.userId}`);
      }
    });
  };

  return (
    <>
      <div
        id="PostPage"
        className="lg:flex justify-between w-full h-screen bg-black overflow-auto"
      >
        <div className="lg:w-[calc(100%-540px)] h-full relative">
          <Link
            href={`/profile/${params?.userId}`}
            className="absolute text-white z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
          >
            <AiOutlineClose size="27" />
          </Link>

          <div>
            <button
              onClick={() => lookThroughPostsUp()}
              className="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
            >
              <BiChevronUp size="30" color="#FFFFFF" />
            </button>

            <button
              onClick={() => lookThroughPostsDown()}
              className="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
            >
              <BiChevronDown size="30" color="#FFFFFF" />
            </button>
          </div>

          <img
            className="absolute z-20 top-[18px] left-[70px] rounded-full lg:mx-0 mx-auto"
            width={45}
            src="/images/tiktok-logo-small.png"
            alt="Tiktok Logo Small"
          />

          <ClientOnly>
            {postById?.video_url ? (
              <video
                className="fixed object-cover w-full my-auto z-[0] h-screen"
                src={useCreateBucketURL(postById?.video_url)}
              />
            ) : null}

            <div className="bg-black bg-opacity-70 lg:min-w-[400px] z-10 relative">
              {postById?.video_url ? (
                <video
                  autoPlay
                  controls
                  loop
                  muted
                  className="h-screen mx-auto"
                  src={useCreateBucketURL(postById?.video_url)}
                />
              ) : null}
            </div>
          </ClientOnly>
        </div>
        <div
          id="InfoSection"
          className="lg:max-w-[550px] relative w-full h-full bg-white"
        >
          <div className="py-7" />

          <ClientOnly>
            {postById?.video_url ? (
              <CommentsHeader post={postById} params={params} />
            ) : null}
          </ClientOnly>

          <Comments params={params} />
        </div>
      </div>
    </>
  );
}
