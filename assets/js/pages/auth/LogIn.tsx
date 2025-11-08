import Button from "@/components/core/Button";
import Form from "@/components/core/Form";
import { NotificationType } from "@/components/core/Notification";
import TextInput from "@/components/core/TextInput";
import { useNotificationEffect } from "@/hooks/useNotificationEffect";
import MainLayout from "@/layouts/MainLayout";
import { useForm } from "@inertiajs/react";

const LogInPage = () => {
    const { data, setData, post } = useForm({
        email: "",
        password: "",
    });

    const handleSubmit = () => {
        post("/auth/log-in");
    };

    useNotificationEffect(() => {
        setData("email", "");
        setData("password", "");
    }, NotificationType.ERROR);

    return (
        <MainLayout className="log-in-page" title="Log In">
            <h1>Log In</h1>
            <Form onSubmit={handleSubmit}>
                <TextInput
                    name="email"
                    placeholder="Email"
                    data={data}
                    setData={setData}
                />
                <TextInput
                    name="password"
                    placeholder="Password"
                    data={data}
                    setData={setData}
                    password
                />
                <Button type="submit">Log In</Button>
            </Form>
        </MainLayout>
    );
};

export default LogInPage;
