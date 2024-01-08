// see https://stackoverflow.com/questions/72807218/next-auth-js-with-next-js-middleware-redirects-to-sign-in-page-after-successful#:~:text=I%20manage%20it%20like%20this
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req }) => {
      // verify token and return a boolean
      const sessionToken = req.cookies.get("next-auth.session-token");
      if (sessionToken) return true;
      else return false;
    },
  },
});

export const config = {
  matcher: ["/issues/new", "/issues/edit/:id+"],
};
