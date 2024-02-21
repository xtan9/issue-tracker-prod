"use client";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut, useSession } from "next-auth/react";

const SettingsPage = () => {
  const user = useCurrentUser();
  return (
    <>
      {JSON.stringify(user)}
      <Button onClick={() => signOut()}>Sign out</Button>;
    </>
  );
};

export default SettingsPage;
