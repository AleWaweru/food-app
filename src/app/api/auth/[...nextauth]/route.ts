import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Email", type: "email", placeholder: "test@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Your authentication logic goes here
                const res = await fetch("/your/endpoint", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                });
                const user = await res.json();

                // If authentication is successful, return the user object
                if (res.ok && user) {
                    return user;
                }

                // Return null if authentication fails
                return null;
            }
        })
    ],
    // Other NextAuth options...
});

export { handler as GET, handler as POST };
