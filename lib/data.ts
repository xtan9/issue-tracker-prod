import db from "@/lib/db";

// User
export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({ where: { email } });
  } catch {
    return null;
  }
};

export const getUserByID = async (id: string | undefined) => {
  try {
    return await db.user.findUnique({ where: { id } });
  } catch {
    return null;
  }
};

// VerificationToken
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch {
    return null;
  }
};
