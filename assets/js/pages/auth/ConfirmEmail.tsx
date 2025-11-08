import MainLayout from "@/layouts/Layout";
import Button from "@/components/core/Button";

const ConfirmEmailPage: React.FC = () => {
    return (
        <MainLayout className="confirm-email-page" title="Account Created!">
            <h1>Account Created!</h1>
            <h4>Check your email to confirm your account</h4>
            <Button href="/auth/log-in">Log In</Button>
        </MainLayout>
    );
};

export default ConfirmEmailPage;
