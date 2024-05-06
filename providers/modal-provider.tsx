"use client";

import { useEffect, useState } from "react";

import { StoreModal } from "@/components/modals/store-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  //   if it's a server side
  if (!isMounted) {
    return null;
  }

  //   if it's client side
  return (
    <>
      <StoreModal />
    </>
  );
};
