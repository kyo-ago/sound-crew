import NextAuth, {NextAuthOptions} from "next-auth";
import ZoomProvider from "next-auth/providers/zoom";

export const authOptions: NextAuthOptions = {
    providers: [
        ZoomProvider({
            clientId: process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID!,
            clientSecret: process.env.ZOOM_CLIENT_SECRET!
        }),
    ],
    callbacks: {
        async session({session, token}: any) {
            session.user.accessToken = token.accessToken;
            return session;
        },
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        }
    }
};

export default NextAuth(authOptions);
