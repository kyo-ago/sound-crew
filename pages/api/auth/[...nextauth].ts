import NextAuth, {NextAuthOptions} from "next-auth";
import ZoomProvider from "next-auth/providers/zoom";

export const authOptions: NextAuthOptions = {
    providers: [
        ZoomProvider({
            clientId: process.env.ZOOM_CLIENT_ID!,
            clientSecret: process.env.ZOOM_CLIENT_SECRET!
        }),
    ],
};

export default NextAuth(authOptions);
