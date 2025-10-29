import Button from "@/components/core/Button";
import TextInput from "@/components/core/TextInput";
import Layout from "@/layouts/Layout";
import { useForm } from "@inertiajs/react";
import React from "react";

const SignUpPage: React.FC = () => {
    const { data, setData } = useForm({
        email: "",
        password: "",
        confirm: "",
    });

    return (
        <Layout>
            <div className="sign-up">
                <h1>Sign Up Page</h1>
                <form>
                    <div>
                        <TextInput
                            placeholder="Email"
                            name="email"
                            data={data}
                            setData={setData}
                        />
                        <TextInput
                            placeholder="Password"
                            name="password"
                            data={data}
                            setData={setData}
                            password
                        />
                        <TextInput
                            placeholder="Confirm Password"
                            name="confirm"
                            data={data}
                            setData={setData}
                            password
                        />
                    </div>
                    <Button>Sign Up</Button>
                </form>
            </div>
        </Layout>
    );
};

export default SignUpPage;
