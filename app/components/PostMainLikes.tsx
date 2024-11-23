/* eslint-disable prefer-const */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { Comment, Like, PostMainLikesCompTypes } from "../types";
import { AiFillHeart } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { FaCommentDots, FaShare } from "react-icons/fa";
import { useGeneralStore } from "../stores/general";
import { useUser } from "../context/user";
import useGetCommentByPostId from "../hooks/useGetCommentByPostId";
import useGetLikeByPostId from "../hooks/useGetLikeByPostId";
import useIsLiked from "../hooks/useIsLiked";
import useCreateLike from "../hooks/useCreateLike";
import useDeleteLike from "../hooks/useDeleteLike";

export default function PostMainLikes({ post }: PostMainLikesCompTypes) {
  let { setIsLoginOpen } = useGeneralStore();

  const router = useRouter();
  const contextUser = useUser();

  const [hasClickedLike, setHasClickedLike] = useState<boolean>(false);
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<Like[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getAllLikesbyPost();
    getAllCommentsbyPost();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  useEffect(() => {
    hasUserLikedPost();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes, contextUser]);

  const getAllCommentsbyPost = async () => {
    let result = await useGetCommentByPostId(post?.id);
    setComments(result);
  };

  const getAllLikesbyPost = async () => {
    let result = await useGetLikeByPostId(post?.id);
    setLikes(result);
  };

  const hasUserLikedPost = () => {
    if (!contextUser) return;
    if (likes?.length < 1 || !contextUser?.user?.id) {
      setUserLiked(false);
      return;
    }
    let res = useIsLiked(contextUser?.user?.id, post?.id, likes);
    setUserLiked(res ? true : false);
  };

  const like = async () => {
    try {
      setHasClickedLike(true);
      await useCreateLike(contextUser?.user?.id || "", post?.id);
      await getAllLikesbyPost();
      hasUserLikedPost();
      setHasClickedLike(false);
    } catch (error) {
      alert(error);
    }
  };

  const unlike = async (id: string) => {
    try {
      setHasClickedLike(true);
      await useDeleteLike(id);
      await getAllLikesbyPost();
      hasUserLikedPost();
      setHasClickedLike(false);
    } catch (error) {
      alert(error);
    }
  };

  const likeOrUnlike = () => {
    if (!contextUser?.user) return setIsLoginOpen(true);
    let res = useIsLiked(contextUser.user.id, post?.id, likes);
    if (!res) {
      like();
    } else {
      likes.forEach((like) => {
        if (
          contextUser?.user?.id &&
          contextUser.user.id === like.user_id &&
          like.post_id === post?.id
        ) {
          unlike(like.id);
        }
      });
    }
  };

  return (
    <>
      <div id={`PostMainLikes-${post.id}`} className="relative mr-[75px]">
        <div className="absolute bottom-0 pl-2">
          <div className="pb-4 text-center">
            <button
              disabled={hasClickedLike}
              onClick={() => likeOrUnlike()}
              className="rounded-full bg-gray-200 p-2 cursor-pointer"
            >
              {!hasClickedLike ? (
                <AiFillHeart
                  color={likes?.length > 0 && userLiked ? "#ff2626" : ""}
                  size="25"
                />
              ) : (
                <BiLoaderCircle className="animate-spin" size="25" />
              )}
            </button>
            <span className="text-xs text-gray-800 font-semibold">
              {likes?.length}
            </span>
          </div>

          <button
            onClick={() =>
              router.push(`/post/${post?.id}/${post?.profile?.user_id}`)
            }
            className="pb-4 text-center"
          >
            <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
              <FaCommentDots size="25" />
            </div>
            <span className="text-xs text-gray-800 font-semibold">
              {comments?.length}
            </span>
          </button>

          <button className="text-center">
            <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
              <FaShare size="25" />
            </div>
            <span className="text-xs text-gray-800 font-semibold">55</span>
          </button>
        </div>
      </div>
    </>
  );
}
