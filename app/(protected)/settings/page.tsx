"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

const SettingsPage = () => {
  const session = useSession();
  return (
    <>
      {JSON.stringify(session)}
      <Button onClick={() => signOut()}>Sign out</Button>;
    </>
  );
};

export default SettingsPage;
