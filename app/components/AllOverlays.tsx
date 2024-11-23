"use client";

import ClientOnly from "./ClientOnly";
import { useGeneralStore } from "../stores/general";
import AuthOverlay from "./AuthOverlay";
import EditProfileOverlay from "./profile/EditProfileOverlay";

export default function AllOverlays() {
  const { isEditProfileOpen, isLoginOpen } = useGeneralStore();
  return (
    <>
      <ClientOnly>
        {isLoginOpen ? <AuthOverlay /> : null}
        {isEditProfileOpen ? <EditProfileOverlay /> : null}
      </ClientOnly>
    </>
  );
}
