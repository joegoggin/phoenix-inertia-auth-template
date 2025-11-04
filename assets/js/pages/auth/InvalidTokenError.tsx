import MainLayout from "@/layouts/Layout";
import Button from "@/components/core/Button";
import { Routes } from "@/constants/routes";

const InvalidTokenPage: React.FC = () => {
    return (
        <MainLayout className="invalid-token-page">
            <h1>Log In Failed!</h1>
            <h4>Error: Token provided is invalid!</h4>
            <Button href={Routes.auth.logIn}>Log In</Button>
        </MainLayout>
    );
};

export default InvalidTokenPage;
