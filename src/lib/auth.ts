import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "@/db/db"; // your mongodb client

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 4
    },
    socialProviders: {
        github: {
            clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET as string,
        }
    }
});