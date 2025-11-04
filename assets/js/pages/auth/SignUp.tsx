import Button from "@/components/core/Button";
import TextInput from "@/components/core/TextInput";
import MainLayout from "@/layouts/Layout";
import { PageProps } from "@/types/PageProps";
import { useForm } from "@inertiajs/react";
import React from "react";

type SignUpErrors = {
    email?: string;
};

const SignUpPage: React.FC<PageProps<{}, SignUpErrors>> = ({ errors }) => {
    const { data, setData, post } = useForm({
        email: "",
    });

    const handleSubmit = () => {
        post("/sign-up");
    };

    return (
        <MainLayout className="sign-up" title="Sign Up">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextInput
                        placeholder="Email"
                        name="email"
                        data={data}
                        setData={setData}
                        error={errors.email}
                    />
                </div>
                <Button onClick={handleSubmit}>Sign Up</Button>
            </form>
        </MainLayout>
    );
};

export default SignUpPage;
