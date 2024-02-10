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

// Verification Token
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

// Password Reset Token
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};
export const getPasswordResetTokenByToken = async (token: string | null) => {
  try {
    const passwordResetToken = token
      ? await db.passwordResetToken.findFirst({
          where: { token },
        })
      : null;

    return passwordResetToken;
  } catch {
    return null;
  }
};
