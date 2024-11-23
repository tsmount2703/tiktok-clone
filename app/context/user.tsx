/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { account, ID } from "@/libs/AppWritClient";
import { useRouter } from "next/navigation";
import { User, UserContextTypes } from "../types";
import useGetProfileByUserId from "../hooks/useGetProfileByUserId";
import useCreateProfile from "../hooks/useCreateProfile";

const UserContext = createContext<UserContextTypes | null>(null);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const checkUser = async () => {
    try {
      const currentSession = await account.getSession("current");
      if (!currentSession) {
        setUser(null);
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const promise = (await account.get()) as any;
      const profile = await useGetProfileByUserId(promise?.$id);

      setUser({
        id: promise?.$id,
        name: promise?.name,
        bio: profile?.bio,
        image: profile?.image,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.code === 401) {
        // console.log("Session expired or unauthorized, user needs to log in.");
        setUser(null);
      } else {
        // console.error("Error while checking user:", error);
        setUser(null);
      }
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const register = async (name: string, email: string, password: string) => {
    try {
      const promise = await account.create(ID.unique(), email, password, name);
      await account.createEmailPasswordSession(email, password);

      await useCreateProfile(
        promise?.$id,
        name,
        String(process.env.NEXT_PUBLIC_PLACEHOLDER_DEFAULT_IMAGE_ID),
        ""
      );
      await checkUser();
    } catch (error) {
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Create a session for the user
      await account.createEmailPasswordSession(email, password);

      // Check user after session is successfully created
      await checkUser();
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      router.refresh();
    } catch (error) {
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, register, login, logout, checkUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => useContext(UserContext);
