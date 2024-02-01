import { Button } from "@/components/ui/button";

import { auth, signOut } from "@/auth";
const page = async () => {
  const session = await auth();
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      {JSON.stringify(session)}
      <Button type="submit">Sign out</Button>;
    </form>
  );
};

export default page;
