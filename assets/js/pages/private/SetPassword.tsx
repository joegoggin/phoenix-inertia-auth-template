import Button from "@/components/core/Button";
import TextInput from "@/components/core/TextInput";
import MainLayout from "@/layouts/Layout";
import { PageProps } from "@/types/PageProps";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

const SetPasswordPage: React.FC<
    PageProps<{}, { password: string; password_confirmation: string }>
> = ({ errors }) => {
    const { data, setData, put } = useForm({
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = () => {
        put("/set-password");
    };

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    return (
        <MainLayout className="set-password-page" title="Set Password">
            <h1>Set Password Page</h1>
            <form onSubmit={handleSubmit}>
                <TextInput
                    name="password"
                    placeholder="Password"
                    data={data}
                    setData={setData}
                    error={errors.password}
                    password
                />
                <TextInput
                    name="password_confirmation"
                    placeholder="Confirm"
                    data={data}
                    setData={setData}
                    error={errors.password_confirmation}
                    password
                />
                <Button onClick={handleSubmit}>Set Password</Button>
            </form>
        </MainLayout>
    );
};

export default SetPasswordPage;
