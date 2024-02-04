import { getVerificationTokenByEmail } from "@/lib/data";
import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (email: string) => {
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour
  const verficationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verficationToken;
};
