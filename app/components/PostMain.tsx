/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { useEffect } from "react";
import { PostMainCompTypes } from "../types";
import Link from "next/link";
import { ImMusic } from "react-icons/im";
import { AiFillHeart } from "react-icons/ai";
import PostMainLikes from "./PostMainLikes";
import useCreateBucketURL from "../hooks/useCreateBucketURL";

export default function PostMain({ post }: PostMainCompTypes) {
  useEffect(() => {
    const video = document.getElementById(
      `video-${post.id}`
    ) as HTMLVideoElement;

    const PostMainElement = document.getElementById(`PostMain-${post.id}`);

    if (PostMainElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries[0].isIntersecting ? video.play() : video.pause();
        },
        { threshold: [0.6] }
      );

      observer.observe(PostMainElement);
    }
  }, [post.id]);
  return (
    <>
      <div id={`PostMain-${post.id}`} className="flex border-b py-6">
        <div className="cursor-pointer ">
          <img
            className="rounded-full max-h-[60px]"
            width="60"
            src={useCreateBucketURL(post?.profile.image)}
            alt="User"
          />
        </div>
        <div className="pl-3 w-full px-4">
          <div className="flex items-center justify-between pb-0.5">
            <Link href={`/profile/${post.profile.user_id}`}>
              <span className="font-bold hover:underline cursor-pointer">
                {post.profile.name}
              </span>
            </Link>
            <button className="border text-[15px] px-[21px] py-0.5 border-[#F03C56] text-[#F02C56] hover:bg-[#ffeef2] font-semibold rounded-md">
              Follow
            </button>
          </div>
          <p className="text-[15px] pb-0.5 break-words md:mx-w-[400px] max-w-[300px]">
            {post.text}
          </p>
          <p className="text-[14px] text-gray-500 pb-0.5">
            #Fun #cool #SuperAwesome
          </p>
          <p className="text-[14px] pb-0.5 flex items-center font-semibold">
            <ImMusic size="17" />
            <span className="px-1">Original Sound - AWESOME</span>
            <AiFillHeart size="20" />
          </p>
          <div className="mt-2.5 flex">
            <div className="relative min-h-[400px] max-h-[500px] max-w-[200px] flex items-center bg-black rounded-xl cursor-pointer">
              <video
                id={`video-${post.id}`}
                loop
                controls
                muted
                className="rounded-xl object-cover mx-auto h-full"
                src={useCreateBucketURL(post?.video_url)}
              />
              <img
                className="absolute right-2 bottom-10"
                width="90"
                src="/images/tiktok-logo-white.png"
                alt="TikTok Logo White"
              />
            </div>
            <PostMainLikes post={post} />
          </div>
        </div>
      </div>
    </>
  );
}
