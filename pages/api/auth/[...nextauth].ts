import NextAuth, { NextAuthOptions } from "next-auth";
import ZoomProvider from "next-auth/providers/zoom";
import fetch from "node-fetch";
import { z } from "zod";

const ZakApi = z.object({
  token: z.string(),
});

const fetchZakToken = (accessToken: string) => {
  return fetch(`https://api.zoom.us/v2/users/me/token?type=zak`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((json) => ZakApi.parse(json));
};

export const authOptions: NextAuthOptions = {
  providers: [
    ZoomProvider({
      clientId: process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID!,
      clientSecret: process.env.ZOOM_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      session.user.zakToken = token.zakToken;
      return session;
    },
    async jwt({ token, account }) {
      if (account && account?.access_token) {
        const result = await fetchZakToken(account.access_token);
        token.zakToken = result.token;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
