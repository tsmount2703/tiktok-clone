/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { MenuItemFollowCompTypes } from "../../types";
import { AiOutlineCheck } from "react-icons/ai";

export default function MenuItemFollow({ user }: MenuItemFollowCompTypes) {
  return (
    <>
      <Link
        href={`/profile/${user.id}`}
        className="flex items-center hover:bg-gray-100 rounded-md w-full py-1.5 px-2"
      >
        <img
          className="rounded-full lg:mx-0 mx-auto"
          width="35"
          src={user?.image}
          alt=""
        />
        <div className="lg:pl-2.5 lg:block hidden ">
          <div className="flex items-center">
            <p className="font-bold text-[14px] truncate">{user?.name}</p>
            <p className="ml-1 mt-1 rounded-full bg-[#20d5ec] h-[14px] relative">
              <AiOutlineCheck
                className="relative p-[3px]"
                color="#FFFFFF"
                size="15"
              />
            </p>
          </div>
          <p className="font-light text-[12px] text-gray-600">{user?.name}</p>
        </div>
      </Link>
    </>
  );
}
