import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const AuthProvider = async ({ children }: Props) => {
  const session = await auth();
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
