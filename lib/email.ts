import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink =
    process.env.NEXTAUTH_URL + "/auth/new-verification?token=" + token;

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Confirm your email",
      html: `<p>Here is your confirmation <a href="${confirmLink}">Link</a></p>`,
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink =
    process.env.NEXTAUTH_URL + "/auth/new-password?token=" + token;

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Confirm your email",
      html: `<p>Here is your password reset <a href="${confirmLink}">Link</a></p>`,
    });
    return data;
  } catch (error) {
    return error;
  }
};
