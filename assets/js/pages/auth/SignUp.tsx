import Button from "@/components/core/Button";
import Form from "@/components/core/Form";
import { NotificationType } from "@/components/core/Notification";
import TextInput from "@/components/core/TextInput";
import MainLayout from "@/layouts/MainLayout";
import { Flash } from "@/types/flash";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";

type PageProps = {
    flash: Flash;
};

const SignUpPage: React.FC = () => {
    const {
        props: {
            flash: { notifications },
        },
    } = usePage<PageProps>();

    const { data, setData, post } = useForm({
        email: "",
    });

    const handleSubmit = () => {
        post("/auth/sign-up");
    };

    useEffect(() => {
        notifications?.forEach((notification) => {
            if (notification.type === NotificationType.SUCCESS) {
                setData("email", "");
            }
        });
    }, [notifications]);

    return (
        <MainLayout className="sign-up" title="Sign Up">
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <TextInput
                    placeholder="Email"
                    name="email"
                    data={data}
                    setData={setData}
                />
                <Button type="submit">Sign Up</Button>
            </Form>
        </MainLayout>
    );
};

export default SignUpPage;
