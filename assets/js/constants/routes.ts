import { DeepValues } from "@/types/DeepValues";

export const Routes = {
    home: "/",
    auth: {
        signUp: "/auth/sign-up",
        logIn: "/auth/log-in",
        setPassword: "/auth/set-password",
    },
} as const;

export type Route = DeepValues<typeof Routes>;
